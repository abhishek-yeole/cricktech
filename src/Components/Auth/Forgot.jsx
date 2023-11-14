import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../Landing/Header';
import { Icon } from '@iconify/react';
import Spline from '@splinetool/react-spline';
import config from '../../config';
import './Auth.css';

const Forgot = () => {
    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setshowOTP] = useState(false);
	const [displayReset, setDisplayReset] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [errorText, setErrorText] = useState('');

	const handleSubmit = async () => {
        if (username) {
			setDisplayLoader(true);
			try {
				const response = await fetch(config.apiUrlForgot, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						formName: 'submit',
						username,
					}),
				});
			
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					if (data.success) {
						setshowOTP(true);
						setDisplayError(false);
						setDisplayLoader(false);
					} else {
						setDisplayLoader(false);
						setDisplayError(true);
						setErrorText('Invalid Credentials. Please check !!');
					}
				} else {
					setDisplayError(true);
					setDisplayLoader(false);
					setErrorText('Cannot connect to server right now !!');
				}
			} catch (error) {
				setDisplayLoader(false);
				setDisplayError(true);
				setErrorText('We are experiencing heavy traffic !!');
			}
		} else {
			setDisplayLoader(false);
            setDisplayError(true);
            setErrorText('Please fill in all required fields.');
		}
	};

	const handleOtpSubmit = async (event) => {
		if (username && otp) {
			setDisplayLoader(true);
			try {
				const response = await fetch(config.apiUrlVerifyForgot, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						formName: 'forgot',
						username,
						otp,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					if (data.success) {
						setDisplayReset(true);
						setDisplayError(false);
						setDisplayLoader(false);
					} else {
						setDisplayLoader(false);
                        setDisplayError(true);
                        setErrorText('Invalid Credentials. Please check !!');
					}
				} else {
					setDisplayError(true);
                    setDisplayLoader(false);
                    setErrorText('Cannot connect to server right now !!');
				}
			} catch (error) {
				setDisplayLoader(false);
                setDisplayError(true);
                setErrorText('We are experiencing heavy traffic !!');
			}
		} else {
			setDisplayLoader(false);
            setDisplayError(true);
            setErrorText('Please fill in all required fields.');
		}
    };

	const handleResetSubmit = async () => {
		if (username && password) {
			setDisplayLoader(true);
			try {
				const response = await fetch(config.apiUrlReset, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						formName: 'reset',
						username,
						password,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					if (data.success) {
						window.location.href = '/login';
					} else {
						setDisplayLoader(false);
						setDisplayError(true);
						setErrorText('Invalid OTP. Please check !!');
					}
				} else {
					setDisplayError(true);
					setDisplayLoader(false);
					setErrorText('Cannot connect to server right now !!');
				}
			} catch (error) {
				setDisplayLoader(false);
				setDisplayError(true);
				setErrorText('We are experiencing heavy traffic !!');
			}
		} else {
			setDisplayLoader(false);
            setDisplayError(true);
            setErrorText('Please fill in all required fields.');
		}
	};

	const [bgImage, setBgImage] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }
    }, []);

	return (
		<div>
			<Header />
			<br /><br /><br /><br />
            {bgImage ? (
                <div className='background' id='about'>
                    <Spline scene="https://prod.spline.design/BQzEex-2-VaZqKI3/scene.splinecode" style={{width: '100vw', height: '100vh'}} />
                </div>
            ) : (
                <div className='background' id='about'>
                    <Spline scene="https://prod.spline.design/BQzEex-2-VaZqKI3/scene.splinecode" style={{width: '100%', height: '100%'}} />
                </div>
            )}
			
			<div className='forgot-container'>
				<h2>Reset Password</h2>
				<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '30ch' },
					display: 'flex', alignItems: 'center', flexDirection: 'column',
				}}
				noValidate
				autoComplete="off"
				>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
						<Icon icon="line-md:email" style={{fontSize: '32px'}}/>
						<TextField id="outlined-basic" label="Email" variant="outlined" type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
					</Box>
					{displayError && (
						<div style={{textAlign: 'center', color: 'red', fontWeight: '500'}}><p>{errorText}</p></div>
					)}
					<Button variant="contained" type="button" onClick={handleSubmit}>Submit</Button>
				</Box>
			</div>
			{showOTP && (
                <div className="fullscreen-overlay">
					{!displayReset ? (
						<div className='otp-container'>
							<div className='otp-control'><h2>Enter OTP</h2><div className='icon' onClick={() => {setshowOTP(false);}}><Icon icon="maki:cross" /></div></div>
							<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', alignItems: 'center' }}>
								<Icon icon="teenyicons:otp-outline" style={{fontSize: '32px'}}/>
								<TextField id="outlined-basic" label="OTP" variant="outlined" type='text' value={otp} onChange={(e) => setOtp(e.target.value)} required/>
							</Box>
							{displayError && (
								<div style={{textAlign: 'center', color: 'red', fontWeight: '500'}}><p>{errorText}</p></div>
							)}
							<Button variant="contained" type="button" onClick={handleOtpSubmit}>Submit OTP</Button>
							<Button onClick={handleSubmit} style={{ cursor: 'pointer' }}>Resend OTP?</Button>
						</div>
					) : (
						<div className='otp-container'>
							<div className='otp-control'><h2>Reset Password</h2><div className='icon' onClick={() => {setshowOTP(false);}}><Icon icon="maki:cross" /></div></div>
							<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', alignItems: 'center' }}>
								<Icon icon="ic:baseline-password" style={{fontSize: '32px'}}/>
								<TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
							</Box>
							{displayError && (
								<div style={{textAlign: 'center', color: 'red', fontWeight: '500'}}><p>{errorText}</p></div>
							)}
							<Button variant="contained" type="button" onClick={handleResetSubmit}>Submit OTP</Button>
						</div>
					)}
				</div>
            )}
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

export default Forgot