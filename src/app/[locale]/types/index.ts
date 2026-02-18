export interface State {
	name: string;
	abbreviation: string;
}

export interface City {
	id: string;
	name: string;
	state: string;
}

export interface Service {
	id: string;
	name: string;
	description: string;
	icon: string;
}

export interface Professional {
	id: string;
	full_name: string;
	service_name: string;
	phone_number: string;
	service: string;
	city: string;
	state: string;
	rating: number;
	reviewCount: number;
	imageUrl: string;
	bio: string;
	profile_image: string;
	slug: string;
	email: string;
}
