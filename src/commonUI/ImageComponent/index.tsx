import Image from 'next/image';
import React, {useState} from 'react';

interface Props {
	src?: string;
	className?: string;
	alt?: string;
	height?: number;
	width?: number;
	style?: React.CSSProperties;
	placeholderImgUrl?: string;
}

function ImageComponent({
	src = '',
	className = '',
	alt = '',
	height,
	width,
	style,
	placeholderImgUrl = ''
}: Props) {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<div>
			{imageError ? (
				<img
					style={style}
					src={placeholderImgUrl}
					alt={alt}
					className={className}
					height={height}
					width={width}
				/>
			) : (
				<img
					style={style}
					onError={handleImageError}
					src={src}
					alt={alt}
					className={className}
					height={height}
					width={width}
				/>
			)}
		</div>
	);
}

export default ImageComponent;
