// Dummy security utilities to satisfy imports for landing-static

export class SessionManager {
    startMonitoring(callback: () => void) { }
    stopMonitoring() { }
}

export const auditLog = {
    log: (event: string, data?: any) => { }
};

export const rateLimiter = {
    check: (key: string) => true,
    reset: (key: string) => { }
};
