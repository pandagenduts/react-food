import React, { useReducer, useState } from 'react'
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MenusList from './components/MenusList/MenusList';

// the lists of menus
import menus from './api/dummy-meals'
import Modal from './components/Modal/Modal';

function cartReducer (state, action) {
  console.log(action.type);
  console.log(action.value);

}

function App() {
  // console.log(menus);
  const [isModal, setIsModal] = useState(null)
  // const [onCart, setOnCart] = useState([])
  const [onCart, dispatchOnCart] = useReducer(cartReducer, {
    menu: [],
    amount: 0
  })

  const isModalHandler = () => {
    setIsModal(prev => !prev)
  }

  const cartHandler = (type, theMenu) => {
    // setOnCart(prev => {
    //   const prevOnCart = [...prev]
    //   prevOnCart.push(theMenu)
    //   return prevOnCart;
    // })
    // console.log(theMenu);

    dispatchOnCart({type: type, value: theMenu})
  }

  // console.log(onCart);
  return (
    <>
      <Header isModalHandler={isModalHandler}></Header>
      <Hero />

      <MenusList theMenus={menus} cartHandler={cartHandler} />
      {isModal && <Modal isModalHandler={isModalHandler} />}

    </>
  );
}

export default App;
