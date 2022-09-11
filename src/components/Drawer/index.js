import React from 'react';
import axios from 'axios';
import styles from './Drawer.module.scss';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({onClose, onRemove, items =[], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://62b1d917c7e53744afc2a714.mockapi.io/orders', { items: cartItems });
            setOrderId(data.id);
            setIsOrderComplete(true);
            for (let i = 0; i < cartItems.length; i++){
                const item = cartItems[i];
                await axios.delete('https://62b1d917c7e53744afc2a714.mockapi.io/cart/' + item.id);
                await delay();
            }
            setCartItems([]);
        } catch (error) {
            alert('Не удалось создать заказ')
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onClose} className="cu-p" src="/img/remove.svg" alt="Remove" />
                </h2>

                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={()=>onRemove(obj.id)} className="removeBtn" src="/img/remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul className="cartTotalBlock">
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{(totalPrice/100)*5} руб.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Оформить заказ <img src="/img/strelka.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info 
                        image={isOrderComplete ? "/img/zakaz-ok.jpg" : "/img/empty-cart.jpg"} 
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                    />
                ) }
                

            </div>
        </div>
    );
}

export default Drawer;