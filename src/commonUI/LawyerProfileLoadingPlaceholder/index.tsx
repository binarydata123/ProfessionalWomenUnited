import React from 'react';
import { Placeholder } from 'react-bootstrap';
export default function LawyerProfileLoadingPlaceholder() {
	return (
		<>
			<div className="profile-data data-same">
				<div className="row">
					<div className="col-md-2 col-3">
						<div className="profile-user">
							<div
								className="mb-2 d-none d-sm-block"
								style={{
									borderRadius: '16px',
									backgroundColor: '#c4907352',
									height: `180px`,
									width: `180px`,
									opacity: '0.5',
									marginBottom: '25px'
								}}
							></div>
							<div
								className="mb-2 d-block d-sm-none"
								style={{
									borderRadius: '6px',
									backgroundColor: '#c4907352',
									height: `60px`,
									width: `60px`,
									opacity: '0.5',
									marginBottom: '25px'
								}}
							></div>
						</div>
					</div>
					<div className="col-md-10 col-9">
						<div className="row">
							<div className="col-6">
								<div className="data-profile-user">
									<h3 className="d-none d-dm-block">
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `40px`,
												width: `300px`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</h3>
									<h3 className="d-block d-dm-none">
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `40px`,
												width: `100%`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</h3>
								</div>
							</div>
							<div className="col-6 text-end">
								<div className="data-profile-user">
									<div className="mt-3">
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `20px`,
												width: `20px`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-8">
								<div className="company-detail">
									<p>
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `20px`,
												width: `150px`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</p>

									<p>
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `20px`,
												width: `100px`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</p>
									<div className="atypebtn mt-2">
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `20px`,
												width: `200px`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</div>

									<div className="atypebtn mt-2">
										<Placeholder
											style={{
												backgroundColor: '#c4907352',
												height: `40px`,
												width: `400px`,
												opacity: '0.5',
												marginBottom: ''
											}}
										/>
									</div>
								</div>
							</div>
							<div className="col-lg-4 text-end pt-3 d-none d-lg-block mt-2">
								<div className="company-detail-btn">
									<Placeholder
										style={{
											backgroundColor: '#c4907352',
											height: `45px`,
											width: `200px`,
											opacity: '0.5',
											marginBottom: '',
											borderRadius: '4px'
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4 text-end pt-3 d-block d-lg-none">
					<div className="company-detail-btn">
						<Placeholder
							style={{
								backgroundColor: '#c4907352',
								height: `45px`,
								width: `100%`,
								opacity: '0.5',
								marginBottom: '',
								borderRadius: '4px'
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
