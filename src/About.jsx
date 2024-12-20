import './App.css';
import SocialIcons from './social-icons';
import { useEffect } from 'react';
import WhatsAppIcon from './whatsapp';


function Box(props) {
    return (
        <div id="box-container">
            <img src={props.img} alt="" />
            <div id="box-text-container">
                <h2>{props.heading}</h2>
                <p>{props.text}</p>
            </div>
        </div>
    );
}

const About = ({ isDarkTheme }) => {
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
        <div>
            <div className={`about-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div id="about-top-container">
                    <div id="about-top-left">
                        <h1>I am Creative <span>Web developer</span></h1>
                        <p>Hi there! I’m <span>Muhammad Tariq</span>, a passionate front-end developer with a flair for JavaScript and React.js. Currently pursuing my BBIT degree, I’m excited to be contributing to Njurex and bringing innovative ideas to life!</p>
                    </div>
                    <div id="about-top-right">
                        <span id="about-top-img-bg"></span>
                        <span id="about-top-img"></span>
                    </div>
                </div>
                <div id="about-right-container">
                    <div id="about-left">
                        <h1>My Services</h1>
                        <div id="about-box-main-container">
                            <Box img="https://img.icons8.com/ios-filled/100/FFFFFF/google-code.png" heading="Website Development" text="Creating responsive and user-friendly websites using HTML, CSS, and JavaScript frameworks like React" />
                            <Box img="https://img.icons8.com/glyph-neue/64/FFFFFF/web-design.png" heading="UI/UX & Optimization" text="I create intuitive interfaces with wireframes, prototypes, and usability testing while enhancing website speed and performance through best coding practices and image optimization for a seamless user experience." />
                            <Box img="https://img.icons8.com/glyph-neue/64/FFFFFF/media-queries.png" heading="Responsive Design" text="Creating mobile-friendly websites that seamlessly adapt to various screen sizes for an optimal user experience on any device." />
                        </div>
                    </div>
                </div>
                <SocialIcons />
                <WhatsAppIcon />
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
};

export default About;
