import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
import { User, QuestionnaireData, AppState } from '../types';
import { supabase, getCurrentUser, signOut } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AppContextType extends AppState {
  setUser: (user: User) => void;
  setSupabaseUser: (user: SupabaseUser | null) => void;
  setQuestionnaire: (data: QuestionnaireData) => void;
  setCurrentStep: (step: number) => void;
  logout: () => void;
  loading: boolean;
  supabaseUser: SupabaseUser | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    questionnaire: null,
    isAuthenticated: false,
    currentStep: 0,
  });
  const [loading, setLoading] = useState(true);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Check for existing session
    getCurrentUser().then(({ user }) => {
      if (user) {
        setSupabaseUser(user);
        setState(prev => ({ 
          ...prev, 
          isAuthenticated: true,
          user: {
            name: user.user_metadata?.name || user.email?.split('@')[0] || '',
            businessName: user.user_metadata?.businessName || '',
            email: user.email || '',
            password: '',
            businessSector: user.user_metadata?.businessSector || ''
          }
        }));
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user);
          setState(prev => ({ 
            ...prev, 
            isAuthenticated: true,
            user: {
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
              businessName: session.user.user_metadata?.businessName || '',
              email: session.user.email || '',
              password: '',
              businessSector: session.user.user_metadata?.businessSector || ''
            }
          }));
        } else {
          setSupabaseUser(null);
          setState({
            user: null,
            questionnaire: null,
            isAuthenticated: false,
            currentStep: 0,
          });
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const setUser = (user: User) => {
    setState(prev => ({ ...prev, user, isAuthenticated: true }));
  };

  const setSupabaseUserState = (user: SupabaseUser | null) => {
    setSupabaseUser(user);
  };

  const setQuestionnaire = (questionnaire: QuestionnaireData) => {
    setState(prev => ({ ...prev, questionnaire }));
  };

  const setCurrentStep = (currentStep: number) => {
    setState(prev => ({ ...prev, currentStep }));
  };

  const logout = async () => {
    await signOut();
    setSupabaseUser(null);
    setState({
      user: null,
      questionnaire: null,
      isAuthenticated: false,
      currentStep: 0,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        setSupabaseUser: setSupabaseUserState,
        setQuestionnaire,
        setCurrentStep,
        logout,
        loading,
        supabaseUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};