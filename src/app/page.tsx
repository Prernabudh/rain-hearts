"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home({ progress }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hearts, setHearts] = useState([]);

  let heartInterval = useRef();
  let cleanupInterval = useRef();

  const createHeart = () => {
    const newHeart = {
      id: Date.now(),
      left: Math.random() * 100 + "vw",
      duration: Math.random() * 3 + 2 + "s",
    };
    setHearts((prevHearts) => [...prevHearts, newHeart]);
  };

  const rainHearts = () => {
    heartInterval.current = setInterval(() => {
      createHeart();
    }, 100);

    // Interval to clean up hearts if there are too many
    cleanupInterval.current = setInterval(() => {
      if (hearts.length > 200) {
        setHearts((prevHearts) => prevHearts.slice(1)); // Remove the oldest heart
      }
    }, 100);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(heartInterval.current);
      clearInterval(cleanupInterval.current);
    };
  };

  const handleClick = () => {
    if (!isFlipped) {
      rainHearts();
    } else {
      clearInterval(heartInterval.current);
      clearInterval(cleanupInterval.current);
      setHearts([]);
    }
    setIsFlipped(!isFlipped);
  };

  console.log("hearts", hearts);
  return (
    <div className="page">
      <div
        className={`card-container ${isFlipped ? "flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="card">
          <div className="card-front">
            <p>Click me</p>
          </div>
          <div className="card-back">
            <p>I love you Eshant!</p>
          </div>
        </div>
      </div>
      {hearts.map((heart) => (
        <i
          key={heart.id}
          className="fa-solid fa-heart heart"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
          }}
        ></i>
      ))}
    </div>
  );
}
