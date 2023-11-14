import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './layout.css';
import CheckLogin from '../Auth/CheckLogin';

const Account = () => {

    const getWidth = () => {
		if (window.innerWidth <= 768) {
			return '90%';
		} else {
			return '30%';
		}
	};

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: getWidth(),
        height: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            generate();
        }, 10);
    }
    const handleClose = () => setOpen(false);

    function generate() {
        var uname= logData.name;
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bcgColor = "rgb(" + x + "," + y + "," + z + ")";
        var textColor= "white";
        const myNames = uname.split(" ");
        const initials = myNames.shift().charAt(0) + myNames.pop().charAt(0);
        const nameInitials =initials.toUpperCase();
        
        document.getElementById("avatar").src = generateAvatar(
            nameInitials,
            textColor,
            bcgColor
        );
    }

    function generateAvatar(
        text,
        foregroundColor = "white",
        backgroundColor = "black"
    ) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
    
        canvas.width = 200;
        canvas.height = 200;
    
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        context.font = "bold 100px Assistant";
        context.fillStyle = foregroundColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 2 );
        return canvas.toDataURL("image/png");
    }

    const [logData, setLogData] = useState({});

    const receiveDataFromChild = (data) => {
      setLogData(data);
    };

    return (
        <div>
            <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} loads={false} />
            <Button variant="text" startIcon={<Icon className='account-icon' icon="material-symbols:account-box" />} onClick={handleOpen}>Account</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Account Details
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box sx={{'& > :not(style)': { m: 1,p: 0.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', },}}>
                        <div id="avatarDiv" style={{ borderRadius: '50%', overflow: 'clip', width: '200px', height: '200px', margin: '10px auto', padding: '0px', }}>
                            <img alt="Avatar" id="avatar" style={{width: '200px', height: '200px'}}/>
                        </div>
                        <Box sx={{'& > :not(style)': { m: 0, height: '100%', display: 'flex', flexDirection: 'row' },}}>
                            <Box sx={{ '& > :not(style)': { m: 0.5, p: 0.5 }, display: 'flex', flexDirection: 'column' }}>
                                <Icon icon="wpf:name" style={{fontSize: '24px'}}/>
                                <div className='account-text'>{logData.name}</div>
                            </Box>
                            <Box sx={{ '& > :not(style)': { m: 0.5, p: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="octicon:mail-16" style={{fontSize: '32px'}}/>
                                <div className='account-text'>{logData.email}</div>
                            </Box>
                        </Box>
                    </Box>
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Account