@@ .. @@
 const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
-  const { isAuthenticated } = useApp();
-  return isAuthenticated ? <>{children}</> : <Navigate to="/signup" />;
+  const { isAuthenticated, loading } = useApp();
+  
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
+        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
+      </div>
+    );
+  }
+  
+  return isAuthenticated ? <>{children}</> : <Navigate to="/signup" />;
 };