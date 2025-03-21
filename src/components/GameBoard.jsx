import Circle from "./Circle";

function GameBoard({ circles, handleCircleClick }) {
    return (
        <div className='game-board'>
            {circles.map((circle) => (
                <Circle
                    key={circle.value}
                    circle={circle}
                    onClick={handleCircleClick}
                />
            ))}
        </div>
    );
}

export default GameBoard;
