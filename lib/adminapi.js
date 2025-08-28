import {getToken} from '../lib/session';
import axios from 'axios';

export const getAllDasboardBoxCount = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-dashboard-box-count', {
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

export const getAllRecentInquiries = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-recent-inquires', {
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

export const getAllLawyersFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-lawyers-filtered-for-admin', {
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

export const getDbStructure = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-dbStrucure', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getLawyerPaymentInfo = async (userId, lawyerid) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-lawyer-payment-info`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId,
				lawyer_id: lawyerid
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateLawyerPlan = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-lawyer-plan', {
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

export const getLawyerReportAccountInfo = async (userId, lawyerid) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-lawyer-report-account-info`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId,
				lawyer_id: lawyerid
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const CreateOrUpdateLawyerReportAccount = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-update-lawyer-report-account', {
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

export const createLawyerInquiresByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-lawyer-inquired-by-admin', {
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

export const getAllLawyersFilteredForAdminApproval = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-lawyers-filtered-for-admin-approval',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateLawerStatus = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-lawyer-status', {
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

export const getAllEndUser = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-enduser/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllReportLawyersFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-report-lawyers-filtered-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateLawerReportStatus = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-lawyer-report-status', {
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

export const getSingleLawyerMemberReportDetails = async (report_by_member_id, report_to_member_id, user_id) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-lawyer-member-report`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				report_by_member_id: report_by_member_id,
				report_to_member_id: report_to_member_id,
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAdminNotifications = async (user_id, count) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-admin-notifications`, {
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

export const markAdminReadNotifications = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/mark-admin-read-notifications`, {
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

export const getAdminUnreadNotificationCount = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-admin-unread-notifications-count`, {
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

export const getAllUserFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-users-filtered-for-admin', {
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

export const deleteMembersWithCheck = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/delete-Members-With-Check`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: data
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getSingleUserDetailByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-user-detail-by-admin`, {
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

export const getAllJurisdictionFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-jurisdiction-filtered-for-admin', {
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

export const deleteJurisdictionsByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-jurisdictions-by-admin', {
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

export const CreateorUpdateJurisdictionsByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-jurisdictions-by-admin', {
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

export const getAllSpecializationFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-specialization-filtered-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const deleteSpecializationByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-specialization-by-admin', {
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

export const CreateorUpdateSpecializationByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-specialization-by-admin', {
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

export const getAllSpecialization = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-all-specialization`, {
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

export const getAllServicesFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-services-filtered-for-admin', {
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

export const deleteServicesByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-services-by-admin', {
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

export const CreateorUpdateServicesByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-services-by-admin', {
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

export const getAlTagsFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-tags-filtered-for-admin', {
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

export const deleteTagsByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-tags-by-admin', {
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

export const CreateorUpdateTagsByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-tags-by-admin', {
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

export const getAlBlogsFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-blogs-filtered-for-admin', {
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

export const deleteBlogsByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-blogs-by-admin', {
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

export const CreateBlogByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-blog-by-admin', {
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

export const getSingleBlogDetailsByAdmin = async (userId, blogId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-blog-details-by-admin`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId,
				blog_id: blogId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const EditBlogByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/edit-blog-by-admin', {
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

export const getAdminSettingData = async userId => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-admin-settings-data-by-admin`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const UpdateAdminSettings = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-admin-settings', {
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

export const updateLogoAndFaviconByAdmin = async (data, image) => {
	let formdata = new FormData();
	formdata.append('image', image);
	return new Promise((resolve, reject) => {
		const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/admin/update-logo-and-favicon-by-admin', formdata, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllInquiryFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-inquiry-filtered-for-admin', {
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

export const getSingleInquiryResponseDataByd = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-inquiry-response-data-by-id`, {
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

export const deleteInquiryByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-inquiry-by-admin', {
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

export const getAllSupportFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-support-filtered-for-admin', {
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

export const deleteSupportByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-support-by-admin', {
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

export const getSingleSupporDetailsByAdmin = async (userId, SupportId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-support-ticket-details-by-admin`,
			{
				method: 'get',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				params: {
					user_id: userId,
					SupportId: SupportId
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const supportTicketReplyByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/support-ticket-reply-by-admin', {
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

export const getAllReviewsFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-reviews-filtered-for-admin', {
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

export const changePassword = async (user_id, newPassword) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/change-password`, {
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

export const getNotificationSettings = async user_id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-notification-settings`, {
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
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/update-notification-settings`, {
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

export const getSingleLawyerReviewsDetails = async (userId, lawyerId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-lawyer-reviews-details`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId,
				lawyerId: lawyerId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateLawerReviewsReportStatus = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-lawyer-review-report-status', {
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

export const saveReviewReportByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/save-review-report-by-admin', {
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

export const getAllUserAndLaywerFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-users-and-lawyer-filtered-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const createNewEndUserByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-end-user-by-admin', {
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

export const removeProfilePictureByAdmin = async (enduserid, user_id) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/remove-profile-picture-by-admin`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			data: {
				enduserid: enduserid,
				user_id: user_id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateEndUserByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-end-user-by-admin', {
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

export const createLawyerByAdmin = async data => {
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
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-lawyer-by-admin', {
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

export const updateLawyerByAdmin = async data => {
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
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-lawyer-by-admin', {
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

export const getAllLegalForumActiveFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-legal-forum-active-filtred-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllLegalForumApprovalFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-legal-forum-approval-filtred-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const deleteLegalForumByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-legal-forum-by-admin', {
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

export const getAllLegalForumLawyerContributionForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-legal-lawyer-contribution-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getSingleLegalForumDetailsByAdmin = async (userId, LegalForumId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-single-legal-forum-details-by-admin`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId,
				legal_forum_id: LegalForumId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateSingleLegalForumData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-single-legal-forum-data', {
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

export const updatelegalForumResponseStatus = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-legal-forum-response-status', {
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

export const getLawyerContributionData = async (userId, lawyerId) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-lawyer-contribution-data`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken()
			},
			params: {
				user_id: userId,
				lawyer_id: lawyerId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAlServiceQaFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-ServiceQa-filtered-for-admin', {
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

export const CreateorUpdateServiceQaByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-ServiceQa-by-admin', {
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

export const deleteServiceQaByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-ServiceQa-by-admin', {
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

export const getAlServiceBenefitFilteredForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(
			process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-Service-benefit-filtered-for-admin',
			{
				method: 'post',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getToken()
				},
				data: {
					...data
				}
			}
		);
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const CreateorUpdateServiceBenefitByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-ServiceBenefit-by-admin', {
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

export const deleteServiceBenefitByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-service-benefit-by-admin', {
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

export const createOrUpdateAuthor = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-author', {
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

export const deleteAuthor = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-author/' + id, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + getToken()
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const createOrUpdateFirmByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/create-or-update-firm-by-admin', {
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

export const getAllFirmsForAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-firms', {
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

export const deleteFirmByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/delete-firm-by-admin', {
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

export const getAllUnassignedLawyers = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-unassigned-lawyers', {
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

export const assignFirmToLawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-member-firm-id', {
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

export const removeFirmToLawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/remove-member-firm-id', {
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

export const getAllAssignedLawyersToFirm = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-all-assigned-lawyers', {
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

export const getAllUnArchiveFirm = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-unarchive-all-firms', {
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

export const archiveToFirm = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/archive-firm', {
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

export const unArchiveToFirm = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/unarchive-firm', {
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

export const approveToFirmByAdmin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/approve-firm', {
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

export const getAllFirms = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/get-firms', {
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

export const assignFirmOwnerToLawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin/update-member-firm-owner', {
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

export const importMembers = async file => {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/admin/import-Members', formData, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + getToken()
			}
		});
		return res.data;
	} catch (err) {
		throw err;
	}
};
