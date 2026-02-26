import { useState, useEffect, useRef } from 'react';
import { X, Clock, AlertCircle, Trophy, RefreshCcw, CheckCircle, Smartphone, Mail, User, ArrowRight, Loader2, Edit2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useQuiz } from '../../context/QuizContext';
import { useCertificate } from '../../context/CertificateContext';
import { Question, AdminUserRecord } from './types';

const ADMIN_STORAGE_KEY = 'quiz_admin_session';

// Helper to manage Admin Session Storage
const AdminStore = {
    getData: (): AdminUserRecord[] => {
        try {
            const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
            return JSON.parse(stored || '[]');
        } catch (e) {
            console.error('AdminStore read error:', e);
            return [];
        }
    },

    saveData: (data: AdminUserRecord[]) => {
        try {
            localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('AdminStore save error:', e);
        }
    },

    getAttemptsInfo: (email: string): { attempts: number, maxAttempts: number } => {
        const data = AdminStore.getData();
        const user = data.find(u => u.email.toLowerCase() === email.toLowerCase());
        return {
            attempts: user ? user.attempts : 0,
            maxAttempts: user?.maxAttempts ?? 2
        };
    },

    recordAttempt: (user: { name: string; email: string; phone: string; university?: string }) => {
        if (!user.email) {
            console.error('Cannot record attempt: Email is missing');
            return;
        }

        const data = AdminStore.getData();
        const existingIndex = data.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
        const now = new Date().toISOString();

        if (existingIndex >= 0) {
            data[existingIndex] = {
                ...data[existingIndex],
                attempts: data[existingIndex].attempts + 1,
                lastAttemptAt: now
            };
        } else {
            data.push({
                name: user.name,
                email: user.email,
                phone: user.phone,
                university: user.university,
                attempts: 1,
                firstAttemptAt: now,
                lastAttemptAt: now
            });
        }
        AdminStore.saveData(data);
    }
};

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type VerificationStep = 'contact' | 'otp' | 'verified' | 'limitReached';

// Extracted ResultScreen Component
interface ResultScreenProps {
    score: number;
    total: number;
    passingScore: number;
    attempts: number;
    maxAttempts: number;
    onClose: () => void;
    onRetry: () => void;
    onViewCertificate: () => void;
}

const ResultScreen = ({ score, total, passingScore, attempts, maxAttempts, onClose, onRetry, onViewCertificate }: ResultScreenProps) => {
    const percentage = (score / total) * 100;
    const isPassed = percentage >= passingScore;
    const limitReached = attempts >= maxAttempts;

    // Trigger confetti on pass
    useEffect(() => {
        if (isPassed) {
            try {
                const duration = 3000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

                const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    // @ts-ignore
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    // @ts-ignore
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);

                return () => clearInterval(interval);
            } catch (error) {
                console.error("Confetti animation failed:", error);
            }
        }
    }, [isPassed]);

    return (
        <div className="text-center space-y-6">
            <div className={`p-6 rounded-full inline-block mb-2 ${isPassed ? 'bg-green-100' : 'bg-orange-100'}`}>
                {isPassed ? (
                    <Trophy className={`w-16 h-16 ${isPassed ? 'text-green-600' : 'text-orange-600'}`} />
                ) : (
                    <AlertCircle className="w-16 h-16 text-orange-600" />
                )}
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                    {isPassed ? 'Congratulations!' : 'Keep Learning!'}
                </h2>
                <p className="text-gray-600">
                    {isPassed
                        ? 'You have successfully passed the assessment.'
                        : 'You didn\'t pass this time. Try again to improve your score.'}
                </p>
            </div>

            <div className="py-8 grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="text-center border-r border-slate-200">
                    <p className="text-4xl font-bold text-slate-900">{score}/{total}</p>
                    <p className="text-xs text-slate-500 uppercase mt-1">Your Score</p>
                </div>
                <div className="text-center">
                    <p className={`text-4xl font-bold ${isPassed ? 'text-green-600' : 'text-orange-500'}`}>
                        {Math.round(percentage)}%
                    </p>
                    <p className="text-xs text-slate-500 uppercase mt-1">Percentage</p>
                </div>
            </div>

            {/* Attempts Display */}
            <div className="text-sm text-gray-500 mb-2">
                Attempts used: <span className="font-semibold text-gray-900">{attempts} / {maxAttempts}</span>
            </div>

            <div className="flex space-x-4 justify-center">
                <button
                    onClick={onClose}
                    className={`px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors ${isPassed ? 'flex-1' : ''}`}
                >
                    Close
                </button>

                {isPassed && (
                    <button
                        onClick={onViewCertificate}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20 flex items-center space-x-2 flex-1 justify-center"
                    >
                        <Trophy className="w-4 h-4" />
                        <span>View Certificate</span>
                    </button>
                )}

                {!isPassed && (
                    <button
                        onClick={onRetry}
                        disabled={limitReached}
                        className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 shadow-lg
                    ${limitReached
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'}`}
                    >
                        {limitReached ? (
                            <span>Attempt Limit Reached</span>
                        ) : (
                            <>
                                <RefreshCcw className="w-4 h-4" />
                                <span>Try Again</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
    const { config } = useQuiz();
    const { issueCertificate } = useCertificate();
    const [gameState, setGameState] = useState<'start' | 'verification' | 'playing' | 'result'>('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Verification State
    const [verificationStep, setVerificationStep] = useState<VerificationStep>('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        university: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [otpTimer, setOtpTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Initialize quiz when opening
    useEffect(() => {
        if (isOpen) {
            setGameState('start');
            setVerificationStep('contact');
            setSelectedAnswers({});
            setCurrentQuestionIndex(0);
            setFormData({ name: '', email: '', phone: '', university: '' });
            setOtp(['', '', '', '', '', '']);
        }
    }, [isOpen]);

    // OTP Timer
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (verificationStep === 'otp' && otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [verificationStep, otpTimer]);


    const [issuedToken, setIssuedToken] = useState<string | null>(null);

    const handleViewCertificate = () => {
        if (issuedToken) {
            onClose();
            // Redirect to User Certificate View with Public Token
            window.open(`/certificate/view/${issuedToken}`, '_blank');
        } else {
            // Fallback if something went wrong, though finishQuiz should have set it
            console.error("Certificate Token not found");
            alert("Certificate Token missing. Please contact support.");
        }
    };

    const startVerification = () => {
        setGameState('verification');
        setVerificationStep('contact');
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSendingOtp(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSendingOtp(false);
        setVerificationStep('otp');
        setOtpTimer(30);
        setCanResend(false);
        // Focus first OTP input
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    };

    const handleVerifyOtp = async () => {
        setIsVerifyingOtp(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsVerifyingOtp(false);
        // Mock verification success (accept any 6-digit code for now)
        if (otp.join('').length === 6) {
            const { attempts, maxAttempts } = AdminStore.getAttemptsInfo(formData.email);
            if (attempts >= maxAttempts) {
                setVerificationStep('limitReached');
            } else {
                setVerificationStep('verified');
            }
        }
    };

    const handleResendOtp = async () => {
        setCanResend(false);
        setOtpTimer(30);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock resend logic
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.every(char => !isNaN(Number(char)))) {
            const newOtp = [...otp];
            pastedData.forEach((char, index) => {
                if (index < 6) newOtp[index] = char;
            });
            setOtp(newOtp);
            otpInputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    const startQuiz = () => {
        // Double check attempts before starting
        const { attempts, maxAttempts } = AdminStore.getAttemptsInfo(formData.email);
        if (attempts >= maxAttempts) {
            setVerificationStep('limitReached');
            return;
        }

        // Shuffle and slice questions based on config
        const shuffled = [...config.questions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, config.totalQuestionsToAsk);
        setQuizQuestions(selected);

        // Reset quiz state
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setTimeLeft(config.timeLimitMinutes * 60);
        setGameState('playing');
    };

    // Timer logic
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (gameState === 'playing' && timeLeft === 0) {
            finishQuiz();
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, gameState]);

    const handleOptionSelect = (optionId: string) => {
        const currentQ = quizQuestions[currentQuestionIndex];
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQ.id]: optionId
        }));
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsTransitioning(false);
            }, 300);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        AdminStore.recordAttempt(formData);

        // Calculate score immediately to check if passed
        const score = calculateScore();
        const percentage = (score / config.totalQuestionsToAsk) * 100;

        if (percentage >= config.passingScorePercentage) {
            const cert = issueCertificate({
                name: formData.name,
                email: formData.email,
                university: formData.university
            }, 'Web3 Security Level-Up');
            setIssuedToken(cert.publicToken);
        }

        setGameState('result');
    };

    const calculateScore = () => {
        let score = 0;
        quizQuestions.forEach(q => {
            if (selectedAnswers[q.id] === q.correctOptionId) {
                score++;
            }
        });
        return score;
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    // --- RENDER HELPERS ---

    const renderVerificationScreen = () => {
        if (verificationStep === 'limitReached') {
            return (
                <div className="text-center space-y-6 py-8 animate-scaleIn">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-10 h-10 text-gray-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Attempt Limit Reached</h2>
                        <p className="text-gray-600 max-w-xs mx-auto">
                            You have already used all your attempts for this assessment.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
                    >
                        Close
                    </button>
                </div>
            );
        }

        return (
            <div className="max-w-md mx-auto py-4">
                {verificationStep !== 'verified' && (
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Just one step away! 🚀</h2>
                        <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                            <span className={verificationStep === 'contact' ? 'text-blue-600 font-semibold' : ''}>Step 1</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className={verificationStep === 'otp' ? 'text-blue-600 font-semibold' : ''}>Step 2</span>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                style={{ width: verificationStep === 'contact' ? '50%' : '100%' }}
                            />
                        </div>
                    </div>
                )}

                {verificationStep === 'contact' && (
                    <form onSubmit={handleSendOtp} className="space-y-5 animate-fadeIn">
                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="relative group">
                                <Smartphone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={formData.university}
                                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400"
                                    placeholder="University / Company Name"
                                />
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <p>Your details are used only for verification purposes and certification.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSendingOtp}
                            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isSendingOtp ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Sending OTP...</span>
                                </>
                            ) : (
                                <>
                                    <span>Get OTP</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                {verificationStep === 'otp' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="text-center space-y-2">
                            <p className="text-gray-600">
                                Enter the 6-digit code sent to <br />
                                <span className="font-semibold text-gray-900">{formData.email}</span>
                            </p>
                            <button
                                onClick={() => setVerificationStep('contact')}
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-1 mx-auto"
                            >
                                <Edit2 className="w-3 h-3" />
                                <span>Change details</span>
                            </button>
                        </div>

                        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => { if (el) otpInputRefs.current[index] = el; }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all caret-blue-600 text-gray-900 bg-white"
                                />
                            ))}
                        </div>

                        <div className="text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResendOtp}
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <p className="text-sm text-gray-400 font-medium">
                                    Resend OTP in {otpTimer}s
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={otp.some(d => !d) || isVerifyingOtp}
                            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isVerifyingOtp ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <span>Verify & Continue</span>
                            )}
                        </button>
                    </div>
                )}

                {verificationStep === 'verified' && (
                    <div className="text-center space-y-6 py-8 animate-scaleIn">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">You're verification is complete! 🎉</h2>
                            <p className="text-gray-600">
                                Thanks <span className="font-semibold text-gray-900">{formData.name}</span>.<br />
                                You are now ready to take the assessment.
                            </p>
                        </div>
                        <button
                            onClick={startQuiz}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-500/30"
                        >
                            Start Level-Up Quiz
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderStartScreen = () => (
        <div className="text-center space-y-6">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Trophy className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Ready to Level Up?</h2>

            {/* 
                PREVIOUSLY: Showed quiz details (questions, time, passing score)
                MODIFIED: Added check for empty question pool since Quiz Config was removed.
            */}
            {config.questions.length === 0 ? (
                <div className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 max-w-sm mx-auto">
                        <AlertCircle className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-orange-900 mb-1">Assessment Unavailable</h3>
                        <p className="text-sm text-orange-700">
                            The quiz configuration has been updated and there are currently no questions available.
                            Please check back later or contact the administrator.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Test your knowledge of Web3 Security and Blockchain concepts.
                    </p>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Questions</p>
                            <p className="text-xl font-bold text-slate-900">{config.totalQuestionsToAsk}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Time Limit</p>
                            <p className="text-xl font-bold text-slate-900">{config.timeLimitMinutes} min</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Pass Score</p>
                            <p className="text-xl font-bold text-slate-900">{config.passingScorePercentage}%</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Format</p>
                            <p className="text-xl font-bold text-slate-900">MCQ</p>
                        </div>
                    </div>

                    <button
                        onClick={startVerification}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                    >
                        Start Quiz
                    </button>
                </>
            )}
        </div>
    );

    const renderQuestionScreen = () => {
        const question = quizQuestions[currentQuestionIndex];
        if (!question) return <div>Loading...</div>;

        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

        return (
            <div className={`space-y-6 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                {/* Header: Progress & Timer */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 mr-4">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        <Clock className="w-4 h-4" />
                        <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                {/* Question */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                        {question.text}
                    </h3>

                    <div className="space-y-3">
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                  ${selectedAnswers[question.id] === option.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                                    }`}
                            >
                                <span className={`text-base ${selectedAnswers[question.id] === option.id ? 'text-blue-900 font-medium' : 'text-gray-600'}`}>
                                    {option.text}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${selectedAnswers[question.id] === option.id
                                        ? 'border-blue-600 bg-blue-600'
                                        : 'border-slate-300 group-hover:border-blue-400'
                                    }`}
                                >
                                    {selectedAnswers[question.id] === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={nextQuestion}
                        disabled={!selectedAnswers[question.id]}
                        className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2
                ${selectedAnswers[question.id]
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next Question'}</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-slate-900">Level-Up Assessment</h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {gameState === 'start' && renderStartScreen()}
                    {gameState === 'verification' && renderVerificationScreen()}
                    {gameState === 'playing' && renderQuestionScreen()}
                    {gameState === 'result' && (
                        <ResultScreen
                            score={calculateScore()}
                            total={quizQuestions.length}
                            passingScore={config.passingScorePercentage}
                            attempts={AdminStore.getAttemptsInfo(formData.email).attempts}
                            maxAttempts={AdminStore.getAttemptsInfo(formData.email).maxAttempts}
                            onClose={onClose}
                            onRetry={startVerification}
                            onViewCertificate={handleViewCertificate}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

