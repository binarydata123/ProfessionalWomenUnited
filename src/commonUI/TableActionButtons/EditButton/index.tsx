import ToolTip from '@/commonUI/ToolTip';
import Link from 'next/link';
import React from 'react';
import {PiPencilSimpleLineThin} from 'react-icons/pi';

interface Props {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	Tooltip?: string;
	href?: string;
}

export default function EditButton({onClick, Tooltip = 'View Profile', href}: Props) {
	return (
		<>
			{href && (
				<Link href={href}>
					<button onClick={onClick} className="icon-btn">
						<PiPencilSimpleLineThin />
					</button>
				</Link>
			)}
			<ToolTip title={Tooltip} placement="bottom">
				<button onClick={onClick} className="icon-btn">
					<PiPencilSimpleLineThin />
				</button>
			</ToolTip>
		</>
	);
}
