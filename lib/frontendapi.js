import {getToken} from '../lib/session';
import axios from 'axios';

export const userregister = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/register', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const googleRegister = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/google-register', {
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

export const googleLogin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/google-login', {
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

export const userlogin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/login', {
			method: 'post',
			headers: {
				Accept: 'application/json'
				// Authorization: "Bearer " + getToken(),
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllCountries = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-country', {
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

export const getAllJurisdictions = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-jurisdictions', {
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

export const getAllServices = async (data = {}) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-services', {
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

export const getAllMemberShipPlan = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-membership-plan', {
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

export const forgetPassword = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/forgetpassword', {
			email: data.email,
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getSingleUserDetails = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-user-details/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken().token
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const resetPassword = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/resetpassword', {
			data: data,
			method: 'post',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const createInquiryWithoutLogin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/createInquirywithoutlogin', {
			data: data,
			method: 'post',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const createInquiryWithLogin = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/createInquirywithlogin', {
			data: data,
			method: 'post',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllServicesName = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-services-name', {
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

export const getAlltags = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/tags', {
			method: 'post',
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

export const getTotalQuestions = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/total-questions', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllquestionsBySlug = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/questions-by-slug', {
			method: 'post',
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

export const getSingleLawyerDetails = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-lawyer-details/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			},
			data: {
				slug: id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const twoSetpAuthVerfiyOTP = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/two-step-auth-verify-otp', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const resendTwoSetpAuthVerifyOtp = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/resend-two-step-auth-verify-otp', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllLawyersOrFilter = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-lawyers', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getSingleQuestionByIdOrSlug = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-question', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const storeQuestionResponse = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/store-question-response', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getLawyerById = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-user-by-id/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getReviewsCount = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-reviews-count-by-id/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const checkIsLiked = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/is-liked/', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const likeQuestionResponse = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/like-legal-forum-comment', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const deleteQuestionResponseLike = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/remove-legal-forum-response', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const searchLegalForumTopic = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/search-legal-forum', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllServiceQuestions = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-services-questions', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getCitiesByState = async stateName => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/cities-by-state', {
			method: 'get',
			params: {
				state: stateName
			},
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllQuestions = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/all-questions', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllLawyersData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-filtered-lawyers', {
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

export const getLawyersDataByName = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-lawyer-by-name', {
			method: 'post',
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

export const askAlawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/ask-a-lawyer', {
			method: 'post',
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

export const getQuestionWithTags = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/search-legal-forum-with-tag', {
			method: 'post',
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

export const contactUsStore = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/contact-us', {
			method: 'post',
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

export const getServiceWithTags = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/services-with-tag', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getExperience = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/experience', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getJurisdication = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/jurisdiction', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const isLawyerSaved = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/is-lawyer-saved`, {
			method: 'post',
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

export const saveLawyer = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/save-lawyer`, {
			method: 'post',
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

export const getReviewsAverage = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/reviews-average/${id}`, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const saveReview = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/save-review`, {
			method: 'post',
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

export const totalanswerInQuestion = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/total-answer-in-question`, {
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

export const totalLikesInQuestion = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/total-likes-in-question`, {
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

export const getAllMetaData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-meta-data', {
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

export const deleteerrorlog = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-error-log', {
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
export const handledeleteAllData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-all-error-log', {
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

export const getFailerErrorLog = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-errorlog', {
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

export const getLawyerMemberPracticeData = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-laywer-member-practice-data/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + getToken().token
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllActiveTagsData = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-active-tag-data', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllQuestionsforSitemap = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/all-questions-for-sitemap', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const updateLastSeen = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-last-seen', {
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

export const checkUserOnline = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/check-user-online', {
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

export const TotalOnlineUsers = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/total-online-users', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const TotalLikeAndDeslikeOnQuestion = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/total-like-dislike-on-question', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const storeSupportMessage = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/store-support-message', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getUserGenderBySlug = async slug => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-gender-by-slug/' + slug, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllServiceQa = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-service-qa-service/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getServiceBenefits = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-service-benefits/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllAuthor = async (data = {name: ''}) => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-authors', {
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

export const getSingleAuthor = async slug => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-author/' + slug, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllFirmsData = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-firms-fronted', {
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

export const getSingleFirmDetails = async id => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-firm-details/' + id, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			},
			data: {
				slug: id
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getLawyersOfFirms = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-lawyer-by-firmid', {
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

export const getFirmByNameSearch = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-firm-name-search', {
			method: 'post',
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

export const saveFirm = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/save-firm`, {
			method: 'post',
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

export const isFirmSaved = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/is-firm-saved`, {
			method: 'post',
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

export const getAdminSettingData = async userId => {
	return new Promise((resolve, reject) => {
		const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/get-admin-settings`, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			},
			params: {
				user_id: userId
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getAllLawyersDataByIds = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-lawyers-by-ids', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getServicesAndMembers = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-services-and-members', {
			method: 'post',
			headers: {
				Accept: 'application/json'
			},
			data: {
				...data
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};
