import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <a href="https://wa.me/+923402444075" target="_blank" rel="noopener noreferrer">
      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '10px',
          backgroundColor: '#25D366',  
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          opacity: isVisible ? 1 : 0, 
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)', 
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        }}
      >
        <FaWhatsapp style={{ fontSize: '50px', color: 'white' }} />
      </div>
    </a>
  );
};

export default WhatsAppIcon;
