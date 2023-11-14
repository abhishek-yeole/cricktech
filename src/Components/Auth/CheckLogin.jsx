import React, {useState, useEffect} from 'react';
import config from '../../config';
import './Auth.css';

const CheckLogin = ({ sendDataToParent, redirect, trueRedirect, loads }) => {
    const [logEmail, setLogEmail] = useState('');
    const [mailSet, setMailSet] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(loads);
  
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const storedEmail = localStorage.getItem('email');
                const emailObject = JSON.parse(storedEmail);
                setLogEmail(emailObject.email);
            } catch (error) {
                localStorage.setItem('email', JSON.stringify({ email: 'Meow' }));
            }

            setMailSet(true);
            if (mailSet) {
                try {
                    const response = await fetch(config.apiUrlLoginCheck, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 'email': logEmail })
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        if (data.login) {
                            const logData = {
                                id: data.id,
                                name: data.name,
                                email: data.email,
                            };
                            setDisplayLoader(false);
                            sendDataToParent(logData);
                            if (!(trueRedirect === '/null')) {
                                window.location.href = trueRedirect;
                            }
                        } else {
                            if (!(redirect === '/null')) {
                                window.location.href = redirect;
                            }
                            setDisplayLoader(false);
                        }
                    } else {
                        console.error('HTTP error:', response.status);
                        if (!(redirect === '/null')) {
                            window.location.href = redirect;
                        }
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    if (!(redirect === '/null')) {
                        window.location.href = redirect;
                    }
                }
            }
        };
        checkLogin();
    }, [mailSet]);  

    return (
        <div>
            {displayLoader && (
                <div className='check-login'>
                    <div className='checker'>
                        <svg className="car" width="102" height="40" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(2 1)" stroke="#002742" fill="none" fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                                <path className="car__body" d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01" strokeWidth="3"/>
                                <ellipse className="car__wheel--left" strokeWidth="3.2" fill="#FFF" cx="83.493" cy="30.25" rx="6.922" ry="6.808"/>
                                <ellipse className="car__wheel--right" strokeWidth="3.2" fill="#FFF" cx="46.511" cy="30.25" rx="6.922" ry="6.808"/>
                                <path className="car__line car__line--top" d="M22.5 16.5H2.475" strokeWidth="3"/>
                                <path className="car__line car__line--middle" d="M20.5 23.5H.4755" strokeWidth="3"/>
                                <path className="car__line car__line--bottom" d="M25.5 9.5h-19" strokeWidth="3"/>
                            </g>
                        </svg><br />
                        <div className='check-text'>Authenticating</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckLogin