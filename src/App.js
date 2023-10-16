import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MenusList from './components/MenusList/MenusList';
import Modal from './components/Modal/Modal';
import CartProvider from './context/CartProvider';
import DUMMY_MEALS from './api/dummy-meals';

// list of menus from firebase
import useMealsFirebase from './api/useMealsFirebase';

function App() {
  const [isModal, setIsModal] = useState(null)
  const [menusV2, setMenusV2] = useState(DUMMY_MEALS)

  // const { fetchFromFirebase } = useMealsFirebase()

  // useEffect(() => {
  //   (async () => {
  //     const theMeals = await fetchFromFirebase({
  //       method: 'GET',
  //       url: 'https://react-http-practice-e4a0e-default-rtdb.asia-southeast1.firebasedatabase.app/react-food.json/',
  //     });
  //     setMenusV2(theMeals);
  //   })();
  // }, [fetchFromFirebase])

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
