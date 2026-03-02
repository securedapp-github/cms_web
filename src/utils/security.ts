// Session Manager for handling user sessions
export class SessionManager {
  private inactivityTimeout: NodeJS.Timeout | null = null;
  private readonly INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

  startMonitoring(onTimeout: () => void): void {
    // Clear existing timeout
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    // Set new timeout
    this.inactivityTimeout = setTimeout(onTimeout, this.INACTIVITY_TIME);

    // Reset timer on user activity
    const resetTimer = () => {
      this.startMonitoring(onTimeout);
    };

    // Listen for user activity
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('click', resetTimer);
  }

  stopMonitoring(): void {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = null;
    }

    // Remove event listeners
    document.removeEventListener('mousemove', () => {});
    document.removeEventListener('keydown', () => {});
    document.removeEventListener('click', () => {});
  }
}

// Audit logger for logging security events
export class AuditLog {
  private logs: Array<{
    timestamp: string;
    event: string;
    data: any;
  }> = [];

  log(event: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      event,
      data: data || {},
    };

    this.logs.push(logEntry);

    // Store in localStorage for persistence
    try {
      const storedLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      storedLogs.push(logEntry);
      // Keep only last 100 logs
      if (storedLogs.length > 100) {
        storedLogs.shift();
      }
      localStorage.setItem('audit_logs', JSON.stringify(storedLogs));
    } catch (error) {
      console.error('Failed to store audit log:', error);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AUDIT] ${event}:`, data);
    }
  }

  getLogs(): Array<{ timestamp: string; event: string; data: any }> {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('audit_logs');
  }
}

// Rate limiter for preventing brute force attacks
export class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly WINDOW_TIME = 15 * 60 * 1000; // 15 minutes

  check(key: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt) {
      // First attempt for this key
      this.attempts.set(key, { count: 1, timestamp: now });
      return true;
    }

    // Check if window has expired
    if (now - attempt.timestamp > this.WINDOW_TIME) {
      // Reset attempts
      this.attempts.set(key, { count: 1, timestamp: now });
      return true;
    }

    // Increment attempts and check limit
    attempt.count++;
    if (attempt.count > this.MAX_ATTEMPTS) {
      return false;
    }

    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }

  clear(): void {
    this.attempts.clear();
  }
}

// Export singleton instances
export const sessionManager = new SessionManager();
export const auditLog = new AuditLog();
export const rateLimiter = new RateLimiter();
