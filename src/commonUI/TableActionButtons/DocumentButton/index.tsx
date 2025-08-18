import ToolTip from '@/commonUI/ToolTip';
import {DocumentTextIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';

interface Props {
	onClick?: () => void;
	Tooltip?: string;
	href?: string;
}

export default function DocumentButton({onClick, Tooltip = 'View Profile', href}: Props) {
	return (
		<>
			{href && (
				<Link href={href}>
					<button onClick={onClick} className="icon-btn">
						<DocumentTextIcon width={16} />
					</button>
				</Link>
			)}
			<ToolTip title={Tooltip} placement="bottom">
				<button onClick={onClick} className="icon-btn">
					<DocumentTextIcon width={16} />
				</button>
			</ToolTip>
		</>
	);
}
