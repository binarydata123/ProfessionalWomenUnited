import React from 'react';
import Link from 'next/link';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';


export default function LawyerSection({ lawyers }: any) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 homeSlider">
                    {lawyers.length > 0 && (
                        <Slider
                            nav={false}
                            loop={true}
                            dots={true}
                            className="mt-1"
                            items={4}
                            responsive={{
                                0: {
                                    items: 1
                                },
                                600: {
                                    items: 2
                                },
                                768: {
                                    items: 2
                                },
                                991: {
                                    items: 3
                                },
                                1200: {
                                    items: 3
                                },
                                1366: {
                                    items: 4
                                },
                                1440: {
                                    items: 4
                                },
                                1500: {
                                    items: 4
                                }
                            }}>
                            {lawyers.map((lawyer: any, index: number) => (
                                <LawyerCard ShowLoader={false} lawyer={lawyer} Key={index} showLocation={false} />
                            ))}
                        </Slider>
                    )}
                    <div className="text-end all-btn">
                        <Link href="/find-a-lawyer">
                            <button>View All</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
