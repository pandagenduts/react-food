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

    // console.log(localMenu);
    // if(localMenu) {
    //   setMenusV2(localMenu);
    // }
    // else if (!localMenu) {
    //   (async () => {
    //     console.log('do the fetch');
    //     const theMeals = await fetchFromFirebase();
    //     console.log('fetch done');
    //     // console.log(theMeals);
    //     setMenusV2(theMeals);
    //   })();
    // }
  }, [])

  console.log(menusV2);

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
