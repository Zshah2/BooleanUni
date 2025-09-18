// Boolean University Login System
// Three user authentication with email as username

class BooleanLogin {
    constructor() {
        // User credentials database - using email as username
        this.users = {
            'john.smith@boolean.edu': {
                password: 'student123',
                role: 'Student',
                fullName: 'John Smith',
                email: 'john.smith@boolean.edu',
                attempts: 0,
                locked: false
            },
            'sarah.johnson@boolean.edu': {
                password: 'faculty123',
                role: 'Faculty',
                fullName: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@boolean.edu',
                attempts: 0,
                locked: false
            },
            'michael.brown@boolean.edu': {
                password: 'admin123',
                role: 'Administrator',
                fullName: 'Michael Brown',
                email: 'michael.brown@boolean.edu',
                attempts: 0,
                locked: false
            }
        };

        this.maxAttempts = 3;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Password visibility toggle
        const togglePassword = document.getElementById('togglePassword');
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                this.togglePasswordVisibility();
            });
        }

        // Remember me functionality
        const rememberMe = document.getElementById('rememberMe');
        if (rememberMe) {
            rememberMe.addEventListener('change', (e) => {
                this.handleRememberMe(e.target.checked);
            });
        }

        // Load saved credentials on page load
        this.loadSavedCredentials();
    }

    handleLogin() {
        const username = document.getElementById('username').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('error');
        const successDiv = document.getElementById('success');
        const submitBtn = document.querySelector('.signin-btn');

        // Clear previous messages
        this.hideMessage(errorDiv);
        this.hideMessage(successDiv);

        // Validate input
        if (!username || !password) {
            this.showMessage(errorDiv, 'Please enter both email and password.', 'error');
            return;
        }

        // Validate email format
        if (!this.isValidEmail(username)) {
            this.showMessage(errorDiv, 'Please enter a valid email address.', 'error');
            return;
        }

        // Add loading state
        this.setLoadingState(submitBtn, true);

        // Simulate network delay for realistic feel
        setTimeout(() => {
            this.authenticateUser(username, password, errorDiv, successDiv, submitBtn);
        }, 1000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    authenticateUser(username, password, errorDiv, successDiv, submitBtn) {
        const user = this.users[username];

        // Check if user exists
        if (!user) {
            this.setLoadingState(submitBtn, false);
            this.showMessage(errorDiv, 'Invalid email or password.', 'error');
            this.logAttempt(username, false, 'User not found');
            return;
        }

        // Check if account is locked
        if (user.locked) {
            this.setLoadingState(submitBtn, false);
            this.showMessage(errorDiv, 'Account locked due to multiple failed attempts. Please contact IT support.', 'error');
            this.logAttempt(username, false, 'Account locked');
            return;
        }

        // Verify password
        if (user.password === password) {
            // Successful login
            user.attempts = 0; // Reset attempts
            this.setLoadingState(submitBtn, false);
            this.showMessage(successDiv, `Welcome back, ${user.fullName}! Redirecting to dashboard...`, 'success');
            this.logAttempt(username, true, 'Successful login');
            
            // Store session info
            this.storeSession(username, user);
            
            // Redirect after delay
            setTimeout(() => {
                this.redirectToDashboard(user.role);
            }, 2000);

        } else {
            // Failed login
            user.attempts++;
            const remainingAttempts = this.maxAttempts - user.attempts;
            
            this.setLoadingState(submitBtn, false);
            
            if (user.attempts >= this.maxAttempts) {
                user.locked = true;
                this.showMessage(errorDiv, `Maximum login attempts exceeded. Account has been locked. Contact IT support.`, 'error');
                this.logAttempt(username, false, 'Account locked after max attempts');
            } else {
                this.showMessage(errorDiv, `Invalid email or password. ${remainingAttempts} attempt(s) remaining.`, 'error');
                this.logAttempt(username, false, `Failed attempt ${user.attempts}/${this.maxAttempts}`);
            }
        }
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.querySelector('.toggle-password i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }

    handleRememberMe(isChecked) {
        if (isChecked) {
            const username = document.getElementById('username').value;
            if (username) {
                localStorage.setItem('rememberedEmail', username);
            }
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    }

    loadSavedCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('username').value = rememberedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }

    storeSession(username, user) {
        const sessionData = {
            email: username,
            role: user.role,
            fullName: user.fullName,
            loginTime: new Date().toISOString()
        };
        
        sessionStorage.setItem('userSession', JSON.stringify(sessionData));
    }

redirectToDashboard(role) {
    switch (role) {
        case 'Student':
            window.location.href = 'student.html';  // Uncomment and change this
            break;
        case 'Faculty':
            window.location.href = 'faculty.html';  // Uncomment and change this
            break;
        case 'Administrator':
            window.location.href = 'admin.html';    // Uncomment and change this
            break;
    }
}

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showMessage(element, message, type) {
        element.textContent = message;
        element.style.display = 'block';
        element.className = `${type}-message`;
        
        // Add animation
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.3s ease';
        }, 100);
    }

    hideMessage(element) {
        element.style.display = 'none';
        element.textContent = '';
    }

    logAttempt(username, success, details) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            email: username,
            success,
            details,
            ip: 'localhost' // In production, you'd get real IP
        };
        
        console.log('Login Attempt:', logEntry);
        
        // In production, send to server
        // fetch('/api/log-login', { method: 'POST', body: JSON.stringify(logEntry) });
    }

    // Utility method for development/testing
    resetAllAttempts() {
        Object.keys(this.users).forEach(key => {
            this.users[key].attempts = 0;
            this.users[key].locked = false;
        });
        console.log('All user attempts reset');
    }

    // Get user status for debugging
    getUserStatus() {
        console.table(Object.keys(this.users).map(key => ({
            email: key,
            role: this.users[key].role,
            attempts: this.users[key].attempts,
            locked: this.users[key].locked
        })));
    }
}

// Initialize login system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.loginSystem = new BooleanLogin();
    
    // Development helpers (remove in production)
    console.log('🔐 Boolean University Login System Initialized');
    console.log('📧 Email-based Authentication:');
    console.log('   Student: john.smith@boolean.edu / student123');
    console.log('   Faculty: sarah.johnson@boolean.edu / faculty123');
    console.log('   Admin: michael.brown@boolean.edu / admin123');
    console.log('🛠️  Dev Commands:');
    console.log('   loginSystem.getUserStatus() - View user status');
    console.log('   loginSystem.resetAllAttempts() - Reset all attempts');
});