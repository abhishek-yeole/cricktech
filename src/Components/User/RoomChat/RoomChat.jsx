import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import './room.css'
import './lobby.css'
import config from '../../../config';
import CheckLogin from '../../Auth/CheckLogin';
import LinearProgress from '@mui/material/LinearProgress';
import PlayerOnline from './PlayerOnline';
import GroupChat from './GroupChat';


const Room = () => {
    const [roomCode, setRoomCode] = useState('');
    const [playerId, setPlayerId] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [roomChat, setRoomChat] = useState(false);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const userObject = JSON.parse(storedUser);
            setPlayerId(userObject.id);
            setPlayerName(userObject.name);
            setRoomCode(userObject.roomCode);
            
            if (userObject.joined === true) {
                setRoomChat(true);
            }
            if (userObject.started === true) {
                setRoomChat(true);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const createRoom = async () => {
        try {
            const response = await fetch(config.apiUrlCreateRoom, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: playerName }),
            });
            const data = await response.json();
            setRoomCode(data.room_code);
            setPlayerId(1);
            setRoomChat(true);

            try {
                localStorage.setItem("user", JSON.stringify({id:1, name:playerName, roomCode: data.room_code, joined:true}));
            }
            catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const joinRoom = async () => {
        try {
            const response = await fetch(`${config.apiUrlJoinRoom}/${roomCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: playerName }),
            });
            const data = await response.json();
            setPlayerId(data.player_id);
            setRoomChat(true);
            try {
                localStorage.setItem("user", JSON.stringify({id:data.player_id, joined:true, name:playerName, roomCode: roomCode}));
            }
            catch (error) {
                console.log(error);
            }
            if (data.ready) {
                setRoomChat(true);
            }
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };

    const leaveRoom = async () => {
        try {
            await fetch(`${config.apiUrlLeaveRoom}/${roomCode}/${playerId}`, {
                method: 'POST',
            });
            setPlayerId(null);
            setRoomChat(false);
            localStorage.removeItem("user");
        } catch (error) {
            console.error('Error leaving room:', error);
        }
    };

    const [hearts, sethearts] = useState(false);
    const [likeCount, setLikeCount] = useState(null);

    const handleReactTrue = async() => {
        try {
            const response = await fetch(`${config.apiUrlReactionTrue}/${roomCode}`, {
            method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                if (data.success) {
                    sethearts(true);
                    setLikeCount(data.likeCount);
                }
                else {
                    sethearts(false);
                }
            }
            else {
                console.log("failed");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleReactFalse = async() => {
        try {
            const response = await fetch(`${config.apiUrlReactionFalse}/${roomCode}`, {
            method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                if (data.success) {
                    sethearts(false);
                    setLikeCount(data.likeCount);
                }
                else {
                    sethearts(true);
                }
            }
            else {
                console.log("failed");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const [progress, setProgress] = useState(null);
    const [text, setText] = useState(null);
    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (roomCode) {
                try {
                    const response = await fetch(`${config.apiUrlHandleRoomChat}/${roomCode}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        if (data.success) {
                            setChatData(data.chats);
                            setProgress(data.pollCount * 20);
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
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [roomCode, playerId]);

    const [sentButton, setSentButton] = useState(true);

    const handleChatInput = async() => {
        if (text !== null) {
            try {
                const response = await fetch(`${config.apiUrlHandleChatInput}/${roomCode}/${playerId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'text': text, 'playerName': playerName })
                });
                const data = await response.json();
                if (response.ok) {
                    if (data.success) {
                        console.log("sent");
                        setText(null);
                        setSentButton(false);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const handlePollInput = async() => {
        try {
            const response = await fetch(`${config.apiUrlHandlePollData}/${roomCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                if (data.success) {
                    console.log("Polled");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const getDirection = () => {
		if (window.innerWidth <= 768) {
			return 'column';
		} else {
			return 'row';
		}
	};

    const receiveDataFromChild = (data) => {
        setPlayerName(data.name);
    };

    const [popoverVisible, setPopoverVisible] = useState(false);

    const handleViewPersonsClick = () => {
        setPopoverVisible(true);
    };

    const handlePopoverClose = () => {
        setPopoverVisible(false);
    };
    
    return (
        <div className='live-body'>
            <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} />
            <div className='live-controls'>
                <div className='live-video'>
                    <iframe width="100%" height="95%" src="https://www.youtube.com/embed/JhIBqykjzbs?si=nFoWbOgI60wgHnVR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className='groupchat'><GroupChat /></div>
            </div>
            <div className = 'room-main'>
                {roomChat ? (
                    <div className='group-chat'>
                        <div className='chating'>
                            <div className='chat-header'>
                                <div><strong>Room Code: </strong> {roomCode}</div>
                                {popoverVisible ? (
                                    <div className='view-persons' onClick={handlePopoverClose}>Close</div>
                                ) : (
                                    <div className='view-persons' onClick={handleViewPersonsClick}>View</div>
                                )}
                            </div>
                            {popoverVisible && (
                                <div className='popover'>
                                    <div className='people-list'><PlayerOnline /></div>
                                </div>
                            )}
                            <div className='chat-view'>
                                {chatData.map(chat => (
                                    <div className='single-chat' style={{ float: `${chat.id === playerId ? ('right') : ('left')}`, borderRadius: `${chat.id === playerId ? ('6px 0px 6px 6px') : ('0px 6px 6px 6px')}`, backgroundColor: `${chat.id === playerId ? ('') : ('#0093E9')}`, backgroundImage: `${chat.id === playerId ? ('radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41)93.6%)') : ('linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)')}`}}>
                                        <strong>{chat.playerName}: </strong>{chat.text}
                                    </div>
                                ))}
                            </div>
                            <div className='chat-input'>
                                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                    <div className='react-left'>        
                                        {hearts ? (
                                            <Button variant="contained" startIcon={<Icon icon="mdi:heart" />} onClick={handleReactFalse}>{likeCount && (likeCount)}</Button>
                                            ) : (
                                            <Button variant="contained" startIcon={<Icon icon="mdi:heart-outline" />} onClick={handleReactTrue}></Button>
                                            )
                                        }
                                    </div>
                                    <TextField id="filled-multiline-flexible" label="Enter text" value={text} onChange={(e) => setText(e.target.value)} multiline maxRows={4} variant="filled" size='small' fullWidth/>
                                    {sentButton ? (
                                        <Icon icon="ion:send" style={{fontSize: '28px', cursor: 'pointer'}} onClick={handleChatInput}/>
                                    ) : (
                                        <Icon icon="ion:send" style={{fontSize: '28px'}} color='grey'/>
                                    ) }
                                </Box>
                                
                            </div>
                        </div>
                        <Button variant='contained' onClick={leaveRoom}>Leave Room</Button>
                        <div className='polling'>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, width: '100%', margin: '12px auto', padding: '3px', display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                                <div>
                                    <LinearProgress variant="determinate" value={progress} />
                                    <div className='display-votes' style={{fontSize: '12px', fontWeight: 'bold'}}>{progress / 20} Vote</div>
                                </div>
                                <Button variant="contained" color='secondary' startIcon={<Icon icon="ant-design:thunderbolt-filled" />} size='small' onClick={handlePollInput} >Re-Generate</Button>
                            </Box>
                        </div>
                    </div> 
                ) : (
                    <div className='room-controls' style={{display: 'flex', flexDirection: getDirection()}}>
                        <div className='room-actions'>
                            <h2 style={{textAlign: 'center'}}>Custom Room</h2>
                            <div className='action-content'>
                                <Box sx={{ '& > :not(style)': { m: 2 }, display: 'flex', alignItems: 'center' }}>
                                    <Icon icon="wpf:name" style={{fontSize: '32px'}}/>
                                    <TextField id="outlined-basic" label="Name" required variant="outlined" value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>
                                </Box>
                                <Box sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                                    <button className="button-85" onClick={createRoom} style={{width: '100%'}}>Create Room</button>
                                </Box>
                                <div style={{height: '30px'}}></div>
                                <Box sx={{ '& > :not(style)': { m: 2 }, display: 'flex', alignItems: 'center' }}>
                                    <Icon icon="solar:password-outline" style={{fontSize: '32px'}}/>
                                    <TextField id="outlined-basic" label="Room Code" required variant="outlined" value={roomCode} onChange={(e) => setRoomCode(e.target.value)}/>
                                </Box>
                                <Box sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                                    <button className="button-85" onClick={joinRoom} style={{width: '100%'}}>Join Room</button>
                                </Box>
                            </div>
                        </div>
                    </div> 
                )}
            </div>
        </div>
    )
}

export default Room