export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string; // The ID of the correct option
  explanation?: string; // Optional explanation for the answer
}

export interface QuizConfig {
  timeLimitMinutes: number; // Time limit for the entire quiz
  totalQuestionsToAsk: number; // How many questions to pick from the pool
  passingScorePercentage: number; // Minimum score % to pass
  questions: Question[]; // @deprecated - Question pool has been removed

}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  timeTakenSeconds: number;
}

export interface AdminUserRecord {
  name: string;
  email: string;
  phone: string;
  university?: string;
  attempts: number;
  maxAttempts?: number; // Optional, defaults to 2 if not present
  firstAttemptAt: string;
  lastAttemptAt: string;
}
