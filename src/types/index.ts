export type Role = 'user' | 'fiduciary' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    mobile?: string; // Module 1: Mobile registration
    passwordHash?: string; // Module 1: Secure storage
    role: Role;
    isVerified?: boolean; // Module 1: Verification
    linkedIdentities?: Array<{
        provider: 'google' | 'aadhaar' | 'wallet' | 'other';
        id: string;
        linkedAt: string;
    }>; // Module 1: Identity Linking
    walletAddress?: string; // Module 1: Wallet
    preferences: {
        language: string;
        notifications: boolean;
    };
}

export type ConsentStatus = 'granted' | 'denied' | 'withdrawn';

export interface Purpose {
    id: string;
    name: string;
    description: string;
    required: boolean;
}

export interface ConsentRecord {
    id: string;
    userId: string;
    purposeId: string;
    status: ConsentStatus;
    lifecycleStatus: 'active' | 'revoked' | 'expired' | 'modified'; // Module 2: Lifecycle
    artifact?: any; // Module 2: Signed Artifact
    history?: Array<{
        status: ConsentStatus;
        timestamp: string;
        actor: string;
    }>;
    lastUpdated: string;
    validUntil: string;
}

export interface ConsentLog {
    id: string;
    timestamp: string;
    userId: string;
    action: 'grant' | 'deny' | 'withdraw' | 'renew' | 'update';
    purposeId: string;
    ipAddress: string;
    userAgent: string;
    metadata: Record<string, any>;
}

export interface Grievance {
    id: string;
    userId: string;
    subject: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved';
    createdAt: string;
    updatedAt: string;
    resolution?: string;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    read: boolean;
    createdAt: string;
}

export const DEFAULT_PURPOSES: Purpose[] = [
    { id: 'marketing_email', name: 'Marketing Emails', description: 'Receive updates about new products and offers', required: false },
    { id: 'analytics', name: 'Analytics Tracking', description: 'Allow anonymous usage tracking to improve service', required: false },
    { id: 'third_party_share', name: 'Third-Party Data Sharing', description: 'Share data with partners for personalized offers', required: false },
    { id: 'push_notifications', name: 'Push Notifications', description: 'Receive real-time alerts on your device', required: false },
];

export interface DemoRequest {
    id: string;
    name: string;
    email: string;
    company: string;
    phone?: string;
    message?: string;
    status: 'pending' | 'replied';
    createdAt: string;
}
