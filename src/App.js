import React, { useReducer, useState } from 'react'
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MenusList from './components/MenusList/MenusList';
import Modal from './components/Modal/Modal';

// the lists of menus
import menus from './api/dummy-meals'

function cartReducer(state, action) {
  // console.log(action.type);
  // console.log(action.value);
  const prevMenu = [...state.menu]
  let theAmount = 0;
  const isMenuExist = prevMenu.find(menu => menu.id === action.value.id)

  // this bad boi return the total item on cart, based on latest menu thrown at parameter latestMenu
  function totalItemOnCart(latestMenu) {
    latestMenu.forEach(menu => {
      theAmount += +menu.amount
    })
  }

  switch (action.type) {
    case 'ON_ADD': {
      if (isMenuExist) {
        isMenuExist.amount += 1;
      } else {
        prevMenu.push(action.value)
      }
      totalItemOnCart(prevMenu);

      return {
        menu: prevMenu,
        amount: theAmount,
      }
    }
    case 'ON_REMOVE': {
      if (isMenuExist.amount > 1) {
        isMenuExist.amount -= 1;
        totalItemOnCart(prevMenu);
        return {
          menu: prevMenu,
          amount: theAmount,
        }
      }
      else if (isMenuExist.amount <= 1) {
        const deleteMenu = prevMenu.filter(menu => menu.id !== action.value.id);
        totalItemOnCart(deleteMenu);
        return {
          menu: deleteMenu,
          amount: theAmount,
        }
      }
    }
    case 'ON_CHANGE': {
      if(isMenuExist) {
        if(action.value.amount === 0) {
          const deleteMenu = prevMenu.filter(menu => menu.id !== action.value.id)
          totalItemOnCart(deleteMenu);
          return {
            menu: deleteMenu,
            amount: theAmount,
          }
        }
        else {
          isMenuExist.amount = action.value.amount
        }
      } 
      else {
        prevMenu.push(action.value)
      }

      totalItemOnCart(prevMenu);
      return {
        menu: prevMenu,
        amount: theAmount,
      }
    }
  }
}

function App() {
  const [isModal, setIsModal] = useState(null)
  const [onCart, dispatchOnCart] = useReducer(cartReducer, {
    menu: [],
    amount: 0,
  })

  const isModalHandler = () => {
    setIsModal(prev => !prev)
  }

  const cartHandler = (type, theMenu) => {
    dispatchOnCart({ type: type, value: theMenu })
  }

  return (
    <>
      <Header isModalHandler={isModalHandler} cartAmount={onCart.amount} />
      <Hero />

      <MenusList theMenus={menus} cartHandler={cartHandler} onCart={onCart} />
      {isModal && <Modal isModalHandler={isModalHandler} onCart={onCart} cartHandler={cartHandler} />}

    </>
  );
}

export default App;
