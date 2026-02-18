export function formatDateTime(dateTimeString) {
	const dateTime = new Date(dateTimeString);

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const day = dateTime.getDate();
	const month = months[dateTime.getMonth()];
	const hours = dateTime.getHours();
	const minutes = dateTime.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = (hours % 12).toString().padStart(2, '0');

	return `${month} ${day} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

export function capitalizeFirstLetterOfEachWord(str) {
	return str.replace(/\b\w/g, match => match.toUpperCase());
}

export function formatDateToDDMMYYYY(dateStr) {
	const date = new Date(dateStr);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}

export function formatTime(timeString) {
	const date = new Date(timeString);
	const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
	return formattedTime;
}

export function formatDateToDDMMYYYYMM(dateStr) {
	const date = new Date(dateStr);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDateToDDMMYYYYMMAPPORVAL(dateStr) {
	const date = new Date(dateStr);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year

	return `${day}.${month}.${year}`;
}

export function getAdminImageSrc130x130(profile_image, gender) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
	if (profile_image) {
		return `${baseUrl}/images/profile/${profile_image}`;
	} else if (gender === 'male' || gender === 'other') {
		return `${baseUrl}/images/default/male-lawyer-130x130.png`;
	} else {
		return `${baseUrl}/images/default/female-lawyer-130x130.png`;
	}
}

export function formatDate(dateString) {
	const options = {year: 'numeric', month: 'long', day: 'numeric'};
	const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
	const parts = formattedDate.split(' ');
	const month = parts[0];
	const day = parts[1];
	const year = parts[2];
	return `${day} ${month}, ${year}`;
}

export function getLawyerImageSrc70x70(profile_image, gender) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
	if (profile_image) {
		return `${baseUrl}/images/profile/${profile_image}`;
	} else if (gender === 'male' || gender === 'other') {
		return `${baseUrl}/images/default/group-242.png`;
	} else {
		return `${baseUrl}/images/default/group-242.png`;
	}
}

export function formatDateTimeForChat(dateTimeString) {
	const dateTime = new Date(dateTimeString);
	const now = new Date();

	const timeDifference = now - dateTime;

	if (timeDifference < 3600000) {
		return 'Sent now';
	} else {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		const day = dateTime.getDate();
		const month = months[dateTime.getMonth()];
		const hours = dateTime.getHours();
		const minutes = dateTime.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = (hours % 12).toString().padStart(2, '0');

		return `${month} ${day} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
	}
}

export function getAdminLegalServiceImageSrc(image) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
	if (image) {
		return `${baseUrl}/images/Services/${image}`;
	} else {
		return `${baseUrl}/images/default/company-avatar.png`;
	}
}

export function formatInquiryDate(dateStr) {
	const date = new Date(dateStr);

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12; // Convert to 12-hour format

	return `${month} ${day}, ${year}, ${formattedHours}:${minutes} ${ampm}`;
}

export function formatAdminReviewDate(dateString) {
	const options = {year: 'numeric', month: 'long', day: 'numeric'};
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, options);
}

export function formatDateMonthDayYear(dateTimeString) {
	const dateTime = new Date(dateTimeString);

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const day = dateTime.getDate();
	const month = months[dateTime.getMonth()];
	const year = dateTime.getFullYear();

	return `${month} ${day}, ${year}`;
}

export function capitalizeFirstWord(inputString) {
	let words = inputString.split(' ');

	if (words.length > 0) {
		let firstWord = words[0];
		let capitalizedFirstCharacter = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
		return capitalizedFirstCharacter;
	} else {
		return '';
	}
}

export function formatDateLegalDate(dateStr) {
	const date = new Date(dateStr);

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const amOrPm = hours >= 12 ? 'PM' : 'AM';

	// Convert hours to 12-hour format and handle midnight (12:00 AM) and noon (12:00 PM)
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

	const formattedMinutes = minutes.toString().padStart(2, '0');

	return `${month} ${day}, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
}

export function getAdminImageSrc306x200(profile_image, gender) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

	if (profile_image) {
		return `${baseUrl}/images/profile/${profile_image}`;
	} else if (gender === 'male' || gender === 'other') {
		return `${baseUrl}/images/default/female-lawyer-306x200.png`;
	} else {
		return `${baseUrl}/images/default/female-lawyer-306x200.png`;
	}
}

export function getAdminImageSrc180x180(profile_image, gender) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
	const frontendurl = process.env.NEXT_PUBLIC_BASE_URL;
	if (profile_image) {
		return `${baseUrl}/images/profile/${profile_image}`;
	} else if (gender === 'male' || gender === 'other') {
		return `${baseUrl}/images/profile/${profile_image}`;
	}
	return `${frontendurl}/images/female-lawyer-180x180.png`;
}

export function getAdminImageSrc80x80(profile_image, gender) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

	if (profile_image) {
		return `${baseUrl}/images/profile/${profile_image}`;
	} else if (gender === 'male' || gender === 'other') {
		return `${baseUrl}/images/default/female-lawyer-80x80.png`;
	} else {
		return `${baseUrl}/images/default/female-lawyer-80x80.png`;
	}
}

export function getLawyerImageSrc180x180(profile_image, gender) {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
	if (profile_image) {
		return `${baseUrl}/images/profile/${profile_image}`;
	} else if (gender === 'male' || gender === 'other') {
		return `${baseUrl}/images/default/female-lawyer-180x180.png`;
	} else {
		return `${baseUrl}/images/default/female-lawyer-180x180.png`;
	}
}
