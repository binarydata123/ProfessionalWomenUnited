'use client';
import React from 'react';
import { Tooltip } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface TooltipProps {
	trigger?: ('click' | 'hover' | 'focus')[];
	title?: any;
	children?: any;
	placement?: 'top' | 'bottom' | 'right' | 'left';
}

export default function ToolTip({ trigger = ['focus'], placement = 'bottom', title, children }: TooltipProps) {
	const renderTooltip = (
		<Popover id="popover-basic shadow-lg">
			<div
				style={{
					color: '#1F1F1F',
					borderRadius: '6px',
					background: '#fff',
					padding: '5px 15px',
					overflow: 'hidden'
				}}
			>
				{title}
			</div>
		</Popover>
	);

	return (
		<OverlayTrigger trigger={trigger} placement={placement} overlay={renderTooltip}>
			{children}
		</OverlayTrigger>
	);
}
