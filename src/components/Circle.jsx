function Circle({ circle, onClick }) {
    return (
        <div
            className={`circle ${circle.countdown ? 'clickedColor' : ''}`}
            onClick={() => onClick(circle.value)}
            style={{
                left: circle.x,
                top: circle.y,
                opacity: circle.countdown ? circle.countdown / 3 : 1,
                zIndex: -circle.value,
            }}
        >
            <p>{circle.value}</p>
            {circle.countdown !== undefined && (
                <p style={{ color: '#fff' }}>{circle.countdown.toFixed(1)}</p>
            )}
        </div>
    );
}

export default Circle;
