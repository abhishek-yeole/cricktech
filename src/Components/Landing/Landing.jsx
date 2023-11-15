import React, {useEffect, useState} from 'react'
import Header from './Header';
import Spline from '@splinetool/react-spline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import './layout.css';
import mission from '../../Assets/land_mission.svg';
import working from '../../Assets/working_back.png';
import config from '../../config';
import Loader from './Loader';

const Landing = () => {
    const [bgImage, setBgImage] = useState(false);
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [sumbittedFeed, setSumbittedFeed] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }   
    }, []);

    const handleStart = () => {
        window.location.href = './login';
    }

    const handleGit = () => {
        window.location.href = './login';
    }

    const handleSubmit = async() => {
        try {
            const response = await fetch( config.apiUrlFeedback, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, feedback }),
            });
        
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    console.log(data);
                    setSumbittedFeed(true);
                } else {
                    console.error('Login failed:', data.message);
                }
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className='Landing'>
            <Loader time='5000'/>
            <Header />
            {!bgImage ? (
                <div className='back-3d' id='about'>
                    <Spline scene="https://prod.spline.design/8G080ynbVIYcseOu/scene.splinecode" style={{width: '100vw', height: '100vh'}} />
                </div>
            ) : (
                <div className='back-3d-mobile' id='about'>
                    <Spline scene="https://prod.spline.design/BQzEex-2-VaZqKI3/scene.splinecode" style={{width: '100vw', height: '100vh'}} />
                </div>
            )}
            {!bgImage ? (
                <div className='intro' onClick={handleStart}>
                    <div className='intro-controls'></div>
                </div>
            ) : (
                <div><br /><br /><br /><br />
                    <div className='intro-mobile'>
                        <div className='intro-mega1'>CrickTech</div>
                        <div className='intro-mega2'>Revolutionizing Your Cricket Experience</div><br />
                        <div className='intro-mini'>Welcome to CrickTech, where innovation meets cricket fandom. Immerse yourself in the thrilling world of cricket like never before.</div><br />
                        <div className='intro-controls'><Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleStart}><p style={{fontWeight: 'bolder'}}>Get Started</p></Button></div>
                    </div>
                </div>
            )}


            <div className='spacer' id='mission'></div>

            <div className='mission' >
                <img className='mission-image' src={mission} alt="Mission" />
                <div className='mission-content'>
                    <div className='mission-header'>Our Mission</div>
                    <div className='mission-text'>At CrickTech, our mission is to redefine the way cricket enthusiasts engage with the sport. We strive to enhance your cricket experience through state-of-the-art technology, providing a platform that caters to both casual fans and die-hard enthusiasts.</div>
                </div>
            </div>

            <div className='spacer' id='working'></div>

            <div className='working'>
                <div className='working-content'>
                    <div className='working-header'>How does it Works?</div>
                    <div className='working-text'>Explore the magic behind CrickTech in three simple steps: Sign Up: Create your personalized account and join a vibrant community of cricket enthusiasts. Dive In: Immerse yourself in live streaming chatrooms, real-time match updates, and predictive analysis. Experience Cricket Like Never Before: Engage, predict, and celebrate the game with fellow fans.</div>
                </div>
                <img style={{width: '350px'}} src={working} alt="Working" />
            </div>

            <div className='spacer' id='features'></div>

            <div className='features'>
                <h1 style={{textIndent: '100px'}}>Features</h1><br />
                <div className="flex-container">
                    <div className="flex-item1">
                        <div className="marker">
                            <div className="ribbon">
                                <span>1</span>
                            </div>
                        </div>
                        <h2><b>Chatrooms (Public and Private) with Live Streaming</b></h2><br />
                        <span>Join the conversation in our dynamic chatrooms, where cricket fans unite. Discuss live matches, share insights, and enjoy the thrill together. With live streaming integrated, the action is just a click away.</span>
                    </div>
                    <div className="flex-item2"><div className="numbers"><h3>1</h3></div></div>
                </div>

                <div className="flex-container">
                    <div className="flex-item3"><div className="flex-item2"><div className="numbers"><h3>2</h3></div></div></div>
                    <div className="flex-item4">
                        <div className="marker">
                            <div className="ribbon">
                                <span>2</span>
                            </div>
                        </div>
                        <h2><b>Score Predictor for T20 and ICC Matches</b></h2><br />
                        <span>Test your cricket instincts with our Score Predictor feature. Predict the outcomes of T20 and ICC matches, challenge your friends, and climb the leaderboard. The excitement of the game is now in your hands.</span>
                    </div>
                </div>

                <div className="flex-container">
                    <div className="flex-item5">
                        <div className="marker">
                            <div className="ribbon">
                                <span>3</span>
                            </div>
                        </div>
                        <h2><b>Player Performance Analysis</b></h2><br />
                        <span>Dive into in-depth player performance analysis, stats, and insights. CrickTech provides a comprehensive view of player achievements, allowing you to appreciate the skills that shape the game.</span>
                    </div>
                    <div className="flex-item6"><div className="flex-item2"><div className="numbers"><h3>3</h3></div></div></div>
                </div>

                <div className="flex-container">
                    <div className="flex-item7"><div className="flex-item2"><div className="numbers"><h3>4</h3></div></div></div>
                    <div className="flex-item8">
                        <div className="marker">
                            <div className="ribbon">
                                <span>4</span>
                            </div>
                        </div>
                        <h2><b>Matches Info</b></h2><br />
                        <span>Stay informed with up-to-the-minute match information. From schedules to results, CrickTech keeps you in the loop, ensuring you never miss a crucial moment. Explore fixtures, track scores, and relish the magic of cricket unfolding in real-time.</span>
                    </div>
                </div>
            </div>
            
            <div className='end-spacer' id='contact'></div>

            <div className='end-intro'>
                <div className='end-left'>
                    <div className='left-header'>Join the CrickTech Community</div>
                    <div className='left-content'>Join CrickTech today and elevate your cricket fandom to new heights. The game is on, and so are you!</div>
                    <Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleGit}><p style={{fontWeight: 'bolder'}}>Github </p></Button><br />
                    <div className='left-header'>Get Started Today</div>
                    <div className='left-content'>Join CrickTech today and elevate your cricket fandom to new heights. The game is on, and so are you!</div>
                    <Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleStart}><p style={{fontWeight: 'bolder'}}>Sign Up Now !</p></Button>
                </div>
                <div className='end-right'>
                    <div className='right-header'>Contact Us</div>
                    <div className='right-content'>Have questions or need assistance? Our support team is here to help!!</div>
                    <div className='contact-form'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, display: 'flex', flexDirection: 'row', width: '90%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }, }} noValidate autoComplete="off">
                            <TextField id="filled-multiline-static" label="Email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} disabled={sumbittedFeed}/>
                            <TextField id="filled-multiline-static2" label="Message" multiline rows={4} fullWidth variant="filled" value={feedback} onChange={(e) => setFeedback(e.target.value)} disabled= {sumbittedFeed}/>
                        </Box>
                        {sumbittedFeed ? (
                            <div className='form-submit'><Button variant="contained" color='success' endIcon={<Icon icon="fluent:mail-checkmark-24-filled" />}><p style={{fontWeight: 'bolder'}} >SENT</p></Button><br />
                            <b><i>WE WILL REACH OUT TO YOU SOON!!!</i></b></div>
                        ) : (
                            <div className='form-submit'><Button variant="contained" endIcon={<Icon icon="ic:round-mail" />} onClick={handleSubmit}><p style={{fontWeight: 'bolder'}} >SEND</p></Button></div>
                        )}
                    </div>
                </div>
            </div>

            <div className='spacer' id='features'></div>
        </div>
    )
}

export default Landing