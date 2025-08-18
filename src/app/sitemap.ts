import {MetadataRoute} from 'next';
import {
	getAllLawyersData,
	getAllAuthor,
	getAllFirmsData,
	getAllQuestionsforSitemap,
	getAllServices
} from '../../lib/frontendapi';
import {getAllBlogs} from '../../lib/blogapi';

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Lawyer {
	slug: string;
	created_at: string;
}

interface Firm {
	slug: string;
	created_at: string;
}

interface Blog {
	slug: string;
	created_at: string;
}

interface Service {
	slug: string;
	created_at: string;
}

interface LegalQuestion {
	service_slug: string;
	slug: string;
	created_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	function encodeForSitemap(slug: string) {
		// return slug.replace(/&/g, '&amp;');
		return slug ? slug.replace(/&/g, '&amp;') : '';
	}

	const lawyersResponse = await getAllLawyersData();
	const lawyerdata: Lawyer[] = lawyersResponse.data;

	const lawyer = lawyerdata.map(({slug, created_at}: Lawyer) => ({
		url: `${EXTERNAL_DATA_URL}/find-a-lawyer/${encodeForSitemap(slug)}`,
		lastModified: new Date(created_at).toISOString().slice(0, 19) + '+00:00',
		priority: 0.8
	}));

	const firmResponse = await getAllFirmsData();
	const firmdata: Firm[] = firmResponse.data;

	const firm = firmdata.map(({slug, created_at}: Firm) => ({
		url: `${EXTERNAL_DATA_URL}/firms/${encodeForSitemap(slug)}`,
		lastModified: new Date(created_at).toISOString().slice(0, 19) + '+00:00',
		priority: 0.8
	}));

	const authorsResponse = await getAllAuthor();
	const authorsData: Lawyer[] = authorsResponse.data;

	const authors = authorsData.map(({slug, created_at}: Lawyer) => ({
		url: `${EXTERNAL_DATA_URL}/author/${encodeForSitemap(slug)}`,
		lastModified: new Date(created_at).toISOString().slice(0, 19) + '+00:00',
		priority: 0.8
	}));

	const BlogsResponse = await getAllBlogs();
	const blogsdata: Blog[] = BlogsResponse.data;

	const blog = blogsdata.map(({slug, created_at}: Blog) => ({
		url: `${EXTERNAL_DATA_URL}/blogs/${encodeForSitemap(slug)}`,
		lastModified: new Date(created_at).toISOString().slice(0, 19) + '+00:00',
		priority: 0.8
	}));

	const LegalForemResponse = await getAllQuestionsforSitemap();
	const Legalquestions: LegalQuestion[] = LegalForemResponse.data;

	const Legalquestion = Legalquestions.map(({service_slug, slug, created_at}: LegalQuestion) => ({
		url: `${EXTERNAL_DATA_URL}/legal-forum/${service_slug}/${encodeForSitemap(slug)}`,
		lastModified: new Date(created_at).toISOString().slice(0, 19) + '+00:00',
		prioritysds: 0.8
	}));

	const serviceResponse = await getAllServices();
	const servicedata: Service[] = serviceResponse.data;

	const service = servicedata.map(({slug, created_at}: Blog) => ({
		url: `${EXTERNAL_DATA_URL}/legal-services/${encodeForSitemap(slug)}`,
		lastModified: new Date(created_at).toISOString().slice(0, 19) + '+00:00',
		priority: 0.8
	}));

	const routes = [
		'',
		'/find-a-lawyer',
		'/firms',
		'/legal-forum',
		'/blogs',
		'/author',
		'/about-us',
		'/contact-us',
		'/for-lawyers',
		'/auth/login',
		'/legal-issue',
		'/ask-a-lawyer',
		'/auth/choose-profile',
		'/auth/lawyer/choose-pricing-plan',
		'/auth/create-profile',
		'/auth/forgot-password',
		'/legal-issue/family',
		'/auth/lawyer/step-2',
		'/arbitration-lawyer-uae',
		'/banking-lawyer-uae',
		'/bankruptcy-lawyer-uae',
		'/bicycle-accident-lawyer-dubai',
		'/brain-injury-lawyer-dubai',
		'/business-lawyer-dubai',
		'/car-accident-lawyer-dubai',
		'/child-custody-lawyer-uae',
		'/child-support-lawyer',
		'/civil-lawyer-dubai',
		'/commercial-lawyer-dubai',
		'/construction-accidents-lawyer-uae',
		'/corporate-lawyer-dubai',
		'/criminal-lawyers-dubai',
		'/divorce-lawyer-dubai',
		'/dubai-construction-lawyer',
		'/family-lawyer-dubai',
		'/immigration-lawyer-dubai',
		'/inheritance-lawyer-uae',
		'/intellectual-property-lawyer-dubai',
		'/labour-lawyer-dubai',
		'/maritime-lawyer-dubai',
		'/marriage-lawyers-dubai',
		'/motorcycle-accident-lawyer-dubai',
		'/property-lawyer-dubai',
		'/real-estate-lawyer-dubai',
		'/rental-dispute-lawyer-dubai',
		'/truck-accident-lawyer-dubai',
		'/uber-accidents-lawyer-dubai',
		'/hospital-negligence-lawyer-uae',
		'/personal-injury-lawyer-dubai',
		'/injury-lawyer-dubai',
		'/medical-malpractice-lawyer',
		'/crypto-lawyer-dubai',
		'/premises-liability-lawyer-uae',
		'/product-liability-lawyer-dubai',
		'/financial-lawyer-dubai',
		'/patent-lawyer-dubai',
		'/dispute-lawyer-dubai',
		'/disability-lawyers-dubai',
		'/employment-lawyer-dubai',
		'/entertainment-lawyer-dubai',
		'/lawyers-in-dubai',
		'/lawyers-in-abu-dhabi',
		'/lawyers-in-sharjah',
		'/lawyers-in-ajman',
		'/lawyers-in-umm-al-quwain',
		'/lawyers-in-ras-al-khaimah',
		'/lawyers-in-fujairah',
		'/criminal-lawyers-abu-dhabi',
		'/divorce-lawyer-abu-dhabi',
		'/family-lawyer-abu-dhabi',
		'/immigration-lawyer-abu-dhabi',
		'/maritime',
		''
	].map(route => ({
		url: `${EXTERNAL_DATA_URL}${route}`,
		lastModified: new Date().toISOString().slice(0, 19) + '+00:00',
		priority: 0.8
	}));
	return [...routes, ...lawyer, ...firm, ...blog, ...Legalquestion, ...service, ...authors];
}
