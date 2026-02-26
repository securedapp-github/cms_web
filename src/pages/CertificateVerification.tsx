import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCertificate } from '../context/CertificateContext';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import CertificateGenerator from '../components/Certificate/CertificateGenerator';

export default function CertificateVerification() {
    const { id } = useParams();
    const { getCertificate } = useCertificate();
    const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
    const [certificate, setCertificate] = useState<any>(null);

    useEffect(() => {
        // Simulate network delay for realism
        const timer = setTimeout(() => {
            if (id) {
                const cert = getCertificate(id);
                if (cert) {
                    setCertificate(cert);
                    setStatus('valid');
                } else {
                    setStatus('invalid');
                }
            } else {
                setStatus('invalid');
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [id, getCertificate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-slate-900 p-6 text-center">
                    <h1 className="text-xl font-bold text-white">Certificate Verification</h1>
                    <p className="text-slate-400 text-sm">SecureCMS Blockchain Certification</p>
                </div>

                <div className="p-8 text-center space-y-6">
                    {status === 'loading' && (
                        <div className="py-12">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                            <p className="mt-4 text-gray-500">Verifying on blockchain...</p>
                        </div>
                    )}

                    {status === 'valid' && certificate && (
                        <div className="animate-scaleIn">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Valid Certificate</h2>
                            <p className="text-gray-600 mb-6">
                                This certificate is authentic and was issued to <span className="font-semibold text-gray-900">{certificate.userName}</span>.
                            </p>

                            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Course</span>
                                    <span className="font-medium text-gray-900">{certificate.courseName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Issued On</span>
                                    <span className="font-medium text-gray-900">{new Date(certificate.issueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Certificate ID</span>
                                    <span className="font-mono text-gray-900">{certificate.id}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'invalid' && (
                        <div className="animate-scaleIn">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate</h2>
                            <p className="text-gray-600">
                                We could not find a valid certificate with ID: <br />
                                <span className="font-mono font-bold text-gray-800">{id || 'MISSING'}</span>
                            </p>
                        </div>
                    )}

                    <Link
                        to="/"
                        className="block w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
                    >
                        Return Home
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <p className="mt-8 text-xs text-gray-400">
                Powered by SecureCMS Verification Engine
            </p>
        </div>
    );
}
