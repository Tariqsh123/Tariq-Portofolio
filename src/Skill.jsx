import './App.css';
import SocialIcons from './social-icons';
import { useEffect, useState } from 'react';
import WhatsAppIcon from './whatsapp';


const images = [
  '/HTML.png', '/CSS.png', '/js.png', '/Python.png',
  '/Bootstrap.png', '/react.svg', '/Jquerry.png', '/illustrator.png',
  '/Photoshop.png', '/Wordpress.png', '/Numpy.png', '/Tailwind.png'
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 4) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const displayedImages = Array.from({ length: 4 }, (_, i) => images[(index + i) % images.length]);

  return (
    <div className="slider-container">
      <div className="image-container">
        {displayedImages.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${index + i}`} className="fade-image" />
        ))}
      </div>
    </div>
  );
};

const CircularSpeedMeter = ({ skillLevel, theme, name }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const animateSpeedMeter = () => {
      if (isHovered && progress < skillLevel) {
        setProgress((prev) => Math.min(prev + 1, skillLevel));
        animationFrameId = requestAnimationFrame(animateSpeedMeter);
      } else if (!isHovered && progress > 0) {
        const decreaseProgress = () => {
          setProgress((prev) => Math.max(prev - 1, 0));
          if (progress > 0) {
            animationFrameId = requestAnimationFrame(decreaseProgress);
          }
        };
        decreaseProgress();
      }
    };

    animateSpeedMeter();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, skillLevel, progress]);

  const radius = 90;
  const strokeWidth = 15;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height="250"
      width="250"
      onMouseEnter={() => {
        setIsHovered(true);
        setProgress(skillLevel); // Set progress to skillLevel on hover
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle
        className="background-circle"
        r={normalizedRadius}
        cx="125"
        cy="125"
      />
      <circle
        className={`progress-circle ${theme}-theme`}
        r={normalizedRadius}
        cx="125"
        cy="125"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: 'stroke-dashoffset 0.5s ease-in-out', // Smooth transition
        }}
      />
      <text className="progress-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">
        {progress}%
      </text>
      <text className="label-text" x="50%" y="60%" dominantBaseline="middle" textAnchor="middle">
        {name}
      </text>
    </svg>
  );
};

const Skill = ({ isDarkTheme }) => {
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

    const handleMouseMove = (evt) => {
      cursor = [evt.clientX, evt.clientY];
    };

    const handleMouseLeave = () => {
      cursor = [-1500, -1500];
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
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
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`skill-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div id="skill-second-container">
        <div id="skill-upper-container">
            <ImageSlider/>
          <h1>My <span>Skills</span></h1>
        </div>
        <div id="skill-bottom-container">
          <div id="skill-bottom-container-top">
            <CircularSpeedMeter skillLevel={95}  name="HTML" />
            <CircularSpeedMeter skillLevel={85}  name="CSS" />
            <CircularSpeedMeter skillLevel={70}  name="Javascript" />
            <CircularSpeedMeter skillLevel={70}  name="Wordpress" />
            <CircularSpeedMeter skillLevel={63}  name="Photoshop" />
          </div>
          <div id="skill-bottom-container-bottom">
            <CircularSpeedMeter skillLevel={75}  name="React JS" />
            <CircularSpeedMeter skillLevel={40}  name="Python" />
            <CircularSpeedMeter skillLevel={60}  name="J Querry" />
            <CircularSpeedMeter skillLevel={80}  name="Illustrator" />
          </div>
        </div>
      </div>
      <SocialIcons />
      <WhatsAppIcon />
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Skill;
