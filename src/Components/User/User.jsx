import React, { useState } from "react";
import Performance from "./Performance/Performance";
import Prediction from "./Prediction/Prediction";
import RoomChat from "./RoomChat/RoomChat";
import Matches from "./Matches/Matches";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import './User.css';
import Header from "./Header";
import { Icon } from '@iconify/react';
import ChatBot from "./ChatBot/ChatBot";

const User = () => {
    const [clickOne, setClickOne] = useState(true);
    const [clickTwo, setClickTwo] = useState(false);
    const [clickThree, setClickThree] = useState(false);
    const [clickFour, setClickFour] = useState(false);
    const [display, setDisplay] = useState('live');

    const clicked1 = () => {
        setDisplay('live');
        setClickOne(true);
        setClickTwo(false);
        setClickThree(false);
        setClickFour(false);
    };

    const clicked2 = () => {
        setDisplay('Prediction');
        setClickOne(false);
        setClickTwo(true);
        setClickThree(false);
        setClickFour(false);
    };

    const clicked3 = () => {
        setDisplay('Performance');
        setClickOne(false);
        setClickTwo(false);
        setClickThree(true);
        setClickFour(false);
    };

    const clicked4 = () => {
        setDisplay('Match');
        setClickOne(false);
        setClickTwo(false);
        setClickThree(false);
        setClickFour(true);
    };

    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const [anchorEl4, setAnchorEl4] = useState(null);

    const handlePopoverOpen1 = (event) => {
      setAnchorEl1(event.currentTarget);
    };
  
    const handlePopoverClose1 = () => {
      setAnchorEl1(null);
    };

    const handlePopoverOpen2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handlePopoverClose2 = () => {
        setAnchorEl2(null);
    };

    const handlePopoverOpen3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    
    const handlePopoverClose3 = () => {
        setAnchorEl3(null);
    };

    const handlePopoverOpen4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    
    const handlePopoverClose4 = () => {
        setAnchorEl4(null);
    };
  
    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);
    const open3 = Boolean(anchorEl3);
    const open4 = Boolean(anchorEl4);


    return (
        <div>
        {/* <ChatBot /> */}
            <Header />
            <div className="navigator-body">
                <div className="navigator-bar"></div>
                <div className="navigator-menu">

                    <Typography aria-owns={open1 ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen1} onMouseLeave={handlePopoverClose1} >
                        <div className={`navigate-one ${clickOne ? 'clicked' : ''}`} onClick={() => clicked1()}>
                            <Icon icon="fluent:live-24-filled" fontSize={'32px'}/>
                        </div>
                    </Typography>
                    <Popover id="mouse-over-popover" sx={{ pointerEvents: 'none',}} open={open1} anchorEl={anchorEl1} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={handlePopoverClose1} disableRestoreFocus >
                        <Typography sx={{ p: 1 }} style={{fontWeight: 'bolder'}}>Live Match</Typography>
                    </Popover>

                    <Typography aria-owns={open2 ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen2} onMouseLeave={handlePopoverClose2} >
                        <div className={`navigate-two ${clickTwo ? 'clicked' : ''}`} onClick={() => clicked2()}>
                            <Icon icon="carbon:model-alt" fontSize={'32px'}/>
                        </div>
                    </Typography>
                    <Popover id="mouse-over-popover" sx={{ pointerEvents: 'none',}} open={open2} anchorEl={anchorEl2} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={handlePopoverClose2} disableRestoreFocus >
                        <Typography sx={{ p: 1 }} style={{fontWeight: 'bolder'}}>Score Predictor</Typography>
                    </Popover>

                    <Typography aria-owns={open3 ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen3} onMouseLeave={handlePopoverClose3} >
                        <div className={`navigate-three ${clickThree ? 'clicked' : ''}`} onClick={() => clicked3()}>
                            <Icon icon="mdi:performance" fontSize={'32px'}/>
                        </div>
                    </Typography>
                    <Popover id="mouse-over-popover" sx={{ pointerEvents: 'none',}} open={open3} anchorEl={anchorEl3} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={handlePopoverClose3} disableRestoreFocus >
                        <Typography sx={{ p: 1 }} style={{fontWeight: 'bolder'}}>Performance</Typography>
                    </Popover>
                    
                    <Typography aria-owns={open4 ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen4} onMouseLeave={handlePopoverClose4} >
                        <div className={`navigate-four ${clickFour ? 'clicked' : ''}`} onClick={() => clicked4()}>
                            <Icon icon="noto-v1:cricket-game" fontSize={'32px'}/>
                        </div>
                    </Typography>
                    <Popover id="mouse-over-popover" sx={{ pointerEvents: 'none',}} open={open4} anchorEl={anchorEl4} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={handlePopoverClose4} disableRestoreFocus >
                        <Typography sx={{ p: 1 }} style={{fontWeight: 'bolder'}}>Matches</Typography>
                    </Popover>

                </div>
            </div>
            <div className="user-main-route">
                {display === 'live' ? <RoomChat /> : <div></div>}
                {display === 'Prediction' ? <Prediction /> : <div></div>}
                {display === 'Performance' ? <Performance /> : <div></div>}
                {display === 'Match' ? <Matches /> : <div></div>}
            </div>
            <ChatBot />
        </div>
    );
};

export default User;
