import {Service} from '../types';

export const SERVICES: Service[] = [
	{id: 'gynecologist', name: 'Gynecologist', icon: '🩺', description: "Women's health specialists"},
	{id: 'dentist', name: 'Dentist', icon: '🦷', description: 'Oral health and dental care'},
	{id: 'pediatrician', name: 'Pediatrician', icon: '👶', description: "Children's healthcare specialists"},
	{id: 'family-attorney', name: 'Family Attorney', icon: '👨‍👩‍👧‍👦', description: 'Family law and legal matters'},
	{
		id: 'personal-injury-attorney',
		name: 'Personal Injury Attorney',
		icon: '⚖️',
		description: 'Personal injury and compensation law'
	},
	{
		id: 'criminal-defense-attorney',
		name: 'Criminal Defense Attorney',
		icon: '🛡️',
		description: 'Criminal law and defense'
	},
	{id: 'real-estate-agent', name: 'Real Estate Agent', icon: '🏠', description: 'Property buying and selling'},
	{id: 'counselor', name: 'Counselor', icon: '❤️', description: 'Mental health and therapy'},
	{id: 'accountant', name: 'Accountant', icon: '🧮', description: 'Financial and tax services'}
];
