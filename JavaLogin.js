// Dummy data for existing users (in a real application, this data will come from a server or database)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Counter to track wrong login attempts
let loginAttempts = 0;

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginBtn').classList.add('active');
    document.getElementById('signupBtn').classList.remove('active');
}

function showSignup() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupBtn').classList.add('active');
    document.getElementById('loginBtn').classList.remove('active');
}

// Signup validation
function validateSignup(event) {
    event.preventDefault();
    
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;

    // Check if the email is already registered
    const existingUser = users.find(user => user.email === signupEmail);
    if (existingUser) {
        alert('Email is already registered. Please log in.');
        showLogin();
        return;
    }

    // Register the new user
    users.push({ email: signupEmail, password: signupPassword });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful!');
    showLogin();
}

// Login validation
function validateLogin(event) {
    event.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Find user by email
    const existingUser = users.find(user => user.email === loginEmail);

    if (!existingUser) {
        alert('No user found. Please sign up.');
        showSignup();
        return;
    }

    // Check if the password matches
    if (existingUser.password === loginPassword) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to the home page
    } else {
        loginAttempts++;
        document.getElementById('loginError').textContent = 'Wrong password.';
        
        if (loginAttempts >= 3) {
            document.getElementById('resetPasswordLink').style.display = 'block';
        }
    }
}

// Reset login attempts if user reloads the page
window.onload = function () {
    loginAttempts = 0;
};