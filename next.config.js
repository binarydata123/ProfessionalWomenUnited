const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

module.exports = withNextIntl({
	reactStrictMode: true,
	cache: false,
	assetPrefix: isProd ? 'https://professional-women.ai-developer.site/' : 'http://localhost:3000/',
	images: {
		domains: ['localhost', 'professional-women.ai-developer.site', 'pro-women.api.ai-developer.site'] // Add your local domain(s) here
	},
	webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
		config.plugins.push(
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			})
		);
		return config;
	},
	async redirects() {
		return [
			{
				source: '/ar/admin/:path*',
				destination: '/en/admin/:path*',
				permanent: true
			},
			{
				source: '/ar/lawyer/:path*',
				destination: '/en/lawyer/:path*',
				permanent: true
			},
			{
				source: '/ar/user/:path*',
				destination: '/en/user/:path*',
				permanent: true
			},
			{
				source: '/ar/firms/:path*',
				destination: '/en/firms/:path*',
				permanent: true
			},
			{
				source: '/ar/find-a-professional/:path*',
				destination: '/en/find-a-professional/:path*',
				permanent: true
			},
			{
				source: '/ar/find-a-professional/:path*',
				destination: '/en/find-a-professional/:path*',
				permanent: true
			},
			{
				source: '/ar/blogs/:path*',
				destination: '/en/blogs/:path*',
				permanent: true
			},
			{
				source: '/ar/legal-forum/:path*',
				destination: '/en/legal-forum/:path*',
				permanent: true
			},
			{
				source: '/ar/author/:path*',
				destination: '/en/author/:path*',
				permanent: true
			},
			{
				source: '/author/al-hamid',
				destination: '/author/anna-lewis',
				permanent: true
			},
			{
				source: '/author/lanna-lewis',
				destination: '/author/anna-lewis',
				permanent: true
			},
			{
				source: '/what-is-the-difference-between-lawyers-in-abu-dhabi-and-indian-lawyers',
				destination: '/blogs/what-is-the-difference-between-lawyers-in-abu-dhabi-and-indian-lawyers',
				permanent: true
			},
			{
				source: '/uae-company-law-guider',
				destination: '/blogs/the-new-uae-companies-law-what-you-need-to-know',
				permanent: true
			},
			{
				source: '/ministry-of-human-resources-and-emiratisation',
				destination: '/blogs/maintaining-emiratisation-target-throughout-12-months-to-avoid-fines-in-the-uae',
				permanent: true
			},
			{
				source: '/ministry-of-human-resources-and-emiratisation',
				destination: '/blogs/maintaining-emiratisation-target-throughout-12-months-to-avoid-fines-in-the-uae',
				permanent: true
			},
			{
				source: '/nafith-platform-and-digital-automated-promissory-notes-in-saudi-arabia',
				destination: '/blogs/nafith-platform-digital-automated-promissory-notes-in-ksa',
				permanent: true
			},
			{
				source: '/why-does-a-company-need-legal-services',
				destination: '/blogs/why-does-a-company-need-legal-services',
				permanent: true
			},
			{
				source: '/why-does-a-company-need-legal-services',
				destination: '/blogs/why-does-a-company-need-legal-services',
				permanent: true
			},
			{
				source: '/new-uae-labour-law-rules-for-employees',
				destination: '/blogs/new-uae-labour-law-rules-and-implications-for-employees',
				permanent: true
			},
			{
				source: '/what-are-the-legal-services-for-businesses',
				destination: '/blogs/what-are-the-legal-services-for-businesses',
				permanent: true
			},
			{
				source: '/green-visa-uae',
				destination: '/blogs/uae-green-visa-2023-all-you-need-to-know-about-the-new-uae-residency-visa-scheme',
				permanent: true
			},
			{
				source: '/dewa-final-bill',
				destination: '/blogs/dewa-final-bill-settlement-process-in-uae-before-an-rdc-case',
				permanent: true
			},
			{
				source: '/absconding-case-in-the-uae',
				destination: '/blogs/understand-on-how-to-check-absconding-cases-in-uae-2023',
				permanent: true
			},
			{
				source: '/gosi-online-registration',
				destination: '/blogs/how-to-print-gosi-salary-certificate-online-after-registration',
				permanent: true
			},
			{
				source: '/digital-disruption-a-technological-revolution-in-the-legal-advice',
				destination: '/blogs/digital-disruption-a-technological-revolution-in-the-legal-industry',
				permanent: true
			},
			{
				source: '/how-to-become-an-immigration-lawyer-a-guide',
				destination: '/blogs/how-to-become-an-immigration-lawyer-a-guide',
				permanent: true
			},
			{
				source: '/rera-rent-calculator',
				destination: '/blogs/rera-rental-index-calculator-how-much-you-pay-off-on-rent',
				permanent: true
			},
			{
				source: '/understanding-employment-issues-in-the-uae',
				destination: '/blogs/understanding-employment-issues-in-the-uae',
				permanent: true
			},
			{
				source: '/dubai-property-investor-visa',
				destination: '/blogs/everything-you-need-to-know-about-property-investor-visa-dubai',
				permanent: true
			},
			{
				source: '/corporate-lawyers-in-uae',
				destination: '/blogs/corporate-lawyers-in-the-uae-an-insight-into-how-much-they-make-or-earn',
				permanent: true
			},
			{
				source: '/benefits-of-outsourcing-legal-services-for-law-firms',
				destination: '/blogs/benefits-of-outsourcing-legal-services-for-law-firms',
				permanent: true
			},
			{
				source: '/xxxxx-xxxxxx-defnition-meaning-in-a-legal-agreement',
				destination: '/blogs/how-to-use-xxxxx-xxxxxx-in-a-legal-agreement',
				permanent: true
			},
			{
				source: '/uae-labour-law-what-is-covid-19-pandemic-redundancy',
				destination: '/blogs/uae-labour-law-what-is-covid-19-pandemic-redundancy',
				permanent: true
			},
			{
				source: '/article-121-uae-labour-law',
				destination:
					'/blogs/article-121-uae-labour-law-talks-about-the-termination-notice-period-of-the-employee',
				permanent: true
			},
			{
				source: '/know-more-about-leave-salary-calculation-in-the-uae',
				destination: '/blogs/know-more-about-leave-salary-calculation-in-the-uae',
				permanent: true
			},
			{
				source: '/how-to-register-tenancy-contract-with-ejari-in-dubai-guider',
				destination: '/blogs/find-out-how-to-register-a-tenancy-contract-in-ejari',
				permanent: true
			},
			{
				source: '/etisalat-sim-renewal-2',
				destination:
					'/blogs/does-an-etisalat-sim-renewal-have-any-effects-for-your-visa-cancellation-know-more',
				permanent: true
			},
			{
				source: '/gulf-salary-premium',
				destination: '/blogs/gulf-salary-premium-make-sure-to-be-aware-of-job-offers-scam-in-uae',
				permanent: true
			},
			{
				source: '/new-uae-labour-law-in-2022-every-single-thing-you-need-to-know',
				destination: '/blogs/what-is-new-in-the-uae-labour-law-in-2022',
				permanent: true
			},
			{
				source: '/employment-labour-contracts-in-private-firms',
				destination: '/blogs/the-most-important-features-of-employment-contracts-in-the-uae',
				permanent: true
			},
			{
				source: '/article-121-uae-labour-law-2',
				destination:
					'/blogs/article-121-uae-labour-law-talks-about-the-termination-of-contract-and-notice-period-of-the-employee',
				permanent: true
			},
			{
				source: '/carrying-and-money-laundering-in-the-uae-banking-cash-in-contemporary-regulation',
				destination: '/blogs/carrying-and-money-laundering-in-the-uae-banking-cash-in-contemporary-regulation',
				permanent: true
			},
			{
				source: '/what-are-the-steps-to-request-releasing-of-passport',
				destination: '/blogs/passport-releasing-dubai-we-show-you-how-to-go-through-this-process',
				permanent: true
			},
			{
				source: '/driving-under-the-influence-of-alcohol-is-punishable-by-law',
				destination: '/blogs/learn-driving-under-the-influence-of-alcohol-is-punishable-by-law',
				permanent: true
			},
			{
				source: '/freelance-visa-permit-dubai-uae-cost-qualification-guider',
				destination: '/blogs/do-you-need-a-freelance-visa-we-show-you-how-to-get-it-in-dubai',
				permanent: true
			},
			{
				source: '/deportation-in-the-uae-all-you-must-know-and-how-to-seek-our-lawyers-assistance',
				destination: '/blogs/deportation-in-the-uae-all-you-must-know-and-how-to-seek-our-lawyers-assistance',
				permanent: true
			},
			{
				source: '/ministry-of-labour-mol-importance-in-uae',
				destination: '/blogs/mol-uae-all-you-need-to-know-about-this-entity',
				permanent: true
			},
			{
				source: '/how-to-remove-an-absconding-case-in-the-uae',
				destination: '/blogs/learn-and-understand-on-how-to-remove-an-absconding-case-in-the-uae',
				permanent: true
			},
			{
				source: '/how-to-remove-an-absconding-case-in-the-uae',
				destination: '/blogs/learn-and-understand-on-how-to-remove-an-absconding-case-in-the-uae',
				permanent: true
			},
			{
				source: '/uae-gratuity-law-how-is-it-calculated-in-accordance-with-the-latest-law',
				destination: '/blogs/uae-gratuity-law-how-is-it-calculated-in-accordance-with-the-latest-law',
				permanent: true
			},
			{
				source: '/enroll-with-mudad-podium',
				destination: '/blogs/mudad-what-is-this-system-and-how-to-register',
				permanent: true
			},
			{
				source: '/labour-court-in-dubai',
				destination: '/blogs/know-how-to-file-employment-court-case-in-labour-court-dubai',
				permanent: true
			},
			{
				source: '/check-and-validify-dubai-visa-status-uae-online',
				destination: '/blogs/the-ultimate-guide-for-a-dubai-visa-status-check',
				permanent: true
			},
			{
				source: '/banking-lawyers-in-dubai-all-you-need-to-know-about-them',
				destination: '/blogs/banking-lawyers-in-dubai-all-you-need-to-know-about-them',
				permanent: true
			},
			{
				source: '/what-is-establishment-immigration-card-and-how-to-attain-in-dubai',
				destination: '/blogs/establishment-card-uae-how-to-obtain-one-and-why-is-it-so-important',
				permanent: true
			},
			{
				source: '/beware-of-the-grace-period-after-a-visa-cancellation-in-the-uae-avoid-fines',
				destination: '/blogs/beware-of-the-grace-period-after-a-visa-cancellation-in-the-uae-avoid-fines',
				permanent: true
			},
			{
				source: '/how-to-check-overstay-fine-in-uae-online-guider',
				destination: '/blogs/how-to-check-overstay-fine-in-uae',
				permanent: true
			},
			{
				source: '/can-i-resign-after-6-months-in-limited-contract-uae',
				destination: '/blogs/major-legal-update-can-i-resign-after-6-months-in-limited-contract-in-uae',
				permanent: true
			},
			{
				source: '/new-cheque-bounce-in-the-uae',
				destination: '/blogs/understanding-cheque-bounce-in-the-uae-2023-laws-and-regulations',
				permanent: true
			},
			{
				source: '/noc-letter-in-dubai',
				destination:
					'/blogs/facts-to-know-about-the-noc-letter-in-dubai-requirement-from-the-employer-to-partner-with-another-business',
				permanent: true
			},
			{
				source: '/rental-dispute-center-plays-a-pivotal-role-in-settling-many-disputes-in-dubai',
				destination: '/blogs/rental-dispute-center-plays-a-pivotal-role-in-settling-many-disputes-in-dubai',
				permanent: true
			},
			{
				source: '/anti-concealment-law',
				destination: '/blogs/saudi-arabia-enforces-new-anti-concealment-law-rules-2021',
				permanent: true
			},
			{
				source: '/no-objection-letter-from-a-sponsor-to-work-in-the-uae',
				destination: '/blogs/sample-of-noc-no-objection-letter-from-a-sponsor-to-work-in-the-uae',
				permanent: true
			},
			{
				source: '/unlimited-contract-resignation-uae',
				destination: '/blogs/learn-about-the-unlimited-contract-resignation-process-in-the-uae',
				permanent: true
			},
			{
				source: '/uae-bounced-cheque-law-cheque-bounce-is-no-longer-an-offense',
				destination: '/blogs/uae-bounced-cheque-law-cheque-bounce-is-no-longer-an-offense',
				permanent: true
			},
			{
				source: '/immigration-ban-in-uae',
				destination: '/blogs/how-to-check-immigration-ban-online-in-uae-and-how-to-remove-it',
				permanent: true
			},
			{
				source: '/new-vat-law-in-uae',
				destination: '/blogs/new-uae-vat-rules-2022-business-exemptions-and-registration-for-5-tax-explained',
				permanent: true
			},
			{
				source: '/how-to-attain-dubai-police-clearance-certificate-online',
				destination: '/blogs/how-can-you-obtain-the-necessary-police-clearance-certificate-dubai',
				permanent: true
			},
			{
				source: '/uae-gratuity-law-how-is-it-calculated-in-accordance-with-the-latest-law',
				destination: '/blogs/uae-gratuity-law-how-is-it-calculated-in-accordance-with-the-latest-law',
				permanent: true
			},
			{
				source: '/non-renewal-of-contract-letter',
				destination: '/blogs/ultimate-guide-to-non-renewal-of-contract-letter-learn-when-to-use-it',
				permanent: true
			},
			{
				source: '/how-to-verify-gdrfa-application-status-tracking-online-2023',
				destination: '/blogs/simple-steps-to-find-out-the-gdrfa-application-status',
				permanent: true
			},
			{
				source: '/divorce-procedure-in-uae-for-indians-expats',
				destination: '/blogs/steps-to-divorce-in-the-united-arab-emirates-if-you-are-married-in-india',
				permanent: true
			},
			{
				source: '/end-of-service-benefit-uae-for-foreign-workers',
				destination: '/blogs/end-of-service-benefit-uae',
				permanent: true
			},
			{
				source: '/new-labour-law-in-uae-2022-for-government-and-private-sector',
				destination: '/blogs/a-practical-guide-to-the-new-labour-law-in-uae-2022',
				permanent: true
			},
			{
				source: '/corporate-lawyers-an-overview-of-law-firms-in-the-uae',
				destination: '/blogs/corporate-lawyers-an-overview-of-law-firms-in-the-uae',
				permanent: true
			},
			{
				source: '/abortion-in-uae-dubai-pill',
				destination: '/blogs/is-abortion-lawful-in-uae',
				permanent: true
			},
			{
				source: '/topmost-typing-center-dubai-uae-for-documentation-services',
				destination: '/blogs/an-easy-guide-to-typing-services-in-dubai-in-2023',
				permanent: true
			},
			{
				source: '/employment-lawyers-a-guide-to-finding-the-best-lawyers-in-the-uae',
				destination: '/blogs/employment-lawyers-a-guide-to-finding-the-best-lawyers-in-the-uae',
				permanent: true
			},
			{
				source: '/paragon-migration-dubai-abu-dhabi-fake-legit-review',
				destination: '/blogs/is-paragon-migration-in-dubai-and-abu-dhabi-real-or-a-fraud',
				permanent: true
			},
			{
				source: '/how-to-check-vpn-fine-in-uae',
				destination: '/blogs/how-to-check-vpn-fine-in-uae',
				permanent: true
			},
			{
				source: '/labor-court-dubai-how-to-file-a-complaint-with-regards-to-labor-issues',
				destination: '/blogs/labor-court-dubai-how-to-file-a-complaint-with-regards-to-labor-issues',
				permanent: true
			},
			{
				source: '/how-to-complete-dubai-marriage-certificate-attestation',
				destination: '/blogs/how-to-certify-vouch-witness-attest-marriage-certificate-for-uae',
				permanent: true
			},
			{
				source: '/an-overview-of-employment-lawyers-in-dubai-and-the-uae',
				destination: '/blogs/an-overview-of-employment-lawyers-in-dubai-and-the-uae',
				permanent: true
			},
			{
				source: '/employer-delaying-visa-cancellation-a-common-issue-for-uae-residence-visa-holders',
				destination: '/blogs/employer-delaying-visa-cancellation-a-common-issue-for-uae-residence-visa-holders',
				permanent: true
			},
			{
				source: '/e-signature-card-in-dubai-uae',
				destination: '/blogs/how-to-obtain-e-signature-card-in-dubai',
				permanent: true
			},
			{
				source: '/civil-case-in-dubai-get-an-overview-of-procedures-in-the-civil-law-department',
				destination: '/blogs/civil-case-in-dubai-get-an-overview-of-procedures-in-the-civil-law-department',
				permanent: true
			},
			{
				source: '/toc-taking-over-certificate-meaning-importance-in-construction',
				destination: '/blogs/learn-about-all-aspects-of-toc-in-construction',
				permanent: true
			},
			{
				source: '/pornography-laws-dubai-uae-what-you-need-to-know',
				destination: '/blogs/pornography-laws-dubai-what-you-need-to-know',
				permanent: true
			},
			{
				source: '/how-to-get-qatar-employment-contract',
				destination: '/blogs/how-to-make-a-qatar-employment-contract',
				permanent: true
			},
			{
				source: '/what-is-the-difference-between-lawyers-in-abu-dhabi-and-indian-lawyers',
				destination: '/blogs/what-is-the-difference-between-lawyers-in-abu-dhabi-and-indian-lawyers',
				permanent: true
			},
			{
				source: '/why-banks-ask-for-employment-salary-certificate-uae-format',
				destination: '/blogs/salary-certificate-everything-you-need-to-know',
				permanent: true
			},
			{
				source: '/banking-lawyers-in-dubai-all-you-need-to-know-about-them',
				destination: '/blogs/banking-lawyers-in-dubai-all-you-need-to-know-about-them',
				permanent: true
			},
			{
				source: '/how-to-check-visa-status-file-validity-uae-using-passport-number',
				destination: '/blogs/find-uae-visa-status-validity-using-your-passport-also-online',
				permanent: true
			},
			{
				source: '/alcohol-license-dubai',
				destination: '/blogs/alcohol-license-dubai-everything-you-need-to-know',
				permanent: true
			},
			{
				source: '/franchise-in-uae',
				destination: '/blogs/how-to-set-up-a-franchise-in-uae',
				permanent: true
			},
			{
				source: '/know-more-about-family-lawyers-in-dubai',
				destination: '/blogs/know-more-about-family-lawyers-in-dubai',
				permanent: true
			},
			{
				source: '/emirates-id-fine-checking-online-using-your-phone',
				destination: '/blogs/how-to-do-the-emirates-id-status-check-and-fines',
				permanent: true
			},
			{
				source: '/introduction-of-corporate-tax-uae-in-2023',
				destination: '/blogs/introduction-of-corporate-tax-uae-in-2023',
				permanent: true
			},
			{
				source: '/how-to-acquire-remote-work-visa-dubai',
				destination: '/blogs/everything-you-need-to-know-about-remote-work-visa-dubai',
				permanent: true
			},
			{
				source: '/employment-visa-uae',
				destination: '/blogs/new-employment-work-visa-condition-in-uae-how-to-avail-permit',
				permanent: true
			},
			{
				source: '/how-to-extend-or-renewal-of-trade-license-in-abu-dhabi',
				destination: '/blogs/how-to-renew-a-trade-license-for-business-in-abu-dhabi',
				permanent: true
			},
			{
				source: '/ica-smart-services-in-uae-for-visa-status-check-perfect-guider',
				destination: '/blogs/how-to-use-ica-smart-services-in-the-uae',
				permanent: true
			},
			{
				source: '/why-register-with-tawtheeq-tenancy-contract-abu-dhabi-is-crucial',
				destination: '/blogs/what-is-tawtheeq-and-how-to-register-in-abu-dhabi',
				permanent: true
			},
			{
				source: '/why-banks-ask-for-employment-salary-certificate-uae-format',
				destination: '/blogs/salary-certificate-everything-you-need-to-know',
				permanent: true
			},
			{
				source: '/how-to-check-visa-status-file-validity-uae-using-passport-number',
				destination: '/blogs/find-uae-visa-status-validity-using-your-passport-also-online',
				permanent: true
			},
			{
				source: '/emirates-id-fine-checking-online-using-your-phone',
				destination: '/blogs/how-to-do-the-emirates-id-status-check-and-fines',
				permanent: true
			},
			{
				source: '/franchise-in-uae',
				destination: '/blogs/how-to-set-up-a-franchise-in-uae',
				permanent: true
			},
			{
				source: '/process-to-transfer-employees-through-qiwa-in-ksa',
				destination: '/blogs/the-procedure-to-transfer-employees-through-the-qiwa-platform-in-ksa',
				permanent: true
			},
			{
				source: '/uae-unemployment-insurance-scheme-guidebook',
				destination: '/blogs/uae-unemployment-insurance-now-compulsory-how-you-can-get-USD20-000-a-month',
				permanent: true
			},
			{
				source: '/limited-contract-45-days-salary-when-employee-terminates-contract',
				destination: '/blogs/limited-contract-45-days-salary-in-case-when-employee-terminates-the-contracts',
				permanent: true
			},
			{
				source: '/how-to-find-labour-contract-online-in-uae-using-internet',
				destination: '/blogs/everything-you-need-to-know-about-a-labour-contract-uae',
				permanent: true
			},
			{
				source: '/article-80-saudi-labor-law-with-zero-benefits',
				destination: '/blogs/everything-about-article-80-of-labor-laws-in-saudi-arabia',
				permanent: true
			},
			{
				source: '/minimum-wage-and-salary-standards-in-saudi-arabia',
				destination: '/blogs/know-all-the-details-of-the-minimum-wage-in-saudi-arabia',
				permanent: true
			},
			{
				source: '/an-outline-of-epc-contractual-agreement',
				destination: '/blogs/what-is-an-epc-contract-here-is-what-you-need-to-know',
				permanent: true
			},
			{
				source: '/e-scooter-license-dubai-apply-online',
				destination:
					'/blogs/dubai-residents-can-now-e-scooter-license-online-in-dubai-for-free-rta-releases-safety-manual',
				permanent: true
			},
			{
				source: '/mohre-gratuity-end-of-service-calculator-in-dubai-uae-using-internet',
				destination: '/blogs/mohre-gratuity-end-of-service-calculator-in-dubai-uae-using-internet',
				permanent: true
			},
			{
				source: '/how-to-discover-emirates-unified-or-uid-number-uae-abu-dhabi',
				destination: '/blogs/easily-get-your-unified-number-uae-online-in-2023',
				permanent: true
			},
			{
				source: '/how-to-check-and-verify-emirates-id-application-status-online-2023',
				destination: '/blogs/3-easy-steps-to-emirates-id-status-check-in-2023',
				permanent: true
			},
			{
				source: '/cybercrime-in-uae',
				destination: '/blogs/new-cyber-law-in-uae',
				permanent: true
			},
			{
				source: '/how-to-draft-a-resignation-letter-in-uae-with-samples',
				destination: '/blogs/drafting-a-resignation-letter-in-the-uae-with-samples-perfect-guider',
				permanent: true
			},
			{
				source: '/know-how-to-choose-a-divorce-lawyer-in-dubai',
				destination: '/blogs/know-how-to-choose-a-divorce-lawyer-in-dubai',
				permanent: true
			},
			{
				source: '/public',
				destination: '/blogs',
				permanent: true
			},
			{
				source: '/public/:slug*',
				destination: '/blogs/:slug*',
				permanent: true
			},
			{
				source: '/legal-services',
				destination: '/legal-services/banking',
				permanent: true
			},
			{
				source: '/question',
				destination: '/legal-forum',
				permanent: true
			},
			{
				source: '/energy',
				destination: '/',
				permanent: true
			},
			{
				source: '/service',
				destination: '/legal-services',
				permanent: true
			},
			{
				source: '/service/:slug*',
				destination: '/legal-services',
				permanent: true
			},
			{
				source: '/blogs/blogs/:slug*',
				destination: '/blogs/:slug*',
				permanent: true
			},
			{
				source: '/practice-area',
				destination: '/',
				permanent: true
			},
			{
				source: '/divorce-lawyers-in-dubai',
				destination: '/find-a-professional',
				permanent: true
			},
			{
				source: '/legal-advice-by-lawyers-to-the-blog-readers-in-general',
				destination: '/blogs',
				permanent: true
			},
			{
				source: '/family-law',
				destination: '/legal-services/family',
				permanent: true
			},
			{
				source: '/corporate-commercial-law',
				destination: '/legal-services/commercial',
				permanent: true
			},
			{
				source: '/criminal-lawyers-in-dubai',
				destination: '/legal-services/criminal',
				permanent: true
			},
			{
				source: '/visa-cancellations-can-my-residence-visa-be-canceled-without-notice',
				destination: '/blogs',
				permanent: true
			},
			{
				source: '/blogs/auth/choose-profile',
				destination: '/auth/choose-profile',
				permanent: true
			},
			{
				source: '/financial-law',
				destination: '/legal-services/islamic-finance',
				permanent: true
			},
			{
				source: '/construction-law',
				destination: '/legal-services/real-estate',
				permanent: true
			},
			{
				source: '/commercial-property',
				destination: '/legal-services/commercial',
				permanent: true
			},
			{
				source: '/blogs/blogs/mol-uae-all-you-need-to-know-about-this-entity',
				destination: '/blogs',
				permanent: true
			},
			{
				source: '/corporate-lawyers-in-dubai',
				destination: '/find-a-professional',
				permanent: true
			},
			{
				source: '/blogs/end-of-service-benefit-uae',
				destination: '/blogs',
				permanent: true
			},
			{
				source: '/contact@connectlegal.ae',
				destination: '/contact-us',
				permanent: true
			},
			{
				source: '/criminal-lawyers-in-dubai',
				destination: '/legal-services/criminal',
				permanent: true
			},
			{
				source: '/drug-offences',
				destination: '/legal-services/criminal',
				permanent: true
			},
			{
				source: '/financial-law',
				destination: '/legal-services/criminal',
				permanent: true
			},
			{
				source: '/drug-offences',
				destination: '/legal-services/criminal',
				permanent: true
			},
			{
				source: '/financial-law',
				destination: '/legal-services/criminal',
				permanent: true
			},
			{
				source: '/legal-serevices',
				destination: '/legal-services/banking',
				permanent: true
			},
			{
				source: '/legal-advice-by-lawyers-to-the-blog-readers-in-general/',
				destination: '/blogs',
				permanent: true
			},
			{
				source: '/financial-law',
				destination: '/legal-services/banking',
				permanent: true
			}
		];
	}
});
