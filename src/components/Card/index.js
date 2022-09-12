import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';
import styles from './Card.module.scss'; 

function Card({
    id, 
    onFavourite, 
    onPlus, 
    title, 
    imageUrl, 
    price, 
    favourited = false, 
    added = false, 
    loading = false}) {

    const { isItemAdded } = React.useContext(AppContext);
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavourite, setIsFavourite] = React.useState(favourited);
    const obj = {id, parentId: id, title, imageUrl, price};

    const onClickPlus = () => {
        onPlus(obj);
        setIsAdded(!isAdded);
    }

    const onClickFavourite = () => {
        onFavourite(obj);
        setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
            {
                loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                  </ContentLoader>
                ) : (
                    <>
                    {onClickFavourite && <div className={styles.favourite} onClick={onClickFavourite}>
                        <img src={isFavourite? "img/like.svg" : "img/unlike.svg"} alt="Unliked"/>
                    </div>}
                    <img width='100%' height={135} src={imageUrl} alt="Sneackers"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onClickPlus && <img 
                            className={styles.plus} 
                            onClick={onClickPlus} 
                            width={32} height={32} 
                            src={isItemAdded(id)? "img/added.svg" : "img/unadded.svg"} 
                            alt=""
                        />}
                    </div>
                    </>
                )
            }
        </div>
    );
}

export default Card;