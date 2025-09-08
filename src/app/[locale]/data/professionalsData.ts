import {Professional} from '../types';

export const PROFESSIONALS: Professional[] = [
	{
		id: '1',
		name: 'Dr. Sarah Johnson',
		service: 'gynecologist',
		city: 'Henderson',
		state: 'NV',
		rating: 4.8,
		reviewCount: 124,
		imageUrl: '/images/professionals/1.jpg',
		bio: "Board-certified gynecologist with 15 years of experience specializing in women's health."
	},
	{
		id: '2',
		name: 'Dr. Michael Chen',
		service: 'dentist',
		city: 'Henderson',
		state: 'NV',
		rating: 4.9,
		reviewCount: 89,
		imageUrl: '/images/professionals/2.jpg',
		bio: 'Experienced dentist providing comprehensive dental care for the whole family.'
	}
	// Add more professionals as needed
];
