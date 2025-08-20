import './profile.css';
import type { Metadata } from 'next';
import CreateProfile from '@/components/public/CreateProfile';

export const metadata: Metadata = {
	title: 'Create Your Profile - Professional Women United',
	description: 'Create your profile on Professional Women United to either expand your reach as a lawyer or get professional advice as a user.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/create-profile`
	},
	openGraph: {
		title: 'Create Your Profile - Professional Women United',
		description: 'Create your profile on Professional Women United to either expand your reach as a lawyer or get professional advice as a user.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/create-profile`,
		siteName: `${process.env.NEXT_APP_NAME}`,
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
				width: 350,
				height: 50,
			},
		],
		type: 'website',
	},
}

export default function ProfilePage() {
	return (
		<>
			<CreateProfile />
		</>
	);
}
