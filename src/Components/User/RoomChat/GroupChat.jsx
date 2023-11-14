import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './room.css';
import { Icon } from '@iconify/react';
import config from '../../../config';
import CheckLogin from '../../Auth/CheckLogin';

const GroupChat = () => {
    const [groupText, setGroupText] = useState(null);
    const [playerName, setPlayerName] = useState(null);
    const [chatData, setChatData] = useState([]);
    const [sentButton, setSentButton] = useState(true);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch( config.apiUrlHandleGroupChat, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    if (data.success) {
                        setChatData(data.chats);
                        setSentButton(true);
                    }
                    else {
                        console.log("failed");
                    }
                }
                else {
                    console.log('failed');
                }
            } catch (error) {
                console.error(error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleChatInput = async() => {
        if (groupText !== null) {
            try {
                const response = await fetch( config.apiUrlHandleGroupChat, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'text': groupText, 'playerName': playerName })
                });
                const data = await response.json();
                if (response.ok) {
                    if (data.success) {
                        setGroupText('');
                        setSentButton(false);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const receiveDataFromChild = (data) => {
        setPlayerName(data.name);
    };
    
    return (
        <div className='group-chat'>
            <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} />
            <div className='chating' style={{height: '100%'}}>
                <div className='chat-view'>
                    {chatData.map(chat => (
                        <div className='single-chat' style={{ float: `${chat.id === playerName ? ('right') : ('left')}`, borderRadius: `${chat.id === playerName ? ('6px 0px 6px 6px') : ('0px 6px 6px 6px')}`, backgroundColor: `${chat.id === playerName ? ('') : ('#0093E9')}`, backgroundImage: `${chat.id === playerName ? ('radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41)93.6%)') : ('linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)')}`}}>
                            <strong>{chat.id}: </strong>{chat.text}
                        </div>
                    ))}
                </div>
                <div className='chat-input'>
                    <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                        <TextField id="filled-multiline-flexible" label="Enter text" value={groupText} onChange={(e) => setGroupText(e.target.value)} multiline maxRows={4} variant="filled" size='small' fullWidth/>
                        {sentButton ? (
                            <Icon icon="ion:send" style={{fontSize: '28px'}} onClick={handleChatInput}/>
                        ) : (
                            <Icon icon="ion:send" style={{fontSize: '28px'}} color='grey'/>
                        ) }
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default GroupChat