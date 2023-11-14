import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import './room.css'
import './lobby.css'
import config from '../../../config';

const PlayerOnline = () => {
    const [roomCode, setRoomCode] = useState('');
    const [playerName, setPlayerName] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const [roomPlayers, setRoomPlayers] = useState([]);
    
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const userObject = JSON.parse(storedUser);
            setPlayerId(userObject.id);
            setPlayerName(userObject.name);
            setRoomCode(userObject.roomCode);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (roomCode && playerId) {
                try {
                    const response = await fetch(`${config.apiUrlJoinRoom}/${roomCode}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if (data.ready) {
                        setRoomPlayers(data.players);
                    }
                    else if (data.noRoom) {
                        
                    }
                    if (data.started) {
                        localStorage.setItem("user", JSON.stringify({id:playerId, name:playerName, roomCode: roomCode, started: true, joined: true}));
                        setRoomPlayers(data.meta_data.players);
                        const playerData = data.meta_data.players.map(({ id, name }) => ({ id, name }));
                        localStorage.setItem('playerData', JSON.stringify(playerData));
                    }
                    else {
                        setRoomPlayers(data.players);
                    }
                } catch (error) {
                    console.error('Error fetching room players:', error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [roomCode, playerId, playerName]);

    const renderPlayerList = () => {
        return (
            <div>
                <h4 style={{textAlign: 'center'}}>Players Online</h4>
                <div className='scrollable'>
                    <Box sx={{ '& > :not(style)': { m: 0 }, display: 'flex', flexDirection:'column', alignItems: 'center', width: '100%' }}>
                        {roomPlayers.map((player) => (
                            <div className='player-joins' key={player.id}>
                                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', justifyContent:'flex-start', width: '100%' }}>
                                    <div className='vertical'><b><i>{player.id}.</i></b></div>
                                    <Box sx={{ '& > :not(style)': { m: 0.1 }, display: 'flex', alignItems: 'center' }}>
                                        <Icon icon="fluent:password-24-regular" style={{fontSize: '24px'}} />
                                        <div><b><i>{player.name}</i></b></div>
                                    </Box>
                                </Box>
                            </div>
                        ))}
                    </Box>
                </div>
            </div>
        );
    };

  return (
    <div>
        {renderPlayerList()}
    </div>
  )
}

export default PlayerOnline