import ToolTip from '@/commonUI/ToolTip';
import Link from 'next/link';
import React from 'react';
import {AiOutlineEye} from 'react-icons/ai';

interface Props {
	onClick?: () => void;
	Tooltip?: string;
	href?: string;
}

export default function EyeButton({onClick, Tooltip = 'View Profile', href}: Props) {
	return (
		<>
			{href && (
				<Link href={href}>
					<button onClick={onClick} className="icon-btn">
						<AiOutlineEye />
					</button>
				</Link>
			)}
			<ToolTip title={Tooltip} placement="bottom">
				<button onClick={onClick} className="icon-btn">
					<AiOutlineEye />
				</button>
			</ToolTip>
		</>
	);
}
