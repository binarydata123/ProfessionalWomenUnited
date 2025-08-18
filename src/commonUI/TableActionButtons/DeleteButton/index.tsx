import ToolTip from '@/commonUI/ToolTip';
import Link from 'next/link';
import React from 'react';
import {GoTrash} from 'react-icons/go';

interface Props {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	Tooltip?: string;
	href?: string;
}

export default function DeleteButton({onClick, Tooltip = 'View Profile', href}: Props) {
	return (
		<>
			{href && (
				<Link href={href}>
					<button onClick={e => onClick && onClick(e)} className="icon-btn">
						<GoTrash />
					</button>
				</Link>
			)}
			<ToolTip title={Tooltip} placement="bottom">
				<button onClick={e => onClick && onClick(e)} className="icon-btn">
					<GoTrash />
				</button>
			</ToolTip>
		</>
	);
}
