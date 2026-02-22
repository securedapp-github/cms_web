import React, { createContext, useContext, useState } from 'react';
import { QuizConfig, Question } from '../components/Quiz/types';

interface QuizContextType {
    config: QuizConfig;
    updateConfig: (newConfig: Partial<QuizConfig>) => void;
    addQuestion: (question: Omit<Question, 'id'>) => void;
    updateQuestion: (question: Question) => void;
    deleteQuestion: (id: string) => void;
    resetToDefaults: () => void;
}

const DEFAULT_QUESTIONS: Question[] = [];

const DEFAULT_CONFIG: QuizConfig = {
    timeLimitMinutes: 5,
    totalQuestionsToAsk: 3,
    passingScorePercentage: 70,
    questions: DEFAULT_QUESTIONS,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [config] = useState<QuizConfig>(DEFAULT_CONFIG);

    const updateConfig = () => {
        console.warn("updateConfig is deprecated. Quiz Configuration module has been removed.");
    };

    const addQuestion = () => {
        console.warn("addQuestion is deprecated. Quiz Configuration module has been removed.");
    };

    const updateQuestion = () => {
        console.warn("updateQuestion is deprecated. Quiz Configuration module has been removed.");
    };

    const deleteQuestion = () => {
        console.warn("deleteQuestion is deprecated. Quiz Configuration module has been removed.");
    };

    const resetToDefaults = () => {
        console.warn("resetToDefaults is deprecated. Quiz Configuration module has been removed.");
    };

    return (
        <QuizContext.Provider
            value={{
                config,
                updateConfig,
                addQuestion,
                updateQuestion,
                deleteQuestion,
                resetToDefaults,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}
