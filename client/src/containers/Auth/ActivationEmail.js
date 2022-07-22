import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { activationForEmail } from '../../services/userService';

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await activationForEmail({ activation_token });
                    setSuccess(res.message);
                } catch (err) {
                    err.response.data.message && setErr(err.response.data.message);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    );
}

export default ActivationEmail;
