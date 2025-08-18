'use client';
import {ThreeDots} from 'react-loader-spinner';

export default function Loading() {
	return (
		<div className="bg-light">
			<div className="spinner-container">
				<div className="loading-spinner">
					<ThreeDots
						height="80"
						width="80"
						radius="9"
						color="#4fa94d"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						visible={true}
					/>
				</div>
			</div>
		</div>
	);
}
