import React, { useState } from 'react'
import logo from '../../Assets/Road_Sense-removebg-preview.png'
import './layout.css'
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  window.addEventListener("load", (event) => {
    if (window.innerWidth > 900){
      setShowMenu(true);
    }
    if (window.innerWidth < 900){
      setShowMenu(false);
    }
  });
  window.addEventListener("resize", (event) => {
    if (window.innerWidth > 900){
      setShowMenu(true);
    }
    if (window.innerWidth < 900){
      setShowMenu(false);
    }
  });

  const [accountDivVisible, setAccountDivVisible] = useState(false);

  const toggleAccountDiv = () => {
    setAccountDivVisible(!accountDivVisible);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener("scroll", (event) => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } 
      if (window.scrollY === 0) {
        setIsScrolled(false);
      }
  });

  const handleLogin = () => {
    window.location.href = './login';
  };

  const handleSignUp = () => {
    window.location.href = './register';
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="landing-nav-bar">
              <div className='logo'>
                  <img className='img1' src={ logo } alt='Logo' />
              </div>
              <div className="landing-navigation">
                {showMenu ? (
                  <div className="landing-nav-items">
                      <i className="uil uil-times landing-nav-close-btn"></i>
                      <Box sx={{ '& > :not(style)': { m: 1 },}}>
                        {/* <a href="#about"><Icon icon="mdi:about-circle-outline" /> <b>About</b></a> */}
                        <a href="#mission"><Icon icon="charm:rocket" /> <b>Mission</b></a>
                        {/* <a href="#working"><Icon icon="fa:gears" /> <b>Working</b></a> */}
                        <a href="#features"><Icon icon="material-symbols:featured-play-list-outline-rounded" /> <b>Features</b></a>
                        <a href="#contact"><Icon icon="ic:round-mail" /> <b>Contact</b></a>
                        <Button variant="outlined" onClick={handleLogin}>Login</Button>
                        <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
                      </Box>
                  </div>) : (
                    <div className="landing-nav-menu">
                      <div className='account' onClick={toggleAccountDiv}>
                        <div>
                          <Button aria-describedby={id} variant="contained" onClick={handleClick} style={{fontSize: 'large'}}>
                          {!accountDivVisible ? (
                            <Icon icon="uis:apps" />
                          ) : (
                            <Icon icon="bi:x-circle" />
                          )}
                          </Button>
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                          >
                            <Typography sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }} >
                                <a href="#mission"><Button variant="text" startIcon={<Icon className='account-icon' icon="charm:rocket" />}>Mission</Button></a>
                                <a href="#features"><Button variant="text" startIcon={<Icon className='account-icon' icon="material-symbols:featured-play-list-outline-rounded" />}>Features</Button></a>
                                <a href="#contact"><Button variant="text" startIcon={<Icon className='account-icon' icon="ic:round-mail"/>}>Contact</Button></a>
                                <Button variant="text" startIcon={<Icon className='account-icon' icon="material-symbols:logout-rounded" />} onClick={handleLogin}>Login</Button>
                                <Button variant="text" startIcon={<Icon className='account-icon' icon="mdi:register" />} onClick={handleSignUp}>Sign Up</Button>
                            </Typography>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
          </div>
      </div>
      {/* <br /><br /><br /><br /> */}
      {/* <div>Hii</div>
      <br /><br /><br /><br />
      <section>
        <br /><br /><br /><br /><br /><br />
        <p>Hii my name is Abhishek</p>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <p>Hii my name is Abhishek</p>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <p>Hii my name is Abhishek</p>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <p>Hii my name is Abhishek</p>
        <br /><br /><br /><br /><br /><br />
      </section> */}
    </div>
  )
}

export default Header