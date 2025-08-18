import {useTranslations} from 'next-intl';

export const loginFormValidation = data => {
	const {email, password} = data;
	const errors = {};

	if (!email) {
		errors.email = 'Email is required.';
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		errors.email = 'Invalid email format.';
	}

	if (!password) {
		errors.password = 'Password is required.';
	} else if (password.length < 6) {
		errors.password = 'Password must be min 6 character.';
	}

	return errors;
};

export const lawyerFormValidation = data => {
	const {license_number, designation, law_firm_name, jurisdiction_id, phone_number, location, gender, service_id} =
		data;
	const errors = {};

	// License number should not be empty and should only contain numbers
	if (!license_number) {
		errors.license_number = 'License number is required';
	} else if (!/^\d+$/.test(license_number)) {
		errors.license_number = 'License number should only contain numbers';
	}

	// Designation should not be empty
	if (!designation) {
		errors.designation = 'Designation is required';
	}

	// Law firm name should not be empty
	if (!law_firm_name) {
		errors.law_firm_name = 'Law firm name is required';
	}

	// Jurisdiction ID should be a number
	if (isNaN(Number(jurisdiction_id))) {
		errors.jurisdiction_id = 'Invalid jurisdiction ID';
	}

	// Phone number should not be empty and should only contain numbers
	if (!phone_number) {
		errors.phone_number = 'Phone number is required';
	} else if (!/^\d+$/.test(phone_number)) {
		errors.phone_number = 'Phone number should only contain numbers';
	}

	// Location should not be empty
	if (!location) {
		errors.location = 'Location is required';
	}

	// Gender should not be empty
	if (!gender) {
		errors.gender = 'Gender is required';
	}

	// Service ID should be a number
	if (isNaN(Number(service_id))) {
		errors.service_id = 'Invalid service ID';
	}

	return errors;
};

export const isEmail = email => {
	const errors = {};
	if (!/\S+@\S+\.\S+/.test(email)) {
		errors.email = 'Invalid email.';
	}
	return errors;
};

// export const isText = (text){

// }

export const isNumber = input => {
	const errors = {};
	if (/^\d+$/.test(input)) {
		errors.email = 'Invalid number.';
	}
	return errors;
};

export const signUpValidation = data => {
	const errors = {};
	const {firstName, lastName, email, password} = data;

	if (!firstName) {
		errors.firstName = 'First name is required';
	} else if (/[^a-zA-Z]/.test(data.firstName)) {
		errors.firstName = 'First name should only contain letters';
	}

	if (!lastName) {
		errors.lastName = 'Last name is required';
	} else if (/[^a-zA-Z]/.test(data.lastName)) {
		errors.lastName = 'Last name should only contain letters';
	}

	if (!email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = 'Invalid email format';
	}

	if (!password) {
		errors.password = 'Password is required';
	} else if (data.password.length < 6) {
		errors.password = 'Password must be at least 6 characters long';
	}

	return errors;
};

export const inquieryWithoutLoginValidation = data => {
	const errors = {};
	const {firstName, lastName, email, contactNumber, message} = data;

	if (!firstName) {
		errors.firstName = 'First name is required';
	} else if (!/^[a-zA-Z\s]*$/.test(data.firstName.trim())) {
		errors.firstName = 'First name should only contain letters';
	}

	if (!lastName) {
		errors.lastName = 'Last name is required';
	} else if (!/^[a-zA-Z\s]*$/.test(data.lastName.trim())) {
		errors.lastName = 'Last name should only contain letters';
	}

	if (!email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = 'Invalid email format';
	}

	if (!contactNumber) {
		errors.contactNumber = 'Contact number is required';
	} else if (!/^\d+$/.test(data.contactNumber.trim())) {
		errors.contactNumber = 'Only numbers are allowed';
	}

	if (!message) {
		errors.message = 'Message is required';
	}
	// else if (!/^[a-zA-Z\s]*$/.test(message)) {
	// 	errors.message = 'Message should only contain letters and spaces';
	// }

	return errors;
};

export const inquieryWithLoginValidation = message => {
	const errors = {};

	if (!message) {
		errors.message = 'Message is required';
	} else if (/[^a-zA-Z\s]/.test(message)) {
		errors.message = 'Message should only contain letters and spaces';
	}

	return errors;
};

export const WriteAReviewValidation = data => {
	const errors = {};
	const {name, title, email, stars, description} = data;

	if (/[^a-zA-Z\s]/.test(name)) {
		errors.name = 'Name should only contain letters and spaces';
	}

	if (!title) {
		errors.title = 'title is required';
	} else if (/[^a-zA-Z\s]/.test(title)) {
		errors.title = 'Title should only contain letters and spaces';
	}

	if (email && !/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = 'Invalid email format';
	}

	if (stars == 0) {
		errors.stars = 'Rating is required';
	}

	if (!description) {
		errors.review = 'Review is required';
	} else if (/[^a-zA-Z]/.test(data.review)) {
		errors.review = 'Review should only contain letters';
	}

	return errors;
};

export const ContactUsValidation = data => {
	const t = useTranslations('Index');

	const errors = {};
	const {name, email, message} = data;

	if (!name) {
		errors.name = 'Name is required';
	} else if (/[^a-zA-Z\s]/.test(name)) {
		errors.name = 'Name should only contain letters and spaces';
	}

	if (!email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = 'Invalid email format';
	}

	if (!message) {
		errors.message = 'Message is required';
	} else if (/[^a-zA-Z]/.test(data.review)) {
		errors.message = 'Message should only contain letters';
	}

	return errors;
};

export const supportValidation = data => {
	const errors = {};
	const {name, email, message} = data;

	if (!name) {
		errors.name = 'Name is required';
	} else if (/[^a-zA-Z\s]/.test(name)) {
		errors.name = 'Name should only contain letters and spaces';
	}

	if (!email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = 'Invalid email format';
	}

	if (!message) {
		errors.message = 'Message is required';
	} else if (/[^a-zA-Z]/.test(data.review)) {
		errors.message = 'Message should only contain letters';
	}

	return errors;
};
