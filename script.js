// Grabbing DOM elements
const form = document.getElementById('form');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    validateInputs(); // Call validation function

    // Check if there are no errors before submission
    const errorElements = document.querySelectorAll('.error');
    if (errorElements.length === 0) {
        alert('Form submitted successfully!');
        form.submit(); // Submit the form if all validations pass
    }
});

// Display error message
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message; // Set error message
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

// Display success message
const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = ''; // Clear error message
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// Validate email format
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    return re.test(String(email).toLowerCase());
};

// Validate phone number (must be 10 digits and not '1234567890')
const isValidPhone = (phone) => {
    const re = /^[0-9]{10}$/; // Regex for 10-digit phone number
    return re.test(phone) && phone !== '1234567890';
};

// Validate inputs
const validateInputs = () => {
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Full Name validation
    if (fullNameValue === '' || fullNameValue.length < 5) {
        setError(fullName, 'Name must be at least 5 characters long');
    } else {
        setSuccess(fullName);
    }

    // Email validation
    if (emailValue === '' || !isValidEmail(emailValue)) {
        setError(email, 'Enter a valid email address');
    } else {
        setSuccess(email);
    }

    // Phone number validation
    if (!isValidPhone(phoneValue)) {
        setError(phone, 'Phone number must be 10 digits and not 1234567890');
    } else {
        setSuccess(phone);
    }

    // Username validation
    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    // Password validation
    if (
        passwordValue === '' ||
        passwordValue.toLowerCase() === 'password' ||
        passwordValue === usernameValue ||
        passwordValue.length < 8
    ) {
        setError(
            password,
            'Password cannot be "password", username, or less than 8 characters'
        );
    } else {
        setSuccess(password);
    }

    // Confirm password validation
    if (confirmPasswordValue === '' || confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Passwords do not match');
    } else {
        setSuccess(confirmPassword);
    }
};

// Add real-time validation on input change
[fullName, email, phone, username, password, confirmPassword].forEach((input) => {
    input.addEventListener('input', () => {
        switch (input) {
            case fullName:
                fullName.value.trim().length >= 5
                    ? setSuccess(fullName)
                    : setError(fullName, 'Name must be at least 5 characters long');
                break;
            case email:
                isValidEmail(email.value.trim())
                    ? setSuccess(email)
                    : setError(email, 'Enter a valid email address');
                break;
            case phone:
                isValidPhone(phone.value.trim())
                    ? setSuccess(phone)
                    : setError(phone, 'Phone number must be 10 digits and not 1234567890');
                break;
            case password:
                password.value.length >= 8 &&
                password.value.toLowerCase() !== 'password' &&
                password.value !== username.value.trim()
                    ? setSuccess(password)
                    : setError(
                          password,
                          'Password must be strong and not match username or "password"'
                      );
                break;
            case confirmPassword:
                confirmPassword.value === password.value
                    ? setSuccess(confirmPassword)
                    : setError(confirmPassword, 'Passwords do not match');
                break;
            default:
                break;
        }
    });
});
