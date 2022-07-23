import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { activationForEmail } from '../../services/userService';
import { useHistory } from 'react-router-dom';
function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await activationForEmail({ activation_token });
                    setSuccess(res.message);
                    history.push('/login');
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg);
                }
            };
            activationEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activation_token]);

    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    );
}

export default ActivationEmail;
