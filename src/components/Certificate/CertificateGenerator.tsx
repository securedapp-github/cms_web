import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IssuedCertificate, useCertificate } from '../../context/CertificateContext';
import { Download, Loader2, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificateGeneratorProps {
    certificate: IssuedCertificate;
}

export default function CertificateGenerator({ certificate }: CertificateGeneratorProps) {
    const certificateRef = useRef<HTMLDivElement>(null);
    const { templates } = useCertificate();
    const template = templates.find(t => t.id === certificate.templateId) || templates[0];

    // Format Date: "15th February, 2026"
    const formattedDate = new Date(certificate.issueDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // High resolution
                useCORS: true,
                backgroundColor: null,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${certificate.courseName.replace(/\s+/g, '_')}_Certificate.pdf`);
        } catch (err) {
            console.error('Certificate generation failed:', err);
            alert('Failed to generate certificate.');
        }
    };

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-500/30"
                >
                    <Download className="w-5 h-5" />
                    Download PDF
                </button>
                <Link
                    to={`/verify/${certificate.id}`}
                    target="_blank"
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                    <ExternalLink className="w-5 h-5" />
                    Verify Online
                </Link>
            </div>

            {/* Certificate Preview (Visible) */}
            <div className="overflow-auto p-4 flex justify-center bg-gray-100 rounded-xl border border-gray-200">
                <div
                    ref={certificateRef}
                    className={`relative w-[800px] h-[566px] p-12 shadow-2xl ${template.bgStyle} text-center flex flex-col items-center justify-between select-none border-8 border-double ${template.borderColor}`}
                    style={{ minWidth: '800px', minHeight: '566px' }}
                >
                    {/* Header */}
                    <div className="space-y-2 mt-8">
                        <div className="flex justify-center mb-4">
                            <Award className={`w-16 h-16 ${template.borderColor.replace('border', 'text')}`} />
                        </div>
                        <h1 className={`text-4xl font-serif font-bold ${template.textColor} uppercase tracking-widest`}>
                            Certificate of Completion
                        </h1>
                        <p className={`text-lg opacity-80 ${template.textColor}`}>
                            This is to certify that
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 my-auto">
                        <h2 className={`text-5xl font-bold font-serif italic ${template.textColor} py-2 border-b-2 ${template.borderColor} inline-block px-12`}>
                            {certificate.userName}
                        </h2>

                        {certificate.university && (
                            <p className={`text-xl ${template.textColor} opacity-90`}>
                                from <span className="font-semibold">{certificate.university}</span>
                            </p>
                        )}

                        <div className="space-y-1">
                            <p className={`text-lg opacity-80 ${template.textColor}`}>
                                has successfully completed the assessment for
                            </p>
                            <h3 className={`text-3xl font-bold ${template.textColor}`}>
                                {certificate.courseName}
                            </h3>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full flex justify-between items-end mt-8 pt-8 border-t border-gray-300/50">
                        <div className="text-left space-y-1">
                            <p className={`text-xs opacity-60 ${template.textColor}`}>Date Issued</p>
                            <p className={`text-lg font-semibold ${template.textColor}`}>{formattedDate}</p>
                        </div>

                        <div className="text-center">
                            {/* QR Code Placeholder */}
                            <div className="w-16 h-16 bg-white p-1 rounded border border-gray-200 mb-1 mx-auto flex items-center justify-center">
                                {/* In a real app, use a QR code library here */}
                                <div className="text-[10px] text-center leading-tight text-gray-400">Scan to<br />Verify</div>
                            </div>
                            <p className={`text-[10px] opacity-60 ${template.textColor}`}>ID: {certificate.id}</p>
                        </div>

                        <div className="text-right space-y-1">
                            <div className="h-10 border-b border-gray-400 w-32 mb-1"></div>
                            <p className={`text-xs opacity-60 ${template.textColor}`}>Authorized Signature</p>
                            <p className={`text-lg font-semibold font-serif ${template.textColor}`}>SecureCMS</p>
                        </div>
                    </div>

                    {/* Watermark / Decoration */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
                        <Award className="w-96 h-96" />
                    </div>
                </div>
            </div>
        </div>
    );
}
