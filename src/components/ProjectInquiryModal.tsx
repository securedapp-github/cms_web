import { useState } from 'react';
import Modal from './Modal';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ProjectInquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SERVICE_OFFERINGS = [
    "Smart Contract Audit",
    "Web3 Security",
    "Regulatory Solutions",
    "Training & Education",
    "Other"
];

const CMS_FIELDS = {
    source: "CMS",
    platform: "Website",
    campaign: "Default Campaign",
    submittedFrom: "Project Inquiry Page"
};

export default function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        serviceOffering: SERVICE_OFFERINGS[0],
        message: '',
        agreePrivacy: false,
        subscribeUpdates: false
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const payload = {
                ...formData,
                ...CMS_FIELDS
            };

            const response = await fetch('https://crm-be.securedapp.io/api/public/project-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            setStatus('success');

            // Auto close after success
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({
                    fullName: '',
                    mobile: '',
                    email: '',
                    serviceOffering: SERVICE_OFFERINGS[0],
                    message: '',
                    agreePrivacy: false,
                    subscribeUpdates: false
                });
            }, 3000);

        } catch (error) {
            console.error('Submission failed:', error);
            setStatus('error');
            setErrorMessage('Failed to submit inquiry. Please try again later.');
        }
    };

    if (status === 'success') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="Project Inquiry">
                <div className="text-center py-8 animate-fadeIn">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Inquiry Sent!</h4>
                    <p className="text-gray-600">
                        Thank you for reaching out. Our team will review your project requirements and get back to you shortly.
                    </p>
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Start a Project">
            {status === 'error' && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={formData.mobile}
                            onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Offering <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            required
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                            value={formData.serviceOffering}
                            onChange={e => setFormData({ ...formData, serviceOffering: e.target.value })}
                        >
                            {SERVICE_OFFERINGS.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        rows={3}
                        required
                        className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project requirements..."
                    />
                </div>

                <div className="space-y-3 pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            required
                            className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            checked={formData.agreePrivacy}
                            onChange={e => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                            I agree to the <a href="/privacy-policy" className="text-blue-600 hover:underline" onClick={e => e.stopPropagation()}>Privacy Policy</a> and consent to the processing of my data.
                        </span>
                    </label>

                    <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            checked={formData.subscribeUpdates}
                            onChange={e => setFormData({ ...formData, subscribeUpdates: e.target.checked })}
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                            Keep me updated on the latest Web3 security news and offers.
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4 shadow-lg shadow-blue-500/20"
                >
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending Inquiry...</span>
                        </>
                    ) : (
                        <span>Submit Project Inquiry</span>
                    )}
                </button>
            </form>
        </Modal>
    );
}
