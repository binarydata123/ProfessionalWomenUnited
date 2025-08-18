import React from 'react';
import './style.css';
import Link from 'next/link';

interface FAQItem {
	id: number;
	service_id: number;
	question: string;
	answer: string;
	status: string;
	created_by: number;
	created_at: string;
	updated_by: number | null;
	updated_at: string | null;
	deleted_by: number | null;
	deleted_at: string | null;
}

interface GotQuestionsProps {
	data: FAQItem[];
}

export default function GotQuestions({data}: GotQuestionsProps) {
	// console.log(data);
	return (
		<>
			<section className="gotQuestions">
				<section className="">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-xl-7 col-md-12">
								<div className="gotTitle">
									<p className="font-x-small green-medium-2 weight-bold mb-2">FAQs</p>
									<h2 className="font-smaller  weight-bold mb-4">
										Got Questions? <br />
										<span className="green-medium-2"> We have answers.</span>
									</h2>
								</div>
								<div className="gotAccordion">
									<div className="accordion mt-5" id="accordionExample">
										{data.map((item, index) => (
											<div className="accordion-item" key={index}>
												<h2 className="accordion-header" id={`heading${index + 1}`}>
													<button
														className={`accordion-button text-white ${
															index === 0 ? '' : 'collapsed'
														}`}
														type="button"
														data-bs-toggle="collapse"
														data-bs-target={`#collapse${index + 1}`}
														aria-expanded={index === 0}
														aria-controls={`collapse${index + 1}`}>
														{item.question}
													</button>
												</h2>
												<div
													id={`collapse${index + 1}`}
													className={`accordion-collapse collapse ${
														index === 0 ? 'show' : ''
													}`}
													aria-labelledby={`heading${index + 1}`}
													data-bs-parent="#accordionExample">
													<div>
														<div
															className="accordion-body border-0 text-white"
															dangerouslySetInnerHTML={{__html: item?.answer ?? ''}}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-xl-5 col-md-12">
								<img src="/images/layer.png" alt="faq-img" className="mt-5 m-none effect" />
							</div>
						</div>
					</div>
				</section>
			</section>
		</>
	);
}
