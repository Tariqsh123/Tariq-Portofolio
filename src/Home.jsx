import './App.css';
import { useEffect, useState } from 'react';
import SocialIcons from './social-icons';
import WhatsAppIcon from './whatsapp';

function Home({ isDarkTheme }) {
  const [typedText, setTypedText] = useState('');
  const fullText = "I am Web Developer";

  useEffect(() => {
    let index = 0;
    const typingSpeed = 100; // Typing speed for characters
    const delayBeforeRestart = 1500; // Delay before restarting the typing effect
    let typingTimeout;

    const typeWriterEffect = () => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        typingTimeout = setTimeout(typeWriterEffect, typingSpeed);
      } else {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          index = 0;
          typeWriterEffect();
        }, delayBeforeRestart);
      }
    };

    typeWriterEffect();

    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let circles = [];

    const CANVAS_WIDTH = window.innerWidth;
    const CANVAS_HEIGHT = window.innerHeight;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    class Particle {
      constructor() {
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.size = Math.random() * 4;
        this.color = "#ffffff";
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    for (let i = 0; i < 150; i++) {
      circles.push(new Particle());
    }

    let cursor = [-1500, -1500];

    canvas.addEventListener("mousemove", evt => {
      cursor = [evt.clientX, evt.clientY];
    });

    canvas.addEventListener("mouseleave", () => {
      cursor = [-1500, -1500];
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(item => {
        const d = Math.sqrt(Math.pow(item.x - cursor[0], 2) + Math.pow(item.y - cursor[1], 2));
        if (d < 100) {
          ctx.strokeStyle = "#fff";
          ctx.moveTo(cursor[0], cursor[1]);
          ctx.lineTo(item.x, item.y);
          ctx.stroke();
        }
        item.draw();
        item.x += item.vx;
        item.y += item.vy;

        if (item.x < 0 || item.x > CANVAS_WIDTH) item.vx *= -1;
        if (item.y < 0 || item.y > CANVAS_HEIGHT) item.vy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = '/MUHAMMAD TARIQ.pdf'; // Path to the CV file inside the public folder
    link.download = 'Muhammad_Tariq_CV.pdf'; // The name of the file when downloaded
    link.click();
  };

  return (
    <section className={`banner ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div id="home-main-container">
        <div id="home-left-container">
          <h1>Hi There</h1>
          <h1>I am <span>Muhammad Tariq</span></h1>
          <h1>{typedText}</h1> {/* Displaying typed text here */}
          <button className="button" onClick={handleDownloadClick}>
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Download CV</span>
            </span>
          </button>
        </div>
        <div id="home-right-container">
          <div id="home-img-container"></div>
          <div id="home-img-bg-container"></div>
        </div>
      </div>
      <SocialIcons />
      <WhatsAppIcon />
      <canvas id="canvas"></canvas>
    </section>
  );
}

export default Home;
