import axios from 'axios';

export const getAllBlogs = async data => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/blogs', {
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
export const getLatestBlogs = async () => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/blogs/latest-blog', {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};

export const getSingleBlogBySlug = async slug => {
	return new Promise((resolve, reject) => {
		const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/blogs/' + slug, {
			method: 'get',
			headers: {
				Accept: 'application/json'
			}
		});
		req.then(res => resolve(res.data)).catch(err => reject(err));
	});
};
