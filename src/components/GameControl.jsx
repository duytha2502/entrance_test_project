function GameControl({
    handleIsPlay,
    handleIsAutoPlay,
    isPlay,
    isAutoPlay,
    value,
}) {
    console.log(value);
    return (
        <div className='game-btn'>
            <button
                onClick={handleIsPlay}
                className={`${value == 0 ? 'disabledBtn' : ''}`}
            >
                {isPlay ? 'Restart' : 'Play'}
            </button>
            <button onClick={handleIsAutoPlay}>
                Auto Play {isAutoPlay ? 'OFF' : 'ON'}
            </button>
        </div>
    );
}

export default GameControl;
