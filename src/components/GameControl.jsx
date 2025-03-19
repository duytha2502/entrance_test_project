function GameControl({ handleIsPlay, handleIsAutoPlay, isPlay, isAutoPlay }) {
    return (
        <div className='game-btn'>
            <button onClick={handleIsPlay}>
                {isPlay ? 'Restart' : 'Play'}
            </button>
            <button onClick={handleIsAutoPlay}>
                Auto Play {isAutoPlay ? 'OFF' : 'ON'}
            </button>
        </div>
    );
}

export default GameControl;
