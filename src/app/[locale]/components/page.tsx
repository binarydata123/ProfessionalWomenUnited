import React from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
export default function page() {
	return (
		<div>
			<div className="components-part pt-5 pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<center className="mb-4">
								<h3> Heading Tag </h3>
							</center>
							<p className="font-small-12">Heading-h1</p>
							<h1 className="social-link weight-bold ">Heading 1</h1>
							<p className="mb-4 font-small-12">social-link weight-bold </p>

							<p className="font-small-12">Heading-h2</p>
							<h2 className="social-link weight-bold ">Heading 2</h2>
							<p className="mb-4 font-small-12">social-link weight-bold </p>

							<p className="font-small-12">Heading-h3</p>
							<h3 className="social-link weight-bold ">Heading 3</h3>
							<p className="mb-4 font-small-12">social-link weight-bold </p>

							<p className="font-small-12">Heading-h4</p>
							<h4 className="social-link weight-bold ">Heading 4</h4>
							<p className="mb-4 font-small-12">social-link weight-bold </p>

							<p className="font-small-12">Heading-h5</p>
							<h5 className="social-link weight-bold ">Heading 5</h5>
							<p className="mb-4 font-small-12">social-link weight-bold </p>

							<p className="font-small-12">Heading-h6</p>
							<h6 className="social-link weight-bold ">Heading 6</h6>
							<p className="mb-4 font-small-12">social-link weight-bold </p>
						</div>
						<div className="col-lg-8">
							<center className="mb-4">
								<h3> Text </h3>
							</center>
							<div className="row">
								<div className="col-lg-4">
									<h6>Font size - 20px </h6> <br />
									<p className="font-xl social-link weight-bold ">Body XL Bold</p>
									<p className="font-small-12">font-xl social-link weight-bold</p>
									<br />
									<p className="font-xl social-link weight-semi-bold">Body XL Semi bold</p>
									<p className="font-small-12">font-xl social-link weight-semi-bold</p>
									<br />
									<p className="font-xl social-link weight-medium">Body XL Medium</p>
									<p className="font-small-12">font-xl social-link weight-medium</p>
									<br />
									<p className="font-xl social-link weight-light">Body XL Regular</p>
									<p className="font-small-12">font-xl social-link weight-light</p>
									<br />
								</div>
								<div className="col-lg-4">
									<h6>Font size - 18px </h6>
									<br />
									<p className="font-l social-link weight-bold">Body L Bold</p>
									<p className="font-small-12">font-l social-link weight-bold</p>
									<br />

									<p className="font-l social-link weight-semi-bold">Body L Semi bold</p>
									<p className="font-small-12">font-l social-link weight-semi-bold</p>
									<br />

									<p className="font-l social-link weight-medium">Body L Medium</p>
									<p className="font-small-12">font-l social-link weight-medium</p>
									<br />

									<p className="font-l social-link weight-light">Body L Regular</p>
									<p className="font-small-12">font-l social-link weight-light</p>
									<br />
								</div>
								<div className="col-lg-4">
									<h6>Font size - 16px </h6>
									<br />
									<p className="font-m social-link weight-bold">Body M Bold</p>
									<p className="font-small-12">font-m social-link weight-bold</p>
									<br />

									<p className="font-m social-link weight-semi-bold">Body M Semi bold</p>
									<p className="font-small-12">font-m social-link weight-semi-bold</p>
									<br />

									<p className="font-m social-link weight-medium">Body M Medium</p>
									<p className="font-small-12">font-m social-link weight-medium</p>
									<br />

									<p className="font-m social-link weight-light">Body M Regular</p>
									<p className="font-small-12">font-m social-link weight-light</p>
									<br />
								</div>
								<div className="col-lg-4 mt-5">
									<h6>Font size - 14px </h6>
									<br />
									<p className="font-s social-link weight-bold">Body S Bold</p>
									<p className="font-small-12">font-s social-link weight-bold</p>
									<br />

									<p className="font-s social-link weight-semi-bold">Body S Semi bold</p>
									<p className="font-small-12">font-s social-link weight-semi-bold</p>
									<br />

									<p className="font-s social-link weight-medium">Body S Medium</p>
									<p className="font-small-12">font-s social-link weight-medium</p>
									<br />

									<p className="font-s social-link weight-light">Body S Regular</p>
									<p className="font-small-12">font-s social-link weight-light</p>
									<br />
								</div>
								<div className="col-lg-4  mt-5">
									<h6>Font size - 12px </h6>
									<br />
									<p className="font-xs social-link weight-bold">Body XS Bold</p>
									<p className="font-small-12">font-xs social-link weight-bold</p>
									<br />

									<p className="font-xs social-link weight-semi-bold">Body XS Semi bold</p>
									<p className="font-small-12">font-xs social-link weight-semi-bold</p>
									<br />

									<p className="font-xs social-link weight-medium">Body XS Medium</p>
									<p className="font-small-12">font-xs social-link weight-medium</p>
									<br />

									<p className="font-xs social-link weight-light">Body XS Regular</p>
									<p className="font-small-12">font-xs social-link weight-light</p>
									<br />
								</div>
							</div>
						</div>
					</div>

					<hr />

					<div className="row">
						<div className="col-sm-6">
							<div className="buttons mt-5 ">
								<h3 className="social-link weight-bold text-center">Buttons </h3>
								<br />
								<div className="row">
									<div className="col-sm-4">
										<button className="btn-primary">Button</button>
										<p className="font-small-12 mt-2">btn-primary</p>
										<br />

										<button className="btn-primary-small">Button</button>
										<p className="font-small-12 mt-2">btn-primary-small</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-secondary">Button</button>
										<p className="font-small-12 mt-2">btn-secondary</p>
										<br />

										<button className="btn-secondary-small">Button</button>
										<p className="font-small-12 mt-2">btn-secondary-small</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-tertiary">Button</button>
										<p className="font-small-12 mt-2">btn-tertiary</p>
										<br />
									</div>
								</div>

								<div className="row mt-5">
									<div className="col-sm-4">
										<button className="btn-primary left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-primary left-icon</p>
										<br />
										<button className="btn-primary-small left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-primary-small left-icon</p>
										<br />
										btn-primary right-icon right-border-icon
									</div>
									<div className="col-sm-4">
										<button className="btn-secondary left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-secondary left-icon</p>
										<br />

										<button className="btn-secondary-small left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-secondary-small left-icon</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-tertiary left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-tertiary left-icon</p>
										<br />
									</div>
								</div>

								<div className="row mt-5">
									<div className="col-sm-4">
										<button className="btn-primary right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">btn-primary right-icon right-border-icon</p>
										<br />

										<button className="btn-primary-small right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-primary-small right-icon right-border-icon
										</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-secondary right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">btn-secondary right-icon right-border-icon</p>
										<br />

										<button className="btn-secondary-small right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-secondary-small right-icon right-border-icon
										</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-tertiary right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">btn-tertiary right-icon right-border-icon</p>
										<br />
										<br />

										<button className="btn-tertiary font-small-12 right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-tertiary font-small-12 right-icon right-border-icon
										</p>
										<br />
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="buttons mt-5 ">
								<h3 className="social-link weight-bold text-center">True Buttons </h3>
								<br />
								<div className="row">
									<div className="col-sm-4">
										<button className="btn-primary-true">Button</button>
										<p className="font-small-12 mt-2">btn-primary-true</p>
										<br />

										<button className="btn-primary-small-true">Button</button>
										<p className="font-small-12 mt-2">btn-primary-small-true</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-secondary-true">Button</button>
										<p className="font-small-12 mt-2">btn-secondary-true</p>
										<br />

										<button className="btn-secondary-small-true">Button</button>
										<p className="font-small-12 mt-2">btn-secondary-small-true</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-tertiary-true">Button</button>
										<p className="font-small-12 mt-2">btn-tertiary-true</p>
										<br />
									</div>
								</div>

								<div className="row mt-5">
									<div className="col-sm-4">
										<button className="btn-primary-true left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-primary-true left-icon</p>
										<br />

										<button className="btn-primary-small-true left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-primary-small-true left-icon</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-secondary-true left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-secondary-true left-icon</p>
										<br />

										<button className="btn-secondary-small-true left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-secondary-small-true left-icon</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-tertiary-true left-icon">
											<i className="fa-solid fa-phone"></i> Button
										</button>
										<p className="font-small-12 mt-2">btn-tertiary-true left-icon</p>
										<br />
									</div>
								</div>

								<div className="row mt-5">
									<div className="col-sm-4">
										<button className="btn-primary-true right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-primary-true right-icon right-border-icon
										</p>
										<br />

										<button className="btn-primary-small-true right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-primary-small-true right-icon right-border-icon
										</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-secondary-true right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-secondary-true right-icon right-border-icon
										</p>
										<br />

										<button className="btn-secondary-small-true right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-secondary-small-true right-icon right-border-icon
										</p>
										<br />
									</div>
									<div className="col-sm-4">
										<button className="btn-tertiary-true right-icon right-border-icon">
											{' '}
											Button<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
										<p className="font-small-12 mt-2">
											btn-tertiary-true right-icon right-border-icon
										</p>
										<br />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-sm-12">
							<h3 className="social-link weight-bold text-center">Input Fields</h3>
							<br />
						</div>
						<div className="col-sm-4">
							<div className="fild-form">
								<label>Label</label>
								<input type="text" className="field-des" placeholder="Placeholder" />
							</div>
						</div>

						<div className="col-sm-4">
							<div className="fild-form focused">
								<label>Label</label>
								<input type="text" className="field-des" placeholder="Placeholder" />
							</div>
						</div>

						<div className="col-sm-4">
							<div className="fild-form filled">
								<label>Label</label>
								<input type="text" className="field-des" placeholder="Placeholder" />
							</div>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col-sm-4">
							<div className="fild-form error">
								<label>Label</label>
								<input type="text" className="field-des" placeholder="Placeholder" />
								<p className="error-text">Helper Text</p>
							</div>
						</div>

						<div className="col-sm-4">
							<div className="fild-form success">
								<label>Label</label>
								<input type="text" className="field-des" placeholder="Placeholder" />
								<p className="error-text font-xs  weight-light">success Text</p>
							</div>
						</div>

						<div className="col-sm-4">
							<div className="fild-form disabled">
								<label>Label</label>
								<input type="text" className="field-des" placeholder="Placeholder" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
