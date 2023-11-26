import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import './ChatBot.css';
import config from "../../../config";
import Markdown from 'react-markdown';

const ChatBot = () => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isDisbled, setIsDisabled] = useState(false);

  const saveConversationToLocalStorage = (updatedConversation) => {
    localStorage.setItem("conversation", JSON.stringify(updatedConversation));
  };

  const loadConversationFromLocalStorage = () => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  };

  useEffect(() => {
    loadConversationFromLocalStorage();
  }, []);

  const handleSendMessage = async () => {
    setIsDisabled(true);
    const response = await fetch( config.apiUrlChatBot, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'query': message }),
      });

    const data = await response.json();
    console.log(data);
    const responseData = data.response;
    setIsDisabled(false);
    
    const updatedConversation = [
      ...conversation,
      { message: message, sender: "user" },
      { message: responseData, sender: "bot" },
    ];

    setConversation(updatedConversation);
    setMessage("");
    saveConversationToLocalStorage(updatedConversation);
  };

  const handleClearChat = () => {
    localStorage.removeItem('conversation');
    setConversation([]);
  };

  const handleExpand = () => {
    setExpanded(true);
  };
  
  const handleExpandClose = () => {
    setExpanded(false);
  }

  return (
    <div>
      {expanded ? (
        <div className="chatbot-layout">
          <div className="chatbot-body">
            <div className="chating">
              <div className="lead-head">
                <div className="head-title">
                  <div className="head-title-content">CRICKBOT</div>
                  <div className="glitch-wrapper">
                    <div className="glitch" data-text="BETA">BETA</div>
                  </div>
                </div>
                <div>
                  <Button variant="outlined" onClick={handleExpandClose} size="small"><Icon icon="icomoon-free:cross" /></Button>
                </div>
              </div>
              <div className="chat-view">
                <div className="bot-message">
                  <strong>Bot: </strong>
                  Hii! I am a cricket bot. Ask me any cricket queries!!
                </div>
                {conversation.map((con, index) => (
                  <p key={index}>
                    {con.sender === "bot" ? (
                      <div className="bot-message">
                        <strong>Bot: </strong>
                        <Markdown>{con.message}</Markdown>
                      </div>
                    ) : (
                      <div className="user-message">
                        <strong>You: </strong>
                        {con.message}
                      </div>  
                    )}
                  </p>
                ))}
              </div>
            <div className="chat-input">
              <div className="user-input">
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                  <Icon icon="ph:address-book-fill" style={{fontSize: '32px'}}/>
                  <TextField id="filled-multiline-flexible" label="Chat" multiline size='small' maxRows={4} fullWidth variant="filled" value={message} onChange={(e) => setMessage(e.target.value)} required />  
                  <Button disabled={isDisbled}><Icon icon="fluent:send-16-filled" fontSize={'xx-large'} style={{cursor: 'pointer'}} onClick={handleSendMessage} /></Button>
                </Box>
              </div>
              <div className="send-chat"><Button variant="outlined" size="small" onClick={handleClearChat}>New Chat</Button></div>
            </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbot-closed" onClick={handleExpand}>
          <Icon icon="gridicons:chat" />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
