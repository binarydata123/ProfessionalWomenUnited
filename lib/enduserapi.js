import {getToken} from '../lib/session';
import axios from 'axios';

export const getAllPostsByCount = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-post-by-count', {
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

export const getRecentlyViewlawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-recently-lawyer', {
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

export const getUserInquries = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-user-inquires', {
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

export const deleteUserInquiry = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/delete-inquiry`, {
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

export const getLawyerDetailByInquiry = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-lawyer-detail-by-inquiry`, {
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

export const GetAllUserInquiriesMessages = async (user_id, inqId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-all-user-inquiries-messages`, {
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

export const reportInquiriesByuser = async (user_id, inqId, reportReason, otherReason) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/report-inquiries-by-user`, {
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

export const unReportInquiriesByUser = async (user_id, inqId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/unreport-inquiries-by-user`, {
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

export const SaveInquiriesByUser = async (user_id, inqId, InqStatus) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/save-inquiries-by-user`, {
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

export const sendUserInquiryResponse = async formData => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/send-user-inquiries-response`, {
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

export const markReadUserInquiry = async (user_id, inqId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/read-inquiry-by-user`, {
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

export const GetTotalUserUnreadInquiries = async userId => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-total-user-unread-inquiries`, {
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

export const getUserForumCount = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-user-forum-count', {
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

export const getUserRecentPost = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-user-recent-post', {
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

export const getUserTopContributors = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-user-top-contributors', {
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

export const getUserAllPost = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-user-all-post', {
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

export const getRecentUserlawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-recent-user-lawyer', {
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

export const lawyerSavedByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/save-laywer-save-by-user`, {
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

export const lawyerReportByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/save-laywer-report-by-user`, {
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

export const IsQuestionLiked = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/is-liked-question/', {
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

export const likeLegalQuestionsResponse = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/like-legal-question-post', {
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

export const removeLegalQuestionPost = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/remove-legal-question-post', {
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

export const lawyerUnReportByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/laywer-unreport', {
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

export const lawyerReportCheckByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/lawyer-report-check', {
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

export const getlawyerSavedByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/lawyer-saved-check', {
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

export const lawyerdeleteByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/laywer-delete-by-user`, {
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

export const getSavedlawyerByUser = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/get-lawyer-saved-byuser', {
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

export const getUserNotifications = async (user_id, count) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-user-notifications`, {
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

export const markUserReadNotifications = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/mark-user-read-notifications`, {
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

export const getUserUnreadNotificationCount = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-user-unread-notifications-count`, {
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

export const SaveUserProfile = async data => {
	let formdata = new FormData();
	formdata.append('profile_image', data.profile_image);

	// Append other form fields as needed
	formdata.append('user_id', data.user_id);
	formdata.append('first_name', data.first_name);
	formdata.append('last_name', data.last_name);
	formdata.append('email', data.email);
	formdata.append('phone_number', data.phone_number);
	formdata.append('gender', data.gender);
	formdata.append('location_id', data.location_id);

	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/enduser/save-user-details', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
				Authorization: 'Bearer ' + getToken()
			},
			data: formdata // Send the formdata object containing all fields
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getUserDetailData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-single-user`, {
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

export const changePassword = async (user_id, newPassword) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/user-change-password`, {
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
export const updateNotificationSettings = async (
	user_id,
	newslatter,
	announcement,
	messageFromClient,
	recommendation
) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/user-update-notification-settings`, {
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

export const getNotificationSettings = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-user-notification-settings`, {
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

export const CheckUserInquery = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/get-check-user-inquires`, {
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

export const insertProfileView = async (user_id, lawyer_id) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/insert-profile-view`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				user_id: user_id,
				lawyer_id: lawyer_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const deleteUserimage = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/enduser/delete-image`, {
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
