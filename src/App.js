import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AppContext from './context';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const itemsResponse = await axios.get('https://62b1d917c7e53744afc2a714.mockapi.io/items');
        const cartItemsResponse = await axios.get('https://62b1d917c7e53744afc2a714.mockapi.io/cart');
        const favouritesResponse = await axios.get('https://62b1d917c7e53744afc2a714.mockapi.io/favourites');
  
        setIsLoading(false);  
  
        setCartItems(cartItemsResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
      }
    }

    fetchData();
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62b1d917c7e53744afc2a714.mockapi.io/cart/${findItem.id}`);
      }
      else {
        const { data } = await axios.post('https://62b1d917c7e53744afc2a714.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, data]); 
      }
    }
    catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62b1d917c7e53744afc2a714.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
      console.log(cartItems);
    } catch (error) {
      alert('Ошибка при удалении из корзины');
    }
  }

  const onAddToFavourite = async (obj) => {
    try{
      if (favourites.find(item => item.id === obj.id)) {
        axios.delete(`https://62b1d917c7e53744afc2a714.mockapi.io/favourites/${obj.id}`);
      }
      else {
        const { data } = await axios.post('https://62b1d917c7e53744afc2a714.mockapi.io/favourites', obj);
        setFavourites((prev) => [...prev, data]);
      }
    }
    catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{ 
      items, 
      cartItems, 
      favourites, 
      onAddToFavourite, 
      setCartOpened, 
      setCartItems,
      isItemAdded }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>}
        
        <Header onClickCart={()=>setCartOpened(true)} />  

        <Routes>
          <Route path="/" element={
            <Home 
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavourite={onAddToFavourite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          } exact />
          <Route path="/favourites" element={
            <Favourites 
            onAddToFavourite={onAddToFavourite}
            /> 
          } exact />
          <Route path="/orders" element={
            <Orders 
            /> 
          } exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
