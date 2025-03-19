function Circle({ circle, onClick }) {
    return (
        <div
            className={`circle ${circle.countdown ? 'clickedColor' : ''}`}
            onClick={() => onClick(circle.id)}
            style={{
                left: circle.x,
                top: circle.y,
                opacity: circle.countdown ? circle.countdown / 3 : 1,
            }}
        >
            <p>{circle.id}</p>
            {circle.countdown !== undefined && (
                <p style={{ color: '#fff' }}>{circle.countdown.toFixed(1)}</p>
            )}
        </div>
    );
}

export default Circle;
