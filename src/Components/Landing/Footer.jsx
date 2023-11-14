import React from 'react'
import './layout.css'
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="footer">
        <div className='footer-items2'>
          <div className='footer-name'>
            RoadSense@Copyright2023
          </div>
          <div className='live'>
            <Icon icon="fluent:live-24-filled" style={{color: 'green', fontWeight: 'bolder', fontSize: 'medium'}} />
            <div> Live</div>
          </div>
        </div>
    </footer>
  )
}

export default Footer