import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ar'];

export default getRequestConfig(async ({locale}) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	// Load both the general and home specific messages
	const messages = {
		...(await import(`../messages/${locale}/${locale}.json`)).default,
		...(await import(`../messages/${locale}/about.json`)).default,

		...(await import(`../messages/${locale}/menu.json`)).default
	};

	return {
		messages
	};
});
