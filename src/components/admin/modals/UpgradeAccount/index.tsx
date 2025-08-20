import React, { useState, useEffect, useContext } from 'react';
import { getLawyerPaymentInfo, updateLawyerPlan } from '../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { formatDateToDDMMYYYY } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
	plan: string;
}

export default function UpgradeAccount(props: any) {
	const { user } = useContext(AuthContext)
	const lawyerid = props.lawyerId;
	const slug = props.lawyerSlug;

	const [payment_details, setPaymentDetails] = useState<any>({});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [formData, setFormData] = useState<FormData>({
		plan: ''
	});
	const [user_id, setUserId] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		fetchLawyerPaymentInfo(user?.id, lawyerid);
	}, []);

	const fetchLawyerPaymentInfo = async (userId: any, lawyerid: string) => {
		try {
			const res = await getLawyerPaymentInfo(userId, lawyerid);
			if (res.status == true) {
				setPaymentDetails(res.data);
				setFormData({
					...formData,
					plan: res.data.plan_type
				});
			} else {
				setPaymentDetails('');
			}
		} catch (err) {
			console.log(err);
		}
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.plan) {
			newErrors.plan = 'Please choose a plan';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				lawyer_id: lawyerid,
				user_id: user_id,
				plan: formData.plan
			};
			updateLawyerPlan(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						fetchLawyerPaymentInfo(user_id, lawyerid);
					} else {
						toast.error(res.message);
					}
				})
				.catch(err => {
					if (err.response) {
						toast.error('An error occurred during registration');
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}

	return (
		<div className="upgrade-account-wrapper">
			<div className="row">
				<div className="col-sm-8">
					<h5 className="modal-title f-22 weight-bold  green-dark">How would you like to upgrade account?</h5>
				</div>
				<div className="col-sm-4 text-right">
					<p>
						<a
							className="boysenberry font-small weight-semi-bold "
							target="_blank"
							href={`/find-a-professional/${slug}`} rel="noreferrer"
						>
							View Public Profile <i className="fa-solid fa-angle-right box-right icon-size-10"></i>
						</a>
					</p>
				</div>
			</div>

			{payment_details.start_date && payment_details.end_date ? (
				<div className="row">
					<div className="col-sm-5">
						<p className="weight-medium font-medium green-medium-2 mt-3">Start</p>
						<p className="weight-light font-small color-light">
							{formatDateToDDMMYYYY(payment_details.start_date)}
						</p>
					</div>
					<div className="col-sm-5">
						<p className="weight-medium font-medium green-medium-2 mt-3">Expiry</p>
						<p className="weight-light font-small color-light">
							{formatDateToDDMMYYYY(payment_details.end_date)}
						</p>
					</div>
				</div>
			) : (
				<p className="modal-title f-18 weight-bold mt-2 green-dark">No Plan Purchased By Laywer</p>
			)}

			<div className="row">
				<div className="col-sm-4">
					<form onSubmit={handleSubmit}>
						<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Choose Type</label>
						<select
							className="form-fild  w-100"
							value={formData.plan}
							onChange={e => setFormData({ ...formData, plan: e.target.value })}
						>
							<option value="">Choose Plan Type</option>
							<option value={'monthly'}>Monthly Plan</option>
							<option value={'quarterly'}>Quarterly Plan</option>
						</select>
						{errors.plan && <small className="error-message text-danger d-block">{errors.plan}</small>}
						<button
							type="submit"
							className="btn btn-outline-success text-center float-end btn-lawyer mt-3 w-100"
							disabled={isLoading}
						>
							{!isLoading ? 'Upgrade' : 'Please wait...'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
