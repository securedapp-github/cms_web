import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCertificate } from '../context/CertificateContext';
import CertificateGenerator from '../components/Certificate/CertificateGenerator';
import { ShieldCheck, ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';

export default function CertificateView() {
    const { token } = useParams(); // Changed from 'id' to 'token'
    const { getCertificateByToken } = useCertificate();

    // Status can be: 'loading' | 'valid' | 'invalid'
    const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
    const [certificate, setCertificate] = useState<any>(null);

    useEffect(() => {
        // Mocking a network delay for "verification" feel
        const timer = setTimeout(() => {
            if (token) {
                const cert = getCertificateByToken(token);
                if (cert) {
                    setCertificate(cert);
                    setStatus('valid');
                } else {
                    setStatus('invalid');
                }
            } else {
                setStatus('invalid');
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [token, getCertificateByToken]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Verifying secure certificate token...</p>
                </div>
            </div>
        );
    }

    if (status === 'invalid') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid or Expired Link</h1>
                    <p className="text-gray-600 mb-6">
                        This certificate link is invalid. Please check the URL or contact the administrator.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Home
                    </Link>
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200">
                        <ShieldCheck className="w-4 h-4" />
                        Verified Public Certificate
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 flex justify-center">
                    {/* Pass the verified certificate to the generator */}
                    <CertificateGenerator certificate={certificate} />
                </div>
            </div>
        </div>
    );
}
