'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { getSingleSupporDetailsByAdmin, supportTicketReplyByAdmin } from '../../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import Email from 'next-auth/providers/email';

interface FormData {
	message: string;
}

export default function Page({ params }: { params: { id: string } }) {
	const { user } = useContext(AuthContext)
	const router = useRouter();
	const [user_id, setUserId] = useState('');
	const [email, setEmail] = useState('');
	const [support_ticket, setSupportTicket] = useState<any>({});
	const [support_ticket_response, setSupportTicketResponse] = useState<any>({});

	const [formData, setFormData] = useState<FormData>({
		message: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');

		fetchSingleSupportTicketData(user?.id, params.id);
	}, []);

	const fetchSingleSupportTicketData = async (userId: any, SupportId: string) => {
		try {
			const res = await getSingleSupporDetailsByAdmin(userId, SupportId);
			if (res.status == true) {
				setSupportTicket(res.supportTicket);

				setSupportTicketResponse(res.supportticketresponse);
				console.log(res.supportticketresponse);

			} else {
			}
		} catch (err) {
			console.log(err);
		}
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.message) {
			newErrors.message = 'Reply message is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const clickedButton = event.currentTarget.querySelector('button[type="submit"]:focus');
		const buttonValue = clickedButton?.getAttribute('data-action');

		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				support_ticket_id: support_ticket.id,
				member_id: support_ticket.member_id,
				user_id: user_id,
				message: formData.message,
				type: buttonValue,
				email: support_ticket.email
			};

			supportTicketReplyByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						setTimeout(() => {
							router.push('/admin/support');
						}, 1000);
					}
				})
				.catch(err => {
					toast.error('An error occurred during registration');
				});
		} else {
			setIsLoading(false);
		}
	}

	return (
		<div>
			<div className="row">
				<div className="col-sm-7">
					<button className="btn-tertiary left-icon mt-3 mb-3">
						<Link href={`/admin/support`} style={{ color: '#000' }}>
							{' '}
							<i className="fa-solid fa-arrow-left-long" style={{ color: '#000' }}></i> Back
						</Link>
					</button>

					<div className="form-fild-des">
						<div className="row mt-2">
							<div className="col-sm-12">
								<p className="text-sonic-silver weight-medium font-small mb-2" >I’m a*</p>
							</div>
							<div className="col-lg-2 col-md-3">
								<label className="social-link font-small weight-medium w-100 mt-2">
									<input type="checkbox" checked={support_ticket.member_type == 'professional'} disabled />
									<span className="checkmark"></span>Professional
								</label>
							</div>
							<div className="col-lg-2 col-md-3">
								<label className="social-link font-small weight-medium w-100 mt-2">
									<input
										type="checkbox"
										checked={support_ticket.member_type == 'individual'}
										disabled
									/>
									<span className="checkmark"></span>Individual
								</label>
							</div>
						</div>
					</div>

					<div className="form-fild-des">
						<p className="text-sonic-silver weight-medium font-small ">Full Name</p>
					</div>

					<div className="form-fild-des">
						<input
							placeholder="User Name"
							className="form-fild mb-4 w-100 bg-f2f2f2"
							disabled
							value={support_ticket.name}
						/>
					</div>

					<div className="form-fild-des">
						<p className="text-sonic-silver weight-medium font-small ">Email*</p>
						<input
							placeholder="emailid@email.com"
							className="form-fild mb-4 w-100 bg-f2f2f2"
							disabled
							value={support_ticket.email}
						/>
					</div>

					<label className="social-link font-small weight-medium w-100 mt-2">Your Message</label>
					<textarea className="form-fild bg-f2f2f2 w-100 h-129 " disabled value={support_ticket.message}>
						{' '}
					</textarea>

					<h5 className="font-large weight-medium social-link mt-4">Registered</h5>
					<h5 className="font-large weight-medium social-link mt-2">
						{support_ticket.member_id ? 'Yes' : 'No'}
					</h5>
				</div>
				<form onSubmit={handleSubmit}>
					<label className="social-link font-small weight-medium w-100 mt-2">Reply </label>

					<textarea
						className={`form-fild w-50 h-129 ${support_ticket_response != null ? 'bg-f2f2f2' : ''}`}
						placeholder="Let us know how we can help you... "
						disabled={support_ticket_response != null}
						value={support_ticket_response?.message}
						onChange={e => setFormData({ ...formData, message: e.target.value })}
					></textarea>

					{errors.message && (
						<small className="error-message text-danger mb-2 d-block">{errors.message}</small>
					)}

					{support_ticket_response == null && (
						<div className="text-right">
							{/* <button className="btn-tertiary mr-1">Delete</button> */}
							{support_ticket.member_id && (
								<button
									type="submit"
									data-action="internal"
									className="btn-secondary mr-1 mb-2"
									disabled={isLoading}
								>
									Reply Internal
								</button>
							)}

							<button
								type="submit"
								data-action="mail"
								className="btn-primary mt-1 mb-2"
								disabled={isLoading}
							>
								Reply via Email
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
