import Image from 'next/image'
import React from 'react'

export default function NotFound() {
    return (
        <section>
            <div className="container">
                <div className="text-center">
                    <div className="empty-text">
                        <Image src="/images/contact/bro.png" alt="Return to Homepage" width={290} height={220} />
                        <h2>Oops! You've reached a Legal Dead End.</h2>
                        <p>
                            We apologize, but the page you're looking for seems to have taken an extended recess. It
                            may have been moved, deleted, or never existed in the first place. Double-check the URL
                            or navigate back to our homepage to find the Professional Information you need.
                        </p>
                        <button className="btn-commn">Return to Homepage</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
