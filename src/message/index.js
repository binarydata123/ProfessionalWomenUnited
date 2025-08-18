const messages = {
	register: {
		success: 'You have successfully registered! Please log in.',
		failure: 'Registration failed. Please try again.',
		emptyFields: 'Please fill in all the required fields.',
		passwordsMismatch: 'Passwords do not match. Please re-enter them.',
		invalidEmail: 'Invalid email format. Please use a valid email address.',
		weakPassword:
			'Password should be at least 8 characters long and contain a mix of letters, numbers, and symbols.'
	},
	login: {
		success: 'You have successfully logged in!',
		failure: 'Login failed. Please check your credentials and try again.',
		emptyFields: 'Please enter your email and password.',
		invalidEmail: 'Invalid email format. Please use a valid email address.',
		forgotPasswordLink: 'Forgot your password? Click here to reset it.'
	},
	forgotPassword: {
		emailSent: 'Password reset email has been sent to your registered email address. Please check your inbox.',
		emailError: 'An error occurred while sending the password reset email. Please try again later.',
		invalidEmail: 'Invalid email format. Please use a valid email address.',
		emailNotFound: 'Email address not found. Please enter a valid registered email.',
		passwordResetSuccess: 'Your password has been reset successfully. You can now log in with your new password.'
	}
};

export default messages;
