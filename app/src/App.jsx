import { useEffect, useState, useRef } from 'react';
import confett from './assets/confetti.png';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.png';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import img7 from './assets/img7.png';
import bgtrack from './assets/song1.mp3';
import message from './assets/message.mp3';
import './App.css';

function App() {
  const [confettiClicked, setConfettiClicked] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [messagePlaying, setMessagePlaying] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [img1, img2, img3, img4, img5, img6, img7];
  const audioRef = useRef(null);
  const messageRef = useRef(null);

  // Background music control
  useEffect(() => {
    audioRef.current = new Audio(bgtrack);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Confetti effect
  const createConfetti = () => {
    setConfettiClicked(true);
    const confettiType = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < 200; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = '-10px';
      confetti.style.zIndex = '1000';
      
      switch (confettiType) {
        case 1:
          confetti.style.backgroundImage = `url(${confett})`;
          confetti.style.backgroundSize = 'cover';
          confetti.style.width = '40px';
          confetti.style.height = '40px';
          break;
        case 2:
          confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
          confetti.style.borderRadius = '50%';
          break;
        case 3:
          confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
          confetti.style.transform = 'rotate(45deg)';
          break;
      }

      document.body.appendChild(confetti);

      const animationDuration = Math.random() * 3 + 2;
      confetti.style.animation = `fall ${animationDuration}s linear forwards`;

      setTimeout(() => confetti.remove(), animationDuration * 1000);
    }
  };

  const toggleMusic = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const playMessage = () => {
    if (messageRef.current) {
      messageRef.current.pause();
      messageRef.current.currentTime = 0;
    }
    
    messageRef.current = new Audio(message);
    messageRef.current.play();
    setMessagePlaying(true);
    
    messageRef.current.onended = () => {
      setMessagePlaying(false);
    };
  };

  const toggleLetter = () => {
    setShowLetter(!showLetter);
  };

  return (
    <div className="app-container">
      <div className="container">
        <h1>🎉 Happy Birthday, <span className="name">Tshegofatso Isabel Mokwena</span>! 🎉</h1>
        <p className="message">You make my life so special. Wishing you the best day ever! ❤️</p>

        <div className="slideshow">
          <img 
            src={images[currentImage]} 
            className="slide active" 
            alt="Our memories"
          />
        </div>

        <div className="button-group">
          <button className="confetti-btn" onClick={createConfetti}>
            🎈 Click Me Baby, OH CLICK ME!! 🎈
          </button><br />
          
          <button className="music-btn" onClick={toggleMusic}>
            {audioPlaying ? '🔇 Mute Music' : '🔊 Play Music'}
          </button>
          
          <button className="letter-btn" onClick={toggleLetter}>
            {showLetter ? '📪 Close Letter' : '💌 Read My Letter'}
          </button>
        </div>

        {showLetter && (
          <div className="love-letter">
            <strong>To my loving girlfriend: Tshegofatso Isabel (What was her third name again???) Mokwena</strong>
            <h2>To the Most Amazing Girlfriend,</h2>
            <p>Your smile brightens my darkest days...</p>
            <p>Every moment with you is a treasure...</p>
            <p>Thank you for being you...</p>
            <p>With all my love,</p>
            <strong>Your Loving Boyfriend, Jay</strong>
            <br />
            <button className="close-letter-btn" onClick={toggleLetter}>❌ Close Letter</button>
            <button className="message-btn" onClick={playMessage} disabled={messagePlaying}>
              {messagePlaying ? '▶️ Playing...' : '🎤 Play Voice Message'}
            </button>
          </div>
        )}

        {confettiClicked && (
          <div className="hint">
            <em>There are three types of surprises! Keep clicking!</em>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;