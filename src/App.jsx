import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import GameControl from './components/GameControl';

export default function Game() {
    const [time, setTime] = useState(0);

    const [isPlay, setIsPlay] = useState(false);
    const [value, setValue] = useState(5);
    const [title, setTitle] = useState("LET'S PLAY");
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [circles, setCircles] = useState([]);
    const [isMoveMode, setIsMoveMode] = useState(false);

    const nextNumberRef = useRef(1);
    const intervalRef = useRef(null);
    const circleTimersRef = useRef({});
    const isGameOverRef = useRef(false);
    const moveIntervalRef = useRef(null);

    const generateCircles = (num) => {
        return Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            x: Math.random() * (600 - 40),
            y: Math.random() * (400 - 40),
            dx: (Math.random() - 0.5) * 10,
            dy: (Math.random() - 0.5) * 10,
        }));
    };

    const handleInputValue = (e) => {
        setValue(e.target.value);
    };

    const handleIsAutoPlay = () => {
        setIsAutoPlay(!isAutoPlay);
    };

    const handleMoveMode = () => {
        setIsMoveMode(!isMoveMode);
    };

    const handleIsPlay = () => {
        setIsPlay((prev) => {
            const newIsPlay = !prev;
            setTitle("LET'S PLAY");
            setTime(0);
            isGameOverRef.current = false;
            nextNumberRef.current = 1;

            if (newIsPlay) {
                setCircles(generateCircles(value));

                if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => {
                        setTime((prevTime) => prevTime + 0.1);
                    }, 100);
                }
            } else {
                setCircles([]);
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            return newIsPlay;
        });
    };

    const handleCircleClick = (id) => {
        if (id !== nextNumberRef.current) {
            setTitle('GAME OVER');

            isGameOverRef.current = true;
            clearInterval(intervalRef.current);
            clearInterval(moveIntervalRef.current);
            intervalRef.current = null;
            moveIntervalRef.current = null;

            Object.values(circleTimersRef.current).forEach(clearInterval);
            circleTimersRef.current = {};

            return;
        }

        nextNumberRef.current += 1;

        setCircles((prev) =>
            prev.map((circle) =>
                circle.id === id ? { ...circle, countdown: 3 } : circle
            )
        );

        const countdownInterval = setInterval(() => {
            if (isGameOverRef.current) return;
            setCircles((prev) =>
                prev.map((circle) =>
                    circle.id === id
                        ? {
                              ...circle,
                              countdown: Math.max(0, circle.countdown - 0.1),
                          }
                        : circle
                )
            );
        }, 100);

        circleTimersRef.current[id] = countdownInterval;

        setTimeout(() => {
            if (!isGameOverRef.current) {
                clearInterval(countdownInterval);
                setCircles((prev) => prev.filter((circle) => circle.id !== id));
                delete circleTimersRef.current[id];
            }
        }, 3000);
    };

    useEffect(() => {
        if (!isPlay || !isMoveMode) {
            clearInterval(moveIntervalRef.current);
            moveIntervalRef.current = null;
            return;
        }

        moveIntervalRef.current = setInterval(() => {
            setCircles((prevCircles) =>
                prevCircles.map((circle) => {
                    let newX = circle.x + circle.dx;
                    let newY = circle.y + circle.dy;

                    if (newX <= 0 || newX >= 560) circle.dx *= -1;
                    if (newY <= 0 || newY >= 360) circle.dy *= -1;

                    return { ...circle, x: newX, y: newY };
                })
            );
        }, 100);

        return () => clearInterval(moveIntervalRef.current);
    }, [isPlay, isMoveMode]);

    useEffect(() => {
        if (!isAutoPlay || !isPlay) return;

        const interval = setInterval(() => {
            const nextCircle = circles.find(
                (c) => c.id === nextNumberRef.current
            );

            if (nextCircle) {
                handleCircleClick(nextCircle.id);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isAutoPlay, isPlay]);

    useEffect(() => {
        if (isPlay && circles.length === 0) {
            setTitle('ALL CLEAR');
            clearInterval(moveIntervalRef.current);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            moveIntervalRef.current = null;
        }
    }, [circles, isPlay]);

    return (
        <div className='game-container'>
            <h2
                style={{
                    fontSize: '20px',
                    color:
                        title == 'ALL CLEAR'
                            ? 'green'
                            : title == 'GAME OVER'
                            ? '#c64732'
                            : '#000',
                }}
            >
                {value == 0 ? 'THE POINT MUST MORE THAN 0' : title}
            </h2>
            <GameHeader
                value={value}
                time={time}
                handleInputValue={handleInputValue}
            />

            <GameControl
                handleIsPlay={handleIsPlay}
                handleIsAutoPlay={handleIsAutoPlay}
                handleMoveMode={handleMoveMode}
                isMoveMode={isMoveMode}
                isPlay={isPlay}
                isAutoPlay={isAutoPlay}
                value={value}
            />

            <GameBoard
                circles={circles}
                handleCircleClick={handleCircleClick}
            />

            <p style={{ marginTop: '4px' }}>
                Next:{' '}
                {nextNumberRef.current - 1 == value
                    ? 'You win!!!'
                    : nextNumberRef.current}
            </p>
        </div>
    );
}
