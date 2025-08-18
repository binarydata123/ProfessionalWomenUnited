export function getToken() {
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		// Check if the cookie starts with the desired name, for example, 'token='
		if (cookie.startsWith('session_token=')) {
			// Extract the session_token value from the cookie
			return cookie.substring('session_token='.length);
		}
	}

	// Return null if the token is not found in cookies
	return null;
}

