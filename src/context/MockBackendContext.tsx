import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ConsentRecord, ConsentLog, Grievance, Notification, Purpose, DEFAULT_PURPOSES, ConsentStatus, DemoRequest } from '../types';
import { hashPassword, generateConsentArtifact } from '../utils/security';

interface MockBackendContextType {
    user: User | null;
    login: (email: string, role: User['role']) => void; // Keeping for backward compat, or update signature? Let's keep for now but create new auth methods
    register: (data: Partial<User>, password?: string) => Promise<boolean>;
    loginWithCredentials: (emailOrMobile: string, password?: string, role?: User['role']) => Promise<boolean>;
    loginWithOtp: (contact: string, otp: string) => Promise<boolean>;
    verifyOtp: (contact: string, otp: string) => Promise<boolean>;
    loginWithOAuth: (provider: string) => Promise<boolean>;
    loginWithWallet: (address: string) => Promise<boolean>;
    linkIdentity: (provider: string, id: string) => void;
    logout: () => void;
    consents: ConsentRecord[];
    logs: ConsentLog[];
    grievances: Grievance[];
    notifications: Notification[];
    updateConsent: (purposeId: string, status: ConsentStatus) => void;
    submitGrievance: (subject: string, description: string) => void;
    updateGrievanceStatus: (id: string, status: Grievance['status'], resolution?: string) => void;
    markNotificationRead: (id: string) => void;
    purposes: Purpose[];
    demoRequests: DemoRequest[];
    submitDemoRequest: (data: Omit<DemoRequest, 'id' | 'status' | 'createdAt'>) => void;
    replyToDemoRequest: (id: string, replyMessage: string) => void;
    changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
    resetPassword: (contact: string, otp: string, newPassword: string) => Promise<boolean>;
}

const MockBackendContext = createContext<MockBackendContextType | undefined>(undefined);

export const useMockBackend = () => {
    const context = useContext(MockBackendContext);
    if (!context) throw new Error('useMockBackend must be used within a MockBackendProvider');
    return context;
};

export const MockBackendProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [consents, setConsents] = useState<ConsentRecord[]>([]);
    const [logs, setLogs] = useState<ConsentLog[]>([]);
    const [grievances, setGrievances] = useState<Grievance[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);


    // Persistence Effect
    // Persistence Effect for Users DB and Current Session
    useEffect(() => {
        // Load User DB
        const storedUsers = localStorage.getItem('secure_cms_users');
        if (storedUsers) {
            try {
                setUsers(JSON.parse(storedUsers));
            } catch (e) {
                console.error("Failed to parse stored users", e);
            }
        }

        // Load Current Session
        const storedUser = localStorage.getItem('secure_cms_user');
        let loadedUser: User | null = null;
        if (storedUser) {
            try {
                loadedUser = JSON.parse(storedUser);
                setUser(loadedUser);
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('secure_cms_user');
            }
        }

        // Load Consents
        const storedConsents = localStorage.getItem('secure_cms_consents');
        if (storedConsents) {
            try {
                setConsents(JSON.parse(storedConsents));
            } catch (e) {
                console.error("Failed to parse stored consents", e);
            }
        } else if (loadedUser) {
            // If user exists but no consents (e.g. first load after code update), init them
            initializeConsents(loadedUser.id);
        }
    }, []);

    // Save Users DB whenever it changes
    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem('secure_cms_users', JSON.stringify(users));
        }
    }, [users]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('secure_cms_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('secure_cms_user');
        }
    }, [user]);

    // Save Consents whenever they change
    useEffect(() => {
        if (consents.length > 0) {
            localStorage.setItem('secure_cms_consents', JSON.stringify(consents));
        }
    }, [consents]);

    // Simulation helpers
    const addLog = (action: ConsentLog['action'], purposeId: string, metadata: any = {}) => {
        if (!user) return;
        const newLog: ConsentLog = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            userId: user.id,
            action,
            purposeId,
            ipAddress: '192.168.1.1', // Simulated
            userAgent: navigator.userAgent,
            metadata: { ...metadata, language: user.preferences.language }
        };
        setLogs(prev => [newLog, ...prev]);
    };

    const addNotification = (userId: string, title: string, message: string) => {
        const newNotif: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            userId,
            title,
            message,
            type: 'info',
            read: false,
            createdAt: new Date().toISOString()
        };
        setNotifications(prev => [newNotif, ...prev]);
    };


    const register = async (data: Partial<User>, password?: string) => {
        // Check for duplicates
        if (users.some(u => u.email === data.email || (data.mobile && u.mobile === data.mobile))) {
            return false; // User already exists
        }

        const newUser: User = {
            id: 'usr_' + Math.random().toString(36).substr(2, 9),
            name: data.name || 'User',
            email: data.email || '',
            mobile: data.mobile,
            role: data.role || 'user',
            passwordHash: password ? hashPassword(password) : undefined,
            isVerified: !!data.mobile, // Mock auto-verify for mobile
            preferences: { language: 'en', notifications: true },
            linkedIdentities: []
        };

        setUsers(prev => [...prev, newUser]);
        setUser(newUser); // Auto login after signup
        initializeConsents(newUser.id);

        addNotification(newUser.id, 'Welcome', 'Welcome to SecureCMS. Please complete your profile setup.');
        return true;
    };

    const verifyOtp = async (_contact: string, otp: string) => {
        // Mock OTP check - accept '123456'
        if (otp === '123456') return true;
        return false;
    };

    const loginWithOtp = async (contact: string, otp: string) => {
        const isValid = await verifyOtp(contact, otp);
        if (!isValid) return false;

        // Try to find existing user or create mock one
        // For demo, we just create/overwrite session
        const mockUser: User = {
            id: 'usr_' + Math.random().toString(36).substr(2, 9),
            name: contact.includes('@') ? contact.split('@')[0] : 'User',
            email: contact.includes('@') ? contact : '',
            mobile: !contact.includes('@') ? contact : '',
            role: 'user',
            isVerified: true,
            preferences: { language: 'en', notifications: true },
            linkedIdentities: []
        };
        setUser(mockUser);
        initializeConsents(mockUser.id);
        return true;
    };

    const loginWithCredentials = async (emailOrMobile: string, password?: string, role: User['role'] = 'user') => {
        const foundUser = users.find(u =>
            (u.email === emailOrMobile || u.mobile === emailOrMobile) &&
            u.role === role // Enforce role check if needed, or allow any role? Let's be strict based on request
        );

        if (!foundUser) return false;

        // Verify Password
        if (password) {
            const hashed = hashPassword(password);
            if (foundUser.passwordHash !== hashed) return false;
        }

        setUser(foundUser);
        initializeConsents(foundUser.id);
        return true;
    };

    const loginWithOAuth = async (provider: string) => {
        // Simulate OAuth Redirect & Callback
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                const mockUser: User = {
                    id: 'usr_' + Math.random().toString(36).substr(2, 9),
                    name: `User via ${provider}`,
                    email: `user@${provider}.com`,
                    role: 'user',
                    isVerified: true,
                    preferences: { language: 'en', notifications: true },
                    linkedIdentities: [{
                        provider: provider as any,
                        id: `oauth_${Math.random().toString(36).substr(2, 8)}`,
                        linkedAt: new Date().toISOString()
                    }]
                };
                setUser(mockUser);
                initializeConsents(mockUser.id);
                resolve(true);
            }, 1000); // Simulate network delay
        });
    };

    const loginWithWallet = async (address: string) => {
        const mockUser: User = {
            id: 'usr_' + Math.random().toString(36).substr(2, 9),
            name: `Wallet User ${address.substr(0, 6)}...`,
            email: '',
            walletAddress: address,
            role: 'user',
            isVerified: true,
            preferences: { language: 'en', notifications: true },
            linkedIdentities: [{
                provider: 'wallet',
                id: address,
                linkedAt: new Date().toISOString()
            }]
        };
        setUser(mockUser);
        initializeConsents(mockUser.id);
        return true;
    };

    const linkIdentity = (provider: string, id: string) => {
        if (!user) return;

        // Prevent duplicates
        if (user.linkedIdentities?.some(i => i.provider === provider && i.id === id)) {
            addNotification(user.id, 'Linking Failed', `This ${provider} account is already linked.`);
            return;
        }

        setUser(curr => {
            if (!curr) return null;
            const newIdentities = [...(curr.linkedIdentities || []), {
                provider: provider as any,
                id,
                linkedAt: new Date().toISOString()
            }];
            return { ...curr, linkedIdentities: newIdentities };
        });
        addNotification(user.id, 'Identity Linked', `Successfully linked ${provider} account.`);
    };

    // Kept for existing components compatibility
    const login = (email: string, role: User['role']) => {
        // Simulate user fetch
        const mockUser: User = {
            id: 'usr_' + Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            role,
            preferences: { language: 'en', notifications: true },
            linkedIdentities: []
        };
        setUser(mockUser);
        initializeConsents(mockUser.id);
    };

    const initializeConsents = (userId: string) => {
        // Check if we have stored consents for this user? 
        // For simple mock, reset consents on new login session or load default
        const initialConsents = DEFAULT_PURPOSES.map(p => ({
            id: Math.random().toString(36).substr(2, 9),
            userId: userId,
            purposeId: p.id,
            status: 'denied' as ConsentStatus,
            lifecycleStatus: 'active' as const,
            lastUpdated: new Date().toISOString(),
            validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            history: []
        }));
        setConsents(initialConsents);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('secure_cms_user');
    };

    const updateConsent = (purposeId: string, status: ConsentStatus) => {
        if (!user) return;

        const purpose = DEFAULT_PURPOSES.find(p => p.id === purposeId);

        // Generate artifact
        const artifact = purpose ? generateConsentArtifact(user, purpose, status) : null;
        const artifactString = artifact ? JSON.stringify(artifact) : undefined;

        setConsents(prev => prev.map(c =>
            c.purposeId === purposeId
                ? {
                    ...c,
                    status,
                    lifecycleStatus: status === 'withdrawn' ? 'revoked' : 'active',
                    lastUpdated: new Date().toISOString(),
                    artifact: artifactString,
                    history: [...(c.history || []), { status: c.status, timestamp: c.lastUpdated, actor: 'user' }]
                }
                : c
        ));

        const actionMap: Record<ConsentStatus, ConsentLog['action']> = {
            'granted': 'grant',
            'denied': 'deny',
            'withdrawn': 'withdraw'
        };

        addLog(actionMap[status], purposeId, { artifactId: artifact?.consentId });
        addNotification(user.id, 'Consent Updated', `You have successfully ${status} consent for ${DEFAULT_PURPOSES.find(p => p.id === purposeId)?.name}`);
    };

    const submitGrievance = (subject: string, description: string) => {
        if (!user) return;
        const newGrievance: Grievance = {
            id: 'grv_' + Math.random().toString(36).substr(2, 9),
            userId: user.id,
            subject,
            description,
            status: 'open',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setGrievances(prev => [newGrievance, ...prev]);
        addNotification(user.id, 'Grievance Submitted', `Ticket #${newGrievance.id} has been created.`);
    };

    const updateGrievanceStatus = (id: string, status: Grievance['status'], resolution?: string) => {
        setGrievances(prev => prev.map(g =>
            g.id === id ? { ...g, status, resolution, updatedAt: new Date().toISOString() } : g
        ));
        // Find owner to notify
        const g = grievances.find(g => g.id === id);
        if (g) {
            addNotification(g.userId, 'Grievance Updated', `Your ticket #${id} is now ${status.replace('_', ' ')}.`);
        }
    };

    const markNotificationRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const submitDemoRequest = (data: Omit<DemoRequest, 'id' | 'status' | 'createdAt'>) => {
        const newRequest: DemoRequest = {
            id: 'demo_' + Math.random().toString(36).substr(2, 9),
            ...data,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        setDemoRequests(prev => [newRequest, ...prev]);
        // Notify admins? For mock, no specific admin notif yet.
    };

    const replyToDemoRequest = (id: string, replyMessage: string) => {
        // User requested: "if admin replied for that then it should delete automatically form the admin token list"
        // So we filter it out directly.
        console.log(`Sending reply to request ${id}: ${replyMessage}`);
        setDemoRequests(prev => prev.filter(r => r.id !== id));
    };

    const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
        if (!user) throw new Error("No user logged in");

        // 1. Verify old password
        const oldHash = hashPassword(oldPassword);
        if (user.passwordHash && user.passwordHash !== oldHash) {
            throw new Error("Current password is incorrect");
        }

        // 2. Hash new password
        const newHash = hashPassword(newPassword);

        // 3. Update User object
        const updatedUser = { ...user, passwordHash: newHash };

        // 4. Update State and Storage
        setUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

        // Force logout is handled by the component, or we can do it here?
        // Requirement says: "Log out the admin". 
        // We can just return true here and let component call logout() for better UX control (e.g. showing success message first)

        return true;
    };

    const resetPassword = async (contact: string, otp: string, newPassword: string): Promise<boolean> => {
        // 1. Verify OTP
        const isValidOtp = await verifyOtp(contact, otp);
        if (!isValidOtp) throw new Error("Invalid OTP or Security Code");

        // 2. Find User
        const foundUser = users.find(u => u.email === contact || u.mobile === contact);
        if (!foundUser) throw new Error("User not found");

        // 3. Hash new password
        const newHash = hashPassword(newPassword);

        // 4. Update User
        const updatedUser = { ...foundUser, passwordHash: newHash };

        // 5. Update State (Global Users list)
        // Note: We don't necessarily log them in, just update the DB
        setUsers(prev => prev.map(u => u.id === foundUser.id ? updatedUser : u));

        // If the user being updated is the currently logged in user (rare in forgot pw flow but possible), update session
        if (user && user.id === foundUser.id) {
            setUser(updatedUser);
        }

        return true;
    };

    return (
        <MockBackendContext.Provider value={{
            user,
            login,
            loginWithCredentials,
            register,
            loginWithOtp,
            verifyOtp,
            linkIdentity,
            loginWithOAuth,
            loginWithWallet,
            logout,
            changePassword, // Exposed
            resetPassword,
            consents,
            logs,
            grievances,
            notifications,
            updateConsent,
            submitGrievance,
            updateGrievanceStatus,
            markNotificationRead,
            purposes: DEFAULT_PURPOSES,
            demoRequests,
            submitDemoRequest,
            replyToDemoRequest
        }}>
            {children}
        </MockBackendContext.Provider>
    );
};
