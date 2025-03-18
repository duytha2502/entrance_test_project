import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function Game() {
    const [time, setTime] = useState(0);

    const [isPlay, setIsPlay] = useState(false);
    const [value, setValue] = useState(5);
    const [title, setTitle] = useState("LET'S PLAY");
    const [nextNumber, setNextNumber] = useState(1);

    const intervalRef = useRef(null);

    const generateCircles = (num) => {
        return Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            x: Math.random() * (600 - 50),
            y: Math.random() * (400 - 50),
        }));
    };

    const [circles, setCircles] = useState(generateCircles(value));

    const handleInputValue = (e) => {
        const inputValue = Number(e.target.value);
        setValue(inputValue);

        if (inputValue > 0) {
            setCircles(generateCircles(inputValue));
            setTitle("LET'S PLAY");
        } else {
            setCircles([]);
            setTitle('YOU DUMP! NEED TO INSERT MORE THAN 0 TO PLAY');
            setIsPlay(false);
        }
    };

    const handleIsPlay = () => {
        if (isPlay) {
            setIsPlay(false);
            setTitle("LET'S PLAY");
            setNextNumber(1);
            setCircles(generateCircles(value));
        } else {
            setIsPlay(true);
        }
    };

    const handleCircleClick = (id) => {
        if (id !== nextNumber) {
            setTitle('GAME OVER');
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return;
        }
        setNextNumber((prev) => prev + 1);

        setCircles((prev) =>
            prev.map((circle) =>
                circle.id === id ? { ...circle, fading: true } : circle
            )
        );

        setTimeout(() => {
            setCircles((prev) => prev.filter((circle) => circle.id !== id));
        }, 500);
    };

    useEffect(() => {
        if (value === 0) {
            setIsPlay(false);
            setCircles([]);
            setTitle('YOU DUMP! NEED TO INSERT MORE THAN 0 TO PLAY');
        } else {
            setCircles(generateCircles(value));
        }
    }, [value]);

    useEffect(() => {
        if (isPlay) {
            setTime(0);
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    setTime((prevTime) => prevTime + 0.1);
                }, 100);
            }
        } else {
            setTime(0);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [isPlay]);

    useEffect(() => {
        if (isPlay && circles.length === 0) {
            setTitle('ALL CLEAR');
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [circles, isPlay]);

    return (
        <div className='game-container'>
            <h2 style={{ fontSize: '20px' }}>{title}</h2>
            <div className='game-header'>
                <div>
                    <p>Points: </p>
                    <p>Time: </p>
                </div>
                <div>
                    <input
                        style={{
                            backgroundColor: '#fff',
                            outline: 'none',
                            color: '#000',
                            fontSize: '14px',
                        }}
                        type='text'
                        value={value}
                        onChange={(e) => handleInputValue(e)}
                    />
                    <p style={{ paddingTop: '14px', margin: '0px' }}>
                        {time.toFixed(1)}s
                    </p>
                </div>
            </div>
            <div className='game-btn'>
                <button onClick={handleIsPlay}>
                    {isPlay ? 'Restart' : 'Play'}
                </button>
                <button>Auto Play</button>
            </div>

            <div className='game-board'>
                {circles.map((circle) => (
                    <div
                        key={circle.id}
                        className={`circle ${circle.fading ? 'fade-out' : ''}`}
                        onClick={() => handleCircleClick(circle.id)}
                        style={{ left: circle.x, top: circle.y }}
                    >
                        {circle.id}
                    </div>
                ))}
            </div>

            <p>Next: {nextNumber}</p>
        </div>
    );
}
