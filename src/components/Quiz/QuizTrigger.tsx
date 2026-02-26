import { useState } from 'react';
import { Trophy } from 'lucide-react';
import QuizModal from './QuizModal';

export default function QuizTrigger() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-blue-900/20"
            >
                <div className="p-1.5 bg-white/20 rounded-md">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <span className="block text-xs text-blue-100 font-medium tracking-wide uppercase">Challenge Yourself</span>
                    <span className="block text-sm font-bold">Level-Up Quiz</span>
                </div>
            </button>

            <QuizModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
