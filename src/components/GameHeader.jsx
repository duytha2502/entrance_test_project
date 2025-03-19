function GameHeader({ value, time, handleInputValue }) {
    return (
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
    );
}

export default GameHeader;
