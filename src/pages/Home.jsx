import Card from '../components/Card';

function Home({
  items, 
  cartItems, 
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToFavourite, 
  onAddToCart,
  isLoading
}) {
    const renderItems = () => {


      return (isLoading ? [...Array(10)] : items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())))
      .map((obj, index) => (
        <Card 
          key={index}
          onFavourite = {(item) => onAddToFavourite(item)}
          onPlus = {(item) => onAddToCart(item)}
          added = {cartItems.some(item => Number(item.id) === Number(obj.id))}
          loading = {isLoading}
          {...obj}
        />
      ));
    };

    return (
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            {searchValue && <img onClick={()=>setSearchValue('')} className="clear cu-p" src="/img/remove.svg" alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
            {
              renderItems()
            }
        </div>
      </div>
    );
}

export default Home;