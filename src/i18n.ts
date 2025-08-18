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
		...(await import(`../messages/${locale}/realEstateLawyers.json`)).default,
		...(await import(`../messages/${locale}/childCustodyLawyers.json`)).default,
		...(await import(`../messages/${locale}/disabilityLawyer.json`)).default,
		...(await import(`../messages/${locale}/maritimeLaw.json`)).default,
		...(await import(`../messages/${locale}/hospitalNegligenceLawyer.json`)).default,
		...(await import(`../messages/${locale}/patentLawyerDubai.json`)).default,
		...(await import(`../messages/${locale}/constructionAccidentLawyer.json`)).default,
		...(await import(`../messages/${locale}/divorceLawyerAbuDhabi.json`)).default,
		...(await import(`../messages/${locale}/familyLawyerInAbuDhabi.json`)).default,
		...(await import(`../messages/${locale}/financialLawyer.json`)).default,
		...(await import(`../messages/${locale}/motorcycleAccidentLawyer.json`)).default,
		...(await import(`../messages/${locale}/truckAccidentLawyer.json`)).default,
		...(await import(`../messages/${locale}/rentalDisputeLawyer.json`)).default,
		...(await import(`../messages/${locale}/marriageLawyer.json`)).default,
		...(await import(`../messages/${locale}/propertyLawyer.json`)).default,
		...(await import(`../messages/${locale}/arbitrationLawyer.json`)).default,
		...(await import(`../messages/${locale}/labourLawyer.json`)).default,
		...(await import(`../messages/${locale}/intellectualProperty.json`)).default,
		...(await import(`../messages/${locale}/premisesLiabilityLawyer.json`)).default,
		...(await import(`../messages/${locale}/bankruptcyLawyer.json`)).default,
		...(await import(`../messages/${locale}/bestLawyersAjman.json`)).default,
		...(await import(`../messages/${locale}/bestLawyersFujairah.json`)).default,
		...(await import(`../messages/${locale}/immigrationLawyersInAbuDhabi.json`)).default,
		...(await import(`../messages/${locale}/childsupportlawyer.json`)).default,
		...(await import(`../messages/${locale}/familtylawyerindubai.json`)).default,
		...(await import(`../messages/${locale}/entertainmentlawyerindubai.json`)).default,
		...(await import(`../messages/${locale}/employmentlawyerindubai.json`)).default,
		...(await import(`../messages/${locale}/CarAccidentLawyerInDubai.json`)).default,
		...(await import(`../messages/${locale}/inheritanceLawyer.json`)).default,
		...(await import(`../messages/${locale}/divorceLawyer.json`)).default,
		...(await import(`../messages/${locale}/bestLawyersAbuDhabi.json`)).default,
		...(await import(`../messages/${locale}/disputeResolutionLawyerDubai.json`)).default,
		...(await import(`../messages/${locale}/intellectualProperty.json`)).default,
		...(await import(`../messages/${locale}/lawyersInRasAlKhaimah.json`)).default,
		...(await import(`../messages/${locale}/civilLawyer.json`)).default,
		...(await import(`../messages/${locale}/injuryLawyer.json`)).default,
		...(await import(`../messages/${locale}/criminalLawyerInAbuDhabi.json`)).default,
		...(await import(`../messages/${locale}/medicalMalpracticeLawyer.json`)).default,
		...(await import(`../messages/${locale}/personalInjury.json`)).default,
		...(await import(`../messages/${locale}/mariTimeInDubai.json`)).default,
		...(await import(`../messages/${locale}/menu.json`)).default
	};

	return {
		messages
	};
});
