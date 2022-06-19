function Card() {
    return (
        <div className="card">
            <div className="favourite">
            <img src="/img/unlike.svg" alt="Unliked"/>
            </div>
            <img width={133} height={122} src="/img/1.jpg" alt="Sneackers"/>
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
            </div>
            <button className="button">
                <img width={11} height={11} src="/img/plus.svg" alt=""/>
            </button>
            </div>
        </div>
    );
}

export default Card;