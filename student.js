// Student Dashboard JavaScript

class StudentDashboard {
    constructor() {
        this.initializeUserInfo();
        this.initializeEventListeners();
        this.loadDashboardData();
    }

    initializeUserInfo() {
        // Get user session data
        const sessionData = sessionStorage.getItem('userSession');
        if (sessionData) {
            const userData = JSON.parse(sessionData);
            document.getElementById('studentName').textContent = userData.fullName || 'Student';
            document.getElementById('studentId').textContent = this.extractStudentId(userData.email) || 'STU001';
        } else {
            // Redirect to login if no session
            window.location.href = 'login.html';
        }
    }

    extractStudentId(email) {
        // Extract student ID from email (simple logic)
        if (email && email.includes('john.smith')) return 'STU001';
        if (email && email.includes('jane.doe')) return 'STU002';
        return 'STU001';
    }

    initializeEventListeners() {
        // Quick action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const actionText = btn.querySelector('span').textContent;
                this.handleQuickAction(actionText);
            });
        });

        // View all buttons
        const viewAllButtons = document.querySelectorAll('.view-all-btn');
        viewAllButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const buttonText = btn.textContent;
                this.handleViewAll(buttonText);
            });
        });

        // Message items click
        const messageItems = document.querySelectorAll('.message-item');
        messageItems.forEach(item => {
            item.addEventListener('click', () => {
                const senderName = item.querySelector('.sender-info h4').textContent;
                this.openMessage(senderName);
            });
        });
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        console.log('Loading dashboard data...');
        
        // Update last login time
        const loginTime = new Date().toLocaleString();
        console.log(`Dashboard loaded at: ${loginTime}`);
        
        // Mark unread messages
        this.updateUnreadIndicators();
    }

    updateUnreadIndicators() {
        const unreadMessages = document.querySelectorAll('.message-item.unread');
        console.log(`${unreadMessages.length} unread messages`);
    }

    handleQuickAction(actionText) {
        switch(actionText) {
            case 'Register for Courses':
                this.goToCatalog();
                break;
            case 'Download Transcript':
                alert('Generating Transcript...\n\nYour official transcript will be downloaded shortly.');
                break;
            case 'Pay Tuition':
                alert('Redirecting to Payment Portal...\n\nThis would open the tuition payment system.');
                break;
            case 'Contact Support':
                alert('Opening Support Center...\n\nThis would open a help desk ticket system.');
                break;
            default:
                console.log(`Quick action: ${actionText}`);
        }
    }

    handleViewAll(buttonText) {
        switch(buttonText) {
            case 'Browse Catalog':
                this.goToCatalog();
                break;
            case 'View All':
                alert('Opening full course list...\n\nThis would show all enrolled courses.');
                break;
            case 'Inbox':
                alert('Opening message inbox...\n\nThis would show all messages and notifications.');
                break;
            default:
                console.log(`View all: ${buttonText}`);
        }
    }

    goToCatalog() {
        // Check if course catalog page exists, otherwise show alert
        alert('Redirecting to Course Catalog...\n\n' +
              'This would open the course registration system where you can:\n' +
              '• Browse available courses\n' +
              '• Add courses to your schedule\n' +
              '• Drop courses if needed\n' +
              '• View prerequisites and schedules\n\n' +
              'File: course-catalog.html');
        
        // Uncomment this line when you create the course catalog page:
        // window.location.href = 'course-catalog.html';
    }

    openMessage(senderName) {
        alert(`Message from: ${senderName}\n\n` +
              `This would open the full message thread.\n\n` +
              `Features would include:\n` +
              `• Full conversation history\n` +
              `• Reply functionality\n` +
              `• File attachments\n` +
              `• Message status tracking`);
    }
}

// Logout function (global)
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('userSession');
        localStorage.removeItem('rememberedEmail');
        window.location.href = 'login.html';
    }
}

// Global function to go to catalog (for button onclick)
function goToCatalog() {
    if (window.dashboard) {
        window.dashboard.goToCatalog();
    } else {
        alert('Redirecting to Course Catalog...');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new StudentDashboard();
    
    console.log('📚 Student Dashboard Initialized');
    console.log('🎯 Ready for course registration testing');
});