import { useState, useEffect } from 'react';
import { X, Cookie, ChevronDown, ChevronUp } from 'lucide-react';

export default function CookieBanner() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        // Check if user has already set preferences
        const saved = localStorage.getItem('cookie_preferences');
        if (!saved) {
            setTimeout(() => setIsOpen(true), 1000);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
        setIsOpen(false);
    };

    const handleAcceptAll = () => {
        const all = { essential: true, analytics: true, marketing: true };
        setPreferences(all);
        localStorage.setItem('cookie_preferences', JSON.stringify(all));
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => !preferences.essential && setIsOpen(false)} />
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-scale-up overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <Cookie className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Cookie Settings</h3>
                                <p className="text-sm text-gray-500 mt-1">Manage your privacy preferences</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.
                    </p>

                    {showDetails && (
                        <div className="space-y-4 mb-6 border-t border-gray-100 pt-4 animate-fade-in max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-semibold text-gray-900">Essential Cookies</div>
                                    <div className="text-xs text-gray-500">Required for the website to function.</div>
                                </div>
                                <input type="checkbox" checked disabled className="w-5 h-5 text-blue-600 rounded bg-gray-200 border-gray-300" />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}>
                                <div>
                                    <div className="font-semibold text-gray-900">Analytics</div>
                                    <div className="text-xs text-gray-500">Help us understand visitor interactions.</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.analytics}
                                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}>
                                <div>
                                    <div className="font-semibold text-gray-900">Marketing</div>
                                    <div className="text-xs text-gray-500">Used to deliver relevant ads.</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.marketing}
                                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={handleAcceptAll}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
                        >
                            Accept All Cookies
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={showDetails ? handleSave : () => setIsOpen(false)}
                                className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                {showDetails ? 'Save Preferences' : 'Reject All'}
                            </button>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                {showDetails ? (
                                    <>Less <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>Customize <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
