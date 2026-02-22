import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CertificateTemplate {
    id: string;
    name: string;
    bgStyle: string;
    textColor: string;
    borderColor: string;
    layout: 'modern' | 'classic' | 'tech';
}

export interface IssuedCertificate {
    id: string;
    publicToken: string;
    userId: string;
    userName: string;
    university?: string;
    courseName: string;
    issueDate: string;
    templateId: string;
    verificationHash: string;
}

interface CertificateContextType {
    certificates: IssuedCertificate[];
    templates: CertificateTemplate[];
    issueCertificate: (user: { name: string; email: string; university?: string }, courseName: string) => IssuedCertificate;
    getCertificate: (id: string) => IssuedCertificate | undefined;
    getCertificateByToken: (token: string) => IssuedCertificate | undefined;
    getUserCertificates: (email: string) => IssuedCertificate[];
    verifyCertificate: (id: string) => boolean;
    addTemplate: (template: Omit<CertificateTemplate, 'id'>) => void;
    deleteTemplate: (id: string) => void;
}

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const DEFAULT_TEMPLATES: CertificateTemplate[] = [
    {
        id: 'modern-blue',
        name: 'Modern Blue',
        bgStyle: 'bg-gradient-to-br from-slate-50 to-white',
        textColor: 'text-slate-900',
        borderColor: 'border-blue-600',
        layout: 'modern'
    },
    {
        id: 'classic-gold',
        name: 'Classic Gold',
        bgStyle: 'bg-[#fffcf5]',
        textColor: 'text-serif text-slate-900',
        borderColor: 'border-yellow-600',
        layout: 'classic'
    },
    {
        id: 'tech-dark',
        name: 'Tech Dark',
        bgStyle: 'bg-slate-900',
        textColor: 'text-white',
        borderColor: 'border-cyan-500',
        layout: 'tech'
    }
];

export function CertificateProvider({ children }: { children: React.ReactNode }) {
    const [certificates, setCertificates] = useState<IssuedCertificate[]>([]);
    const [templates, setTemplates] = useState<CertificateTemplate[]>([]);

    useEffect(() => {
        const storedCerts = localStorage.getItem('issued_certificates');
        const storedTemplates = localStorage.getItem('certificate_templates');

        if (storedCerts) {
            try {
                setCertificates(JSON.parse(storedCerts));
            } catch (e) {
                console.error('Failed to parse certificates', e);
            }
        }

        if (storedTemplates) {
            try {
                setTemplates(JSON.parse(storedTemplates));
            } catch (e) {
                console.error('Failed to parse templates', e);
                setTemplates(DEFAULT_TEMPLATES);
            }
        } else {
            setTemplates(DEFAULT_TEMPLATES);
        }
    }, []);

    const saveCertificates = (certs: IssuedCertificate[]) => {
        setCertificates(certs);
        localStorage.setItem('issued_certificates', JSON.stringify(certs));
    };

    const saveTemplates = (temps: CertificateTemplate[]) => {
        setTemplates(temps);
        localStorage.setItem('certificate_templates', JSON.stringify(temps));
    };

    const issueCertificate = (user: { name: string; email: string; university?: string }, courseName: string) => {
        const existing = certificates.find(c => c.userId === user.email && c.courseName === courseName);
        if (existing) {
            if (!existing.publicToken) {
                const updatedCert = {
                    ...existing,
                    publicToken: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                };
                const updatedCerts = certificates.map(c => c.id === existing.id ? updatedCert : c);
                saveCertificates(updatedCerts);
                return updatedCert;
            }
            return existing;
        }

        const newCert: IssuedCertificate = {
            id: `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
            publicToken: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            userId: user.email,
            userName: user.name,
            university: user.university,
            courseName,
            issueDate: new Date().toISOString(),
            templateId: templates[0]?.id || 'modern-blue',
            verificationHash: Math.random().toString(36).substring(7)
        };

        const updated = [...certificates, newCert];
        saveCertificates(updated);
        return newCert;
    };

    const getCertificate = (id: string) => {
        return certificates.find(c => c.id === id);
    };

    const getCertificateByToken = (token: string) => {
        return certificates.find(c => c.publicToken === token);
    };

    const getUserCertificates = (email: string) => {
        return certificates.filter(c => c.userId === email);
    };

    const verifyCertificate = (id: string) => {
        return certificates.some(c => c.id === id);
    };

    const addTemplate = (template: Omit<CertificateTemplate, 'id'>) => {
        const newTemplate: CertificateTemplate = {
            ...template,
            id: `tpl_${Date.now()}`
        };
        saveTemplates([...templates, newTemplate]);
    };

    const deleteTemplate = (id: string) => {
        saveTemplates(templates.filter(t => t.id !== id));
    };

    return (
        <CertificateContext.Provider value={{
            certificates,
            templates,
            issueCertificate,
            getCertificate,
            getCertificateByToken,
            getUserCertificates,
            verifyCertificate,
            addTemplate,
            deleteTemplate
        }}>
            {children}
        </CertificateContext.Provider>
    );
}

export function useCertificate() {
    const context = useContext(CertificateContext);
    if (context === undefined) {
        throw new Error('useCertificate must be used within a CertificateProvider');
    }
    return context;
}
