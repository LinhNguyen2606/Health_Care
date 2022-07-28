import React from 'react';
import './NotificationEmail.scss';
import ConfirmEMail from '../../assets/images/Confirm email.png';
const NotificationEmail = () => {
    return (
        <div className="active-email">
            <img src={ConfirmEMail} alt="confirm-email" />
            <div className="text">
                <span className="text-register">Register Success!</span>
                <hr />
                <div className="text-check">
                    <span className="text-active">We emailed a confirmation to your email address.</span>
                    <span className="text-check-email">Check your email to activate your email to get started.</span>
                </div>
            </div>
        </div>
    );
};

export default NotificationEmail;
