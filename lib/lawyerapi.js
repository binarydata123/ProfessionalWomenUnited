import {getToken} from './session';
import axios from 'axios';

export const updateLaywerData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/update-lawyer-profile', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const savePlanPayment = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/save-payment', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getRecentReviews = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-recent-reviews', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getProfileView = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-profile-count', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getInqueryView = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-inquires-count', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllReviews = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-all-review', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllReviewFrontend = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-review', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAvgRatingReview = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-averagerating-review', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getStarRatingReview = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-review-stars', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const saveReviewReply = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/insert-review-reply', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const GetAllInquiries = async (userId, Inqtype) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-all-inquiries`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				userId: userId,
				Inqtype: Inqtype
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const checkEmailVerfiyOTP = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/check-email-verify-otp', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const resendEmailVerifyOtp = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/resend-email-verify-otp', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getmessagesByInquiry = async (user_id, inqId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-all-inquiries-messages`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id,
				inquiry_id: inqId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const GetTotalUnreadInquiries = async userId => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-total-unread-inquiries`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				userId: userId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const SaveInquiriesByLawyer = async (user_id, inqId, InqStatus) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/save-inquiries-by-lawyer`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id,
				inqId: inqId,
				InqStatus: InqStatus
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const reportInquiriesByLawyer = async (user_id, inqId, reportReason, otherReason) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/report-inquiries-by-lawyer`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id,
				inqId: inqId,
				reportReason: reportReason,
				otherReason: otherReason
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const unReportInquiriesByLawyer = async (user_id, inqId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/unreport-inquiries-by-lawyer`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id,
				inqId: inqId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const deleteInquiry = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/delete-inquiry`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getUserDetailByInquiry = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-user-detail-by-inquiry`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const markReadInquiry = async (user_id, inqId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/read-inquiry-by-lawyer`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id,
				inquiry_id: inqId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const saveReviewReport = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/save-report-check', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getFlagReport = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-report-flag', {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const flagUnreport = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/flag-unreport', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const sendInquiryResponse = async formData => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/send-inquiries-response`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken(),
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getProfileOverview = async (user_id, timestamp) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-profile-overview`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id,
				timestamp: timestamp
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getProfileDetails = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-profile-details`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const changePassword = async (user_id, newPassword) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/change-password`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id,
				newPassword: newPassword
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getTopContributors = async (user_id, contributorCount) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-top-contributors`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id,
				contributorCount: contributorCount
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getRecentPosts = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-recent-posts`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllContributions = async (user_id, sortby) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-all-contributions`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id,
				sortby: sortby
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const countQuestionAnswersCount = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-question-answers-count`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getNotificationSettings = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-notification-settings`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateNotificationSettings = async (
	user_id,
	newslatter,
	announcement,
	messageFromClient,
	recommendation
) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/update-notification-settings`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id,
				newslatter: newslatter,
				announcement: announcement,
				messageFromClient: messageFromClient,
				recommendation: recommendation
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getNotifications = async (user_id, count) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-notifications`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id,
				count: count
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const markReadNotifications = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/mark-read-notifications`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getUnreadNotificationCount = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-unread-notifications-count`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const editLawyerProfile = async data => {
	let formdata = new FormData();
	for (const key in data) {
		if (Array.isArray(data[key])) {
			data[key].forEach(value => {
				formdata.append(`${key}[]`, value);
			});
		} else {
			formdata.append(key, data[key]);
		}
	}

	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/edit-lawyer-profile', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
				Authorization: 'Bearer ' + getToken()
			},
			data: formdata
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllSpecialization = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/get-all-specialization`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const removeProfilePicture = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/lawyer/remove-profile-picture`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const createOrUpdateFirmByLawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/create-or-update-firm-by-lawyer', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllFirms = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-firms', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getFirmToLawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/lawyer/get-firm-to-lawyer', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};
