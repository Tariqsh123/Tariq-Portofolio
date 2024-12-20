import React, { useState, useEffect } from 'react';
import './App.css';
import SocialIcons from './social-icons';
import WhatsAppIcon from './whatsapp';
function ProCard({ name, bgClass, link }) {
    return (
        <div className={`proCard-main ${bgClass}`}>
            {/* Ensure the <a> tag wraps the entire card */}
            <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
                <h2>{name}</h2>
            </a>
        </div>
    );
}

const Project = ({ isDarkTheme }) => {
    const [selectedButton, setSelectedButton] = useState('first');

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        let circles = [];

        const CANVAS_WIDTH = window.innerWidth;
        const CANVAS_HEIGHT = window.innerHeight;

        // Set the canvas size
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

        canvas.addEventListener("mousemove", (evt) => {
            cursor = [evt.clientX, evt.clientY];
        });

        canvas.addEventListener("mouseleave", () => {
            cursor = [-1500, -1500];
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach((item) => {
                const d = Math.sqrt(
                    Math.pow(item.x - cursor[0], 2) + Math.pow(item.y - cursor[1], 2)
                );
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

    // Links for the cards
    const links = {
        card1: 'https://www.cookventory.com/',
        card2: 'https://njurex.vercel.app/',
        card3: 'https://tariqsh123.github.io/E-learning/',
        card4: 'https://tariqsh123.github.io/Html-Note-book/',
        card5: 'https://tariqsh123.github.io/LoanPay/',
        card6: 'https://tariqsh123.github.io/Calculator-with-js/',
        card7: 'https://tariqsh123.github.io/Master-UI-Design/',
        card8: 'https://tariqsh123.github.io/Sneakers/',
        card9: 'https://tariqsh123.github.io/Simple-Order-Taking-Chatbot-with-Flask/',
        card10: 'https://tariqsh123.github.io/Theme-with-JS/',
        card11: 'https://tariqsh123.github.io/Furni/',
        card12: 'https://tariqsh123.github.io/Intenseye/',
        cardA: 'https://tariqsh123.github.io/Amazon-Html-Css-only/',
        cardB: 'https://tariqsh123.github.io/Daraz-HTML-Css-only/',
        cardC: 'https://tariqsh123.github.io/FoodPanda/',
        cardD: 'https://tariqsh123.github.io/Netflix-first-try/',
    };

    return (
        <div>
            <div className={`Project-about-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div id="project-top-container">
                    <button
                        onClick={() => handleButtonClick('first')}
                        className={selectedButton === 'first' ? 'selected' : ''}
                    >
                        My Work
                    </button>
                    <button
                        onClick={() => handleButtonClick('second')}
                        className={selectedButton === 'second' ? 'selected' : ''}
                    >
                        Clone Site
                    </button>
                </div>

                <div id="ProCard-Container">
                    {selectedButton === 'first' ? (
                        <>
                            <ProCard name="Visit Site" bgClass="card-1" link={links.card1} />
                            <ProCard name="Visit Site" bgClass="card-2" link={links.card2} />
                            <ProCard name="Visit Site" bgClass="card-3" link={links.card3} />
                            <ProCard name="Visit Site" bgClass="card-4" link={links.card4} />
                            <ProCard name="Visit Site" bgClass="card-5" link={links.card5} />
                            <ProCard name="Visit Site" bgClass="card-6" link={links.card6} />
                            <ProCard name="Visit Site" bgClass="card-7" link={links.card7} />
                            <ProCard name="Visit Site" bgClass="card-8" link={links.card8} />
                            <ProCard name="Visit Site" bgClass="card-9" link={links.card9} />
                            <ProCard name="Visit Site" bgClass="card-10" link={links.card10} />
                            <ProCard name="Visit Site" bgClass="card-11" link={links.card11} />
                            <ProCard name="Visit Site" bgClass="card-12" link={links.card12} />
                        </>
                    ) : (
                        <>
                            <ProCard name="Visit Site" bgClass="card-a" link={links.cardA} />
                            <ProCard name="Visit Site" bgClass="card-b" link={links.cardB} />
                            <ProCard name="Visit Site" bgClass="card-c" link={links.cardC} />
                            <ProCard name="Visit Site" bgClass="card-d" link={links.cardD} />
                        </>
                    )}
                </div>

                <SocialIcons />
                <WhatsAppIcon />
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
};

export default Project;
