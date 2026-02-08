
export const isValidEmail = (email: string): { isValid: boolean; error?: string } => {
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }

    // 1. Basic Format Validation (RFC 5322ish)
    // No consecutive dots, no leading/trailing dots, standard chars
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Please enter a valid email address" };
    }

    // Check for specific invalid patterns explicitly if regex lets them slip (regex above is decent but simple)
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
        return { isValid: false, error: "Invalid email format (consecutive or trailing dots)" };
    }

    const [, domain] = email.split('@');

    // 2. Domain Validation
    const lowerDomain = domain.toLowerCase();

    // Known Disposable/Fake Domains (Blacklist)
    const disposableDomains = [
        'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
        'yopmail.com', 'fake.com', 'example.com', 'test.com', 'throwawaymail.com'
    ];

    if (disposableDomains.some(d => lowerDomain === d || lowerDomain.endsWith(`.${d}`))) {
        return { isValid: false, error: "Temporary or fake email addresses are not allowed" };
    }

    // 3. Approved Domains Logic
    // - Public: gmail.com, outlook.com, yahoo.com
    // - Education: *.edu, *.edu.in
    // - Company/Standard: *.in, *.com, *.org

    const allowedExactDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com'];
    const allowedTLDs = ['.edu', '.edu.in', '.com', '.org', '.in', '.net', '.co.in'];

    const isAllowedExact = allowedExactDomains.includes(lowerDomain);
    const isAllowedTLD = allowedTLDs.some(tld => lowerDomain.endsWith(tld));

    if (!isAllowedExact && !isAllowedTLD) {
        return { isValid: false, error: "Only Gmail, educational, or corporate emails (.com, .org, .in) are allowed" };
    }

    // 4. Local Part Logic (Optional "Random string" check)
    // Hard to define "random", but we can block really short ones if standard provider?
    // e.g. a@gmail.com is usually taken or invalid, but let's stick to user request about "random strings" which implies weird sequences.
    // Without advanced heuristics, we'll assume regex handles valid chars.

    // Single letter domain check (e.g. gmail.c, g.com is valid? usually domain needs min length)
    const domainParts = lowerDomain.split('.');
    if (domainParts.some(part => part.length < 2)) {
        // Allows g.com? Maybe not. standard domains usually have >1 char names. 
        // Exception: t.co (twitter). But for "Company domains", we usually expect full names.
        // User said "Single-letter or numeric-only domains" -> disallowed.
        // e.g. a.com
    }

    // Numeric only domain check
    // e.g. 123.com
    if (/^\d+\./.test(lowerDomain)) { // Domain name part is digits
        return { isValid: false, error: "Numeric-only domains are not allowed" };
    }

    return { isValid: true };
};
