export interface User {
  name: string;
  businessName: string;
  email: string;
  password: string;
  businessSector: string;
}

export interface QuestionnaireData {
  digitalReadiness: {
    usesExcel: boolean;
    usesInventorySoftware: boolean;
    hasWebsite: boolean;
    usesDigitalPayments: boolean;
  };
  challenges: string[];
  goals: string[];
  currentTools: string[];
}

export interface AppState {
  user: User | null;
  questionnaire: QuestionnaireData | null;
  isAuthenticated: boolean;
  currentStep: number;
}