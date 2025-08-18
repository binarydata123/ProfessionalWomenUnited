'use client';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './popup.css';
import { usePathname } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

interface Props {
	title?: string;
	className?: string;
	okButtonClass?: string;
	okText?: string;
	closeText?: string;
	footer?: boolean;
	show?: boolean;
	onOk?: () => void;
	onCancel?: () => void;
	width?: number;
	size?: 'sm' | 'lg' | 'xl';
	children?: React.ReactNode;
}

export default function Popup({
	title,
	className,
	okButtonClass,
	okText = 'Save',
	closeText = 'Close',
	size = 'lg',
	footer = true,
	show,
	onCancel,
	onOk,
	width = 340,
	children,
	...props
}: Props) {
	const { user } = useContext(AuthContext)
	const [user_role, setUserRole] = useState('');
	const pathname = usePathname();

	useEffect(() => {
		if (user)
			user?.role ? setUserRole(user?.role) : setUserRole('');
	}, []);

	return (
		<div className={`modal-wrapper ${className} ${size === 'sm' ? 'modal-sm' : ''}`}>
			<Modal
				show={show}
				className={className}
				onHide={onCancel}
				aria-labelledby="contained-modal-title-vcenter"
				centered={true}
				size={size}
				{...props}
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				{footer && (
					<Modal.Footer>
						{/* <Button className='modal-cancel-button' onClick={onCancel}>Close</Button >  */}
						{user_role == 'enduser' && pathname.includes('/user/messages') ? (
							<Button className={`${okButtonClass} modal-ok-button`} onClick={onOk}>
								{okText}
							</Button>
						) : (
							<></>
						)}
					</Modal.Footer>
				)}
			</Modal>
		</div>
	);
}
