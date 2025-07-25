import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Button } from './ui/Button';
import { Upload, FileText, CheckCircle, AlertCircle, Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { createUploadSession, uploadFile, saveAIOutput } from '../lib/supabase';

export const DataUpload: React.FC = () => {
  const navigate = useNavigate();
  const { supabaseUser } = useApp();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a CSV or Excel file');
      setUploadStatus('error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setErrorMessage('File size must be less than 10MB');
      setUploadStatus('error');
      return;
    }

    if (!supabaseUser) {
      navigate('/login');
      return;
    }

    setUploadedFile(file);
    setUploadStatus('uploading');
    setUploadProgress(0);
    setErrorMessage('');

    try {
      // Create upload session
      const timestamp = new Date().toISOString();
      const fileName = `${supabaseUser.id}/${timestamp}_${file.name}`;
      
      setUploadProgress(25);
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await uploadFile(file, 'business-data', fileName);
      
      if (uploadError) {
        throw uploadError;
      }
      
      setUploadProgress(50);
      
      // Parse CSV/Excel to get row count (simplified)
      const rowCount = await getRowCount(file);
      
      setUploadProgress(75);
      
      // Create upload session record
      const { data: sessionData, error: sessionError } = await createUploadSession(
        supabaseUser.id,
        file.name,
        rowCount
      );
      
      if (sessionError) {
        throw sessionError;
      }
      
      setUploadProgress(90);
      
      // Generate sample AI insights (in real app, this would be processed by AI)
      const sampleInsights = generateSampleInsights(file.name, rowCount);
      
      if (sessionData && sessionData[0]) {
        await saveAIOutput(
          supabaseUser.id,
          sessionData[0].id,
          'initial_analysis',
          sampleInsights
        );
      }
      
      setUploadProgress(100);
      setUploadStatus('success');
      
    } catch (error: any) {
      console.error('Upload error:', error);
      setErrorMessage(error.message || 'Upload failed. Please try again.');
      setUploadStatus('error');
    }
  };

  const getRowCount = async (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        resolve(Math.max(0, lines.length - 1)); // Subtract header row
      };
      reader.readAsText(file);
    });
  };

  const generateSampleInsights = (filename: string, rowCount: number) => {
    return {
      filename,
      rowCount,
      summary: {
        totalRecords: rowCount,
        dateRange: 'Last 90 days',
        avgDailyRevenue: Math.floor(Math.random() * 50000) + 20000,
        topProduct: 'Product A',
        customerCount: Math.floor(rowCount * 0.3)
      },
      predictions: {
        nextMonthRevenue: Math.floor(Math.random() * 100000) + 150000,
        churnRisk: Math.floor(Math.random() * 20) + 10,
        growthRate: (Math.random() * 10 + 5).toFixed(1)
      }
    };
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setErrorMessage('');
  };

  const downloadSampleCSV = () => {
    const csvContent = `Date,Revenue,Customer_ID,Product,Quantity,Category
2024-01-01,15000,CUST001,Product A,5,Electronics
2024-01-02,22000,CUST002,Product B,3,Clothing
2024-01-03,18500,CUST003,Product C,7,Electronics
2024-01-04,31000,CUST004,Product A,12,Electronics
2024-01-05,19200,CUST005,Product D,4,Home & Garden`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_business_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Data Upload Instructions</h2>
          <div className="space-y-2 text-blue-800">
            <p>• Upload your business data in CSV or Excel format</p>
            <p>• Ensure your file includes columns like: Date, Revenue, Customer ID, Product, etc.</p>
            <p>• Maximum file size: 10MB</p>
            <p>• Your data is encrypted and secure</p>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {uploadStatus === 'idle' && (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop your files here, or click to browse
              </h3>
              <p className="text-gray-600 mb-6">
                Supports CSV, XLS, XLSX files up to 10MB
              </p>
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="primary" size="lg" className="cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing...</h3>
             <p className="text-gray-600 mb-4">Uploading and analyzing {uploadedFile?.name}</p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
               <div
                 className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                 style={{ width: `${uploadProgress}%` }}
               />
             </div>
             <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Successful!</h3>
              <p className="text-gray-600 mb-6">
                {uploadedFile?.name} has been processed successfully
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="primary"
                  onClick={() => navigate('/insights')}
                >
                  View Insights
                </Button>
                <Button
                  variant="outline"
                  onClick={resetUpload}
                >
                  Upload Another File
                </Button>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Failed</h3>
              <p className="text-gray-600 mb-6">
               {errorMessage || 'Please check your file format and try again'}
              </p>
              <Button
                variant="primary"
                onClick={resetUpload}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Sample Data */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Sample Data?</h3>
          <p className="text-gray-600 mb-6">
            Download our sample CSV template to see the expected format for your business data.
          </p>
          <Button
            variant="outline"
            icon={Download}
            onClick={downloadSampleCSV}
          >
            Download Sample CSV
          </Button>
        </div>
      </div>
    </div>
  );
};