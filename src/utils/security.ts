import type { User, Purpose, ConsentStatus } from '../types';

// Mock hashing function (simulating SHA-256)
export const hashPassword = (password: string): string => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return `hash_${Math.abs(hash).toString(16)}`;
};

// Mock digital signature generation
export const signArtifact = (artifact: object): string => {
    const content = JSON.stringify(artifact);
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    // Simulate a signature with a timestamp and mock key ID
    return `sig_KeyID.8392_${Math.abs(hash).toString(16)}_${Date.now()}`;
};

// Verify the signature (Mock verification)
export const verifyArtifact = (_artifact: object, signature: string): boolean => {
    // In a real system, we would verify the signature against the public key
    // Here we just check if the signature format is correct for our mock
    return signature.startsWith('sig_KeyID');
};

export const generateConsentArtifact = (user: User, purpose: Purpose, status: ConsentStatus): any => {
    const timestamp = new Date().toISOString();
    const artifact = {
        schemaVersion: '1.0.0',
        consentId: Math.random().toString(36).substr(2, 9),
        principal: {
            id: user.id,
            idType: user.email ? 'email' : 'mobile', // Simplified
        },
        purpose: {
            id: purpose.id,
            name: purpose.name,
            version: '1.0'
        },
        consent: {
            status,
            ts: timestamp,
            validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            frequency: {
                repeats: false,
                value: 0,
                unit: 'DAY'
            }
        },
        dataProvider: {
            id: 'DP_12345',
            name: 'Demo Data Fiduciary'
        }
    };

    // Add signature
    const signature = signArtifact(artifact);
    return { ...artifact, signature };
};
