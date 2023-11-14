import React, { useState, useEffect} from 'react';
import logo from '../../Assets/Road_Sense-removebg-preview.png'
import config from '../../config';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Account from '../Landing/Account';
import './RoomChat/lobby.css';

const Header = () => {
  const [fillScreen, setFillScreen] = useState(false);

  const fillScreenHandler = () => {
    setFillScreen(true);
  };

  useEffect(() => {
    if (fillScreen) {
      const timeout = setTimeout(() => {
        window.location.href = '/report'; // Navigate to "/report" after timeout
        setFillScreen(false);
      }, 1000); // Adjust the timeout duration as needed
      return () => clearTimeout(timeout);
    }
  }, [fillScreen]);

  const [accountDivVisible, setAccountDivVisible] = useState(false);

  const toggleAccountDiv = () => {
    setAccountDivVisible(!accountDivVisible);
  };

  const handleLogout = async() => {
    const response = await fetch( config.apiUrlLogout, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': JSON.parse(localStorage.getItem('email')).email }),
    });
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.logout) {
        localStorage.removeItem('email');
        window.location.href = '/login';
      }
    } else {
    console.error('Can not Logout:', response.status);
    }
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

  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    const generateRandomWord = (length) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      setRandomWord(result);
    };

    generateRandomWord(5);
  }, []);

  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomWord}`;

  return (
    <div>
      <div className='header-lobby'>
          <div className='navBar' >
            <div className='center' >
              <div className='logo'>
                <img className='img1' src={ logo } alt='Logo' />
              </div>
            </div>
            <div className='account' onClick={toggleAccountDiv}>
                <div className='menu-icon' aria-describedby={id} onClick={handleClick} style={{fontSize: 'xx-large', color: 'black'}}>
                  <img src={avatarUrl} height="35"/>
                </div>
                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}>
                    <Typography sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }} >
                        <Account />
                        <Button variant="text" startIcon={<Icon className='account-icon' icon="material-symbols:logout-rounded" />} onClick={handleLogout}>Logout</Button>
                    </Typography>
                </Popover>
            </div>
          </div>
      </div>
      <div className={`fillScreenDiv ${fillScreen ? 'move' : ''}`} onClick={fillScreenHandler}/>
    </div>
  )
}

export default Header