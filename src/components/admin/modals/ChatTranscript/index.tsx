import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { formatInquiryDate } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function ChatTranscript(props: any) {
	const chatContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Calculate the height based on the number of items in inquiryData
		const itemHeight = 50; // You can adjust this based on your design
		const itemCount = props.inquiryData ? props.inquiryData.length : 0;
		const totalHeight = itemHeight * itemCount;

		// Set the height of the chat container element
		if (chatContainerRef.current) {
			chatContainerRef.current.style.height = `${totalHeight}px`;

			// Determine whether to add a vertical scrollbar
			if (totalHeight > chatContainerRef.current.clientHeight) {
				chatContainerRef.current.style.overflowY = 'hidden';
				chatContainerRef.current.style.overflowX = 'hidden';
			} else {
				chatContainerRef.current.style.overflowY = 'scroll';
				chatContainerRef.current.style.overflowX = 'hidden';
			}

			// Scroll to the bottom of the chat container
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [props.inquiryData]);

	return (
		<div className="chat-transcript-wrapper" ref={chatContainerRef} id="inquiry_chat">
			{props.inquiryData &&
				props.inquiryData.map((message: any, index: number) => (
					<>
						<div className="row mt-3" key={index}>
							<div className="col-sm-3 text-right">
								<p className="social-link font-small weight-bold ">{message.inquiry_by}:</p>
								<p className="social-link font-xx-small weight-bold ">
									{formatInquiryDate(message.created_at)}
								</p>
							</div>
							<div className="col-sm-9">
								{message.type === 'text' && <p className="mt-2">{message.message}</p>}
								{message.type == 'image' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
											alt="Image Attachment"
											className="attachment-preview"
											width="300px"
										/>
									</a>
								)}
								{message.type == 'pdf' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image src="/icon/pdf.png" alt="pdf-file" width={50} height={50} />
									</a>
								)}
								{message.type == 'video' && (
									<video controls width="320" height="240">
										<source
											src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/videos/${message.message}`}
											type="video/mp4"
										/>
									</video>
								)}

								{message.type == 'doc' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image src="/icon/doc.png" alt="pdf-file" width={50} height={50} />
									</a>
								)}

								{message.type == 'xls' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image src="/icon/excel.png" alt="pdf-file" width={50} height={50} />
									</a>
								)}

								{message.type == 'ppt' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image src="/icon/excel.png" alt="pdf-file" width={70} height={70} />
									</a>
								)}
							</div>
						</div>

						{index !== props.inquiryData.length - 1 && <hr className="hr-line2 mt-4 mb-4" />}
					</>
				))}
		</div>
	);
}
