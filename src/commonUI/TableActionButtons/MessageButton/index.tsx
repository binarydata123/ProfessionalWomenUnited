import ToolTip from '@/commonUI/ToolTip';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	onClick?: () => void;
	Tooltip?: string;
	href?: string;
}

export default function MessageButton({ onClick, Tooltip = 'View Profile', href }: Props) {
	return (
		<>
			{href && (
				<Link href={href}>
					<button onClick={onClick} className="icon-btn">
						<Image src={'/icon/message-icon.png'} width={15} height={15} alt="" />
					</button>
				</Link>
			)}
			<ToolTip title={Tooltip} placement="bottom">
				<button onClick={onClick} className="icon-btn">
					<Image src={'/icon/message-icon.png'} width={15} height={15} alt="" />
				</button>
			</ToolTip>
		</>
	);
}
