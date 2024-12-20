import React from 'react';
import './App.css'; // Assuming your styles are in App.css

function SocialIcons() {
  return (
    <div className="social-icons">
      <div className="icon-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/color/144/facebook-new.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/500/instagram-new.png" alt="Instagram" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/color/144/twitter--v1.png" alt="Twitter" />
        </a>
      </div>
    </div>
  );
}

export default SocialIcons;
