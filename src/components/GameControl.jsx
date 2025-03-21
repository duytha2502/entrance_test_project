function GameControl({
    handleIsPlay,
    handleIsAutoPlay,
    handleMoveMode,
    isPlay,
    isGameActive,
    isMoveMode,
    isAutoPlay,
    value,
}) {
    return (
        <div className='game-btn'>
            <button
                onClick={handleIsPlay}
                className={`${value == 0 || isGameActive ? 'disabledBtn' : ''}`}
            >
                {isPlay ? 'Restart' : 'Play'}
            </button>
            <button onClick={handleIsAutoPlay}>
                Auto Play {isAutoPlay ? 'OFF' : 'ON'}
            </button>
            <button onClick={handleMoveMode}>
                Move Mode {isMoveMode ? 'OFF' : 'ON'}
            </button>
        </div>
    );
}

export default GameControl;
