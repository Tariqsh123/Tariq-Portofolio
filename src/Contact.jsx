import './App.css';
import SocialIcons from './social-icons';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; 

const Contact = ({ isDarkTheme }) => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className={`Contact-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div id="Contact-second-container">
        <h2>Get In <span>Touch</span></h2>
        <div id="contact-all-container">
          <div id="contact-left-container">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="submit-button">Submit</button>
              </form>
            ) : (
              <div className="hurrah-message">
                <div className="hurrah-animation">
                  <p>Your message has been successfully submitted!</p>
                </div>
              </div>
            )}
          </div>

          <div id="contact-right-container">
            <div className="whatsapp-container">
              <a
                href="https://wa.me/+923402444075"  // Replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                <FaWhatsapp size={70} color="#ffffff" />
                <span>Chat with me on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <SocialIcons />
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Contact;
