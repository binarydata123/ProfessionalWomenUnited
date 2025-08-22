"use client"
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

function ChooseProfile() {

    const handleRoleSelection = (selectedRole: any) => {
        window.sessionStorage.setItem('temp_user_role', selectedRole);
    };

    return (
        <>
            <div className="are-loking">
                <Link href="/auth/create-profile" onClick={() => handleRoleSelection('professional')}>
                    <h4>Are you a professional woman?</h4>
                    <p>Get recognized in your city and grow your network.</p>
                    <div className="d-flex align-items-center gap-2">
                        <span className="same-color-sign">Sign Up Now</span>
                        <span className="~border-radius-1 banner-arrow-btn Sign-btn">
                            <ChevronRightIcon width={20} color={'#BE8363'} />
                        </span>
                    </div>
                </Link>
            </div>

            <div className="are-loking">
                <Link href="/auth/create-profile" onClick={() => handleRoleSelection('enduser')}>
                    <h4>Looking for top professionals?</h4>
                    <p>Connect with award-winning women in your area.</p>
                    <div className="d-flex align-items-center gap-2">
                        <span className="same-color-sign">Sign Up Now</span>
                        <span className="border-radius-1 banner-arrow-btn Sign-btn">
                            <ChevronRightIcon width={20} color={'#BE8363'} />
                        </span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default ChooseProfile;