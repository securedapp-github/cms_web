import { useState, useEffect } from 'react';
import { Phone, Check, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';

interface PhoneVerificationProps {
    onVerified: (phone: string, isVerified: boolean) => void;
}

export default function PhoneVerification({ onVerified }: PhoneVerificationProps) {
    const [phone, setPhone] = useState('');
    const [otpInput, setOtpInput] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
    const [step, setStep] = useState<'INPUT_PHONE' | 'INPUT_OTP' | 'VERIFIED'>('INPUT_PHONE');
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Timer logic
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const validatePhone = (number: string) => {
        if (!/^\d*$/.test(number)) return false; // Digits only
        if (number.length > 10) return false; // Max 10
        return true;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (validatePhone(val)) {
            setPhone(val);
            setError(null);
            // Reset if user changes phone after verification (optional, but good for consistency)
            if (step === 'VERIFIED') {
                setStep('INPUT_PHONE');
                onVerified(val, false);
                setSuccessMsg(null);
            }
        }
    };

    const sendOtp = () => {
        // Strict Validation: 10 digits, starts with 6-9
        const isValidIndianMobile = /^[6-9]\d{9}$/.test(phone);

        if (!isValidIndianMobile) {
            setError("Please enter a valid 10-digit mobile number starting with 6-9");
            return;
        }

        // Generate random 6-digit OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);
        setTimer(60);
        setStep('INPUT_OTP');
        setError(null);
        setOtpInput('');

        // Simulate sending (Log to console)
        console.log(`[MOCK OTP] Sent to ${phone}: ${newOtp}`);
        // In a real app, you might show a toast here, but for now console is fine + UI change
    };

    const verifyOtp = () => {
        if (otpInput === generatedOtp) {
            setStep('VERIFIED');
            setSuccessMsg("Phone number verified successfully");
            setError(null);
            onVerified(phone, true);
        } else {
            setError("Invalid or expired OTP");
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^\d{0,6}$/.test(val)) {
            setOtpInput(val);
            setError(null);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        disabled={step === 'INPUT_OTP' || step === 'VERIFIED'}
                        placeholder="9876543210"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${error && step === 'INPUT_PHONE' ? 'border-red-500 focus:ring-red-200' :
                            step === 'VERIFIED' ? 'border-green-500 bg-green-50 text-green-700' :
                                'border-gray-300 focus:ring-blue-500'
                            }`}
                    />
                    {step === 'VERIFIED' && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                    )}
                </div>
                {error && step === 'INPUT_PHONE' && (
                    <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {error}
                    </p>
                )}
            </div>

            {step === 'INPUT_PHONE' && (
                <button
                    type="button"
                    onClick={sendOtp}
                    disabled={phone.length !== 10}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                    <span>Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}

            {step === 'INPUT_OTP' && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-gray-700">Enter OTP</label>
                        <span className="text-xs text-gray-500">Sent to {phone}</span>
                    </div>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={otpInput}
                            onChange={handleOtpChange}
                            placeholder="XXXXXX"
                            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 outline-none text-center tracking-widest text-lg ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={otpInput.length !== 6}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Verify
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        {error && (
                            <p className="text-xs text-red-500 flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {error}
                            </p>
                        )}
                        {!error && <div />} {/* Spacer */}

                        {timer > 0 ? (
                            <p className="text-xs text-gray-500">Resend in {timer}s</p>
                        ) : (
                            <button
                                type="button"
                                onClick={sendOtp}
                                className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center"
                            >
                                <RefreshCw className="w-3 h-3 mr-1" /> Resend OTP
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => { setStep('INPUT_PHONE'); setOtpInput(''); setError(null); }}
                        className="mt-2 text-xs text-gray-400 underline hover:text-gray-600"
                    >
                        Change Number
                    </button>
                </div>
            )}

            {step === 'VERIFIED' && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">{successMsg}</span>
                </div>
            )}
        </div>
    );
}
