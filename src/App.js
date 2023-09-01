import React, { useReducer, useState, useEffect } from 'react'
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MenusList from './components/MenusList/MenusList';
import Modal from './components/Modal/Modal';
import CartProvider from './context/CartProvider';

// the lists of menus
import menus from './api/dummy-meals'

// list of menus from firebase
import useMealsFirebase from './api/useMealsFirebase';

function App() {
  const [isModal, setIsModal] = useState(null)
  const [menusV2, setMenusV2] = useState(null)

  const { isError: isFetchError, fetchFromFirebase } = useMealsFirebase()

  localStorage.removeItem('menus');
  useEffect(() => {
    const localMenu = JSON.parse(localStorage.getItem('menus'));

    if(localMenu) {
      setMenusV2(localMenu);
    }
    else if (!localMenu) {
      (async () => {
        const theMeals = await fetchFromFirebase({
          method: 'GET',
          url: 'https://react-http-practice-e4a0e-default-rtdb.asia-southeast1.firebasedatabase.app/react-food.json/',
        });
        setMenusV2(theMeals);
      })();
    }
  }, [])

  const isModalHandler = () => {
    setIsModal(prev => !prev)
  }

  return (
    <CartProvider>
      <Header isModalHandler={isModalHandler} />
      <Hero />

      <MenusList theMenus={menusV2} />
      
      {isModal && <Modal isModalHandler={isModalHandler} />}

    </CartProvider>
  );
}

export default App;
