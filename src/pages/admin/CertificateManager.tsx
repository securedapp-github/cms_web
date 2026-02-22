import { useState } from 'react';
import { useCertificate, CertificateTemplate } from '../../context/CertificateContext';
import { Search, Filter, Download, Eye, Award } from 'lucide-react';
import Modal from '../../components/Modal';
import CertificateGenerator from '../../components/Certificate/CertificateGenerator';

export default function CertificateManager() {
    const { certificates, templates, addTemplate, deleteTemplate } = useCertificate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCert, setSelectedCert] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Template Management State
    const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
    const [newTemplate, setNewTemplate] = useState<Partial<CertificateTemplate>>({
        name: '',
        bgStyle: 'bg-white',
        textColor: 'text-slate-900',
        borderColor: 'border-slate-200',
        layout: 'modern'
    });

    // Filter Logic
    const filteredCerts = certificates.filter(c =>
        c.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = (cert: any) => {
        setSelectedCert(cert);
        setIsViewModalOpen(true);
    };

    const handleAddTemplate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTemplate.name) return;

        addTemplate({
            name: newTemplate.name,
            bgStyle: newTemplate.bgStyle || 'bg-white',
            textColor: newTemplate.textColor || 'text-slate-900',
            borderColor: newTemplate.borderColor || 'border-slate-200',
            layout: (newTemplate.layout as any) || 'modern'
        });
        setIsAddTemplateOpen(false);
        setNewTemplate({
            name: '',
            bgStyle: 'bg-white',
            textColor: 'text-slate-900',
            borderColor: 'border-slate-200',
            layout: 'modern'
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
                <p className="text-gray-600">Track and manage issued certificates and templates.</p>
            </div>

            {/* Templates Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Active Templates</h2>
                        <button
                            onClick={() => setIsAddTemplateOpen(true)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            + Add Template
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {templates.map(template => (
                            <div key={template.id} className={`p-4 rounded-xl border ${template.borderColor} ${template.bgStyle} relative overflow-hidden group hover:shadow-md transition-all`}>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-serif font-bold ${template.textColor}`}>{template.name}</h3>
                                        {templates.length > 1 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteTemplate(template.id); }}
                                                className="text-red-400 hover:text-red-600 p-1"
                                                title="Delete Template"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                    <p className={`text-sm opacity-70 ${template.textColor}`}>Layout: {template.layout}</p>
                                </div>
                                <Award className={`absolute -bottom-4 -right-4 w-24 h-24 opacity-10 ${template.textColor}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-600 p-6 rounded-xl shadow-lg text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold mb-2">Total Issued</h2>
                        <p className="text-4xl font-bold">{certificates.length}</p>
                        <p className="text-blue-200 text-sm mt-1">Certificates generated to date</p>
                    </div>
                    <button className="mt-6 w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                        Configure Settings
                    </button>
                </div>
            </div>

            {/* Issued Certificates Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-lg font-bold text-gray-900">Issued Certificates</h2>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search certificates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCerts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No certificates found.
                                    </td>
                                </tr>
                            ) : (
                                filteredCerts.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                                            {cert.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{cert.userName}</div>
                                            <div className="text-xs text-gray-500">{cert.userId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cert.courseName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(cert.issueDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleView(cert)}
                                                className="text-blue-600 hover:text-blue-900 flex items-center gap-1 justify-end ml-auto"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Certificate Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Certificate Preview"
            >
                <div className="flex flex-col items-center">
                    {selectedCert && <CertificateGenerator certificate={selectedCert} />}
                </div>
            </Modal>

            {/* Add Template Modal */}
            <Modal
                isOpen={isAddTemplateOpen}
                onClose={() => setIsAddTemplateOpen(false)}
                title="Create New Template"
            >
                <form onSubmit={handleAddTemplate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                        <input
                            type="text"
                            required
                            value={newTemplate.name}
                            onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Midnight Dark"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
                            <select
                                value={newTemplate.layout}
                                onChange={e => setNewTemplate({ ...newTemplate, layout: e.target.value as any })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="modern">Modern</option>
                                <option value="classic">Classic</option>
                                <option value="tech">Tech</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color Class</label>
                            <input
                                type="text"
                                value={newTemplate.textColor}
                                onChange={e => setNewTemplate({ ...newTemplate, textColor: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="text-slate-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Class (Tailwind)</label>
                        <input
                            type="text"
                            value={newTemplate.bgStyle}
                            onChange={e => setNewTemplate({ ...newTemplate, bgStyle: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            placeholder="bg-gradient-to-r from-blue-50 to-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Border Color Class</label>
                        <input
                            type="text"
                            value={newTemplate.borderColor}
                            onChange={e => setNewTemplate({ ...newTemplate, borderColor: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            placeholder="border-blue-500"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsAddTemplateOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            Create Template
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
