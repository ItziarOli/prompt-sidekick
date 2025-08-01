// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            btn.classList.add('active');
            document.getElementById(`${targetTab}-form`).classList.add('active');
        });
    });

    // Sign up form handler
    document.getElementById('signup-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('🌊 Passwords don\'t match! Try again, surfer!');
            return;
        }

        try {
            const userId = generateUserId();
            const userData = {
                userId: userId,
                email: email,
                signupDate: new Date().toISOString(),
                membership: 'free'
            };

            const params = {
                TableName: TABLE_NAME,
                Item: userData
            };

            await dynamodb.put(params).promise();
            alert('🏄‍♂️ Welcome to the crew! You\'ve successfully signed up!');
            
            // Clear form
            document.getElementById('signup-form').reset();
            
        } catch (error) {
            console.error('Signup error:', error);
            alert('🌊 Oops! Something went wrong. Please try again later.');
        }
    });

    // Sign in form handler
    document.getElementById('signin-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        try {
            // In a real app, you'd validate credentials here
            // For demo purposes, we'll just check if user exists
            const params = {
                TableName: TABLE_NAME,
                FilterExpression: 'email = :email',
                ExpressionAttributeValues: {
                    ':email': email
                }
            };

            const result = await dynamodb.scan(params).promise();
            
            if (result.Items.length > 0) {
                alert('🏄‍♂️ Welcome back, surfer! You\'re signed in!');
                document.getElementById('signin-form').reset();
            } else {
                alert('🌊 User not found! Want to join the crew instead?');
            }
            
        } catch (error) {
            console.error('Signin error:', error);
            alert('🌊 Oops! Something went wrong. Please try again later.');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});