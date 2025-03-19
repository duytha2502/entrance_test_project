import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function Game() {
    const [time, setTime] = useState(0);

    const [isPlay, setIsPlay] = useState(false);
    const [value, setValue] = useState(5);
    const [title, setTitle] = useState("LET'S PLAY");
    const [nextNumber, setNextNumber] = useState(1);
    const [autoPlay, setAutoPlay] = useState(false);
    const [circles, setCircles] = useState([]);
    // const [disabled, setDisabled] = useState(false);

    const intervalRef = useRef(null);

    const generateCircles = (num) => {
        return Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            x: Math.random() * (600 - 50),
            y: Math.random() * (400 - 50),
        }));
    };

    const handleInputValue = (e) => {
        setValue(e.target.value);
    };

    const handleIsPlay = () => {
        if (isPlay) {
            setIsPlay(false);
        } else {
            setIsPlay(true);
            setCircles(generateCircles(value));
            setTitle("LET'S PLAY");
            setNextNumber(1);
        }
    };

    const handleAutoPlay = () => {
        setAutoPlay(!autoPlay);
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
                circle.id === id ? { ...circle, countdown: 3 } : circle
            )
        );

        // setTimeout(() => {
        //     setCircles((prev) => prev.filter((circle) => circle.id !== id));
        // }, 500);
        // Giảm countdown mỗi giây

        const countdownInterval = setInterval(() => {
            setCircles((prev) =>
                prev.map((circle) =>
                    circle.id === id
                        ? { ...circle, countdown: circle.countdown - 0.1 }
                        : circle
                )
            );
        }, 100);

        // Sau 3 giây, xóa circle
        setTimeout(() => {
            clearInterval(countdownInterval);
            setCircles((prev) => prev.filter((circle) => circle.id !== id));
        }, 3000);
    };

    // useEffect(() => {
    //     if (value === 0) {
    //         setIsPlay(!isPlay);
    //         setDisabled((prev) => !prev);
    //         setTitle('YOU DUMP! NEED TO INSERT MORE THAN 0 TO PLAY');
    //     }
    // }, [value]);

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
    }, [circles]);

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
                            padding: '2px',
                            border: '1px solid #000',
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
                <button
                    onClick={handleIsPlay}
                    // className={`${disabled ? 'disabledBtn' : ''}`}
                >
                    {isPlay ? 'Restart' : 'Play'}
                </button>
                <button onClick={handleAutoPlay}>
                    Auto Play {autoPlay ? 'OFF' : 'ON'}
                </button>
            </div>

            <div className='game-board'>
                {circles.map((circle) => (
                    <div
                        key={circle.id}
                        className={`circle ${
                            circle.countdown ? 'clickedColor' : ''
                        }`}
                        onClick={() => handleCircleClick(circle.id)}
                        style={{
                            left: circle.x,
                            top: circle.y,
                            opacity: circle.countdown
                                ? circle.countdown / 3
                                : 1,
                        }}
                    >
                        <p>{circle.id}</p>
                        {circle.countdown !== undefined && (
                            <p style={{ color: '#fff' }}>
                                {circle.countdown.toFixed(1)}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <p style={{ marginTop: '4px' }}>Next: {nextNumber}</p>
        </div>
    );
}
