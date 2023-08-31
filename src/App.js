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

// function cartReducer(state, action) {
//   // console.log(action.type);
//   // console.log(action.value);
//   const prevMenu = [...state.menu]
//   let theAmount = 0;
//   const isMenuExist = prevMenu.find(menu => menu.id === action.value.id)

//   // this bad boi return the total item on cart, based on latest menu thrown at parameter latestMenu
//   function totalItemOnCart(latestMenu) {
//     latestMenu.forEach(menu => {
//       theAmount += +menu.amount
//     })
//   }

//   if (action.type === 'ON_ADD') {
//     if (isMenuExist) {
//       isMenuExist.amount += action.value.amount;
//     } else {
//       prevMenu.push(action.value)
//     }
//     totalItemOnCart(prevMenu);

//     return {
//       menu: prevMenu,
//       amount: theAmount,
//     }
//   }
//   else if (action.type === 'ON_REMOVE') {
//     if (isMenuExist.amount > 1) {
//       isMenuExist.amount -= 1;
//       totalItemOnCart(prevMenu);
//       return {
//         menu: prevMenu,
//         amount: theAmount,
//       }
//     }
//     else if (isMenuExist.amount <= 1) {
//       const deleteMenu = prevMenu.filter(menu => menu.id !== action.value.id);
//       totalItemOnCart(deleteMenu);
//       return {
//         menu: deleteMenu,
//         amount: theAmount,
//       }
//     }
//   }
// }

function App() {
  const [isModal, setIsModal] = useState(null)
  // const [onCart, dispatchOnCart] = useReducer(cartReducer, {
  //   menu: [],
  //   amount: 0,
  // })

  // const { isError: isFetchError, fetchFromFirebase } = useMealsFirebase()

  // useEffect(() => {
  //   const localMenu = localStorage.getItem('menus');
  //   console.log(localMenu);

  //   if (!localMenu) {
  //     (async () => {
  //       const theMeals = await fetchFromFirebase();
  //       console.log(theMeals);
  //     })();
  //   }
  // }, [])


  const isModalHandler = () => {
    setIsModal(prev => !prev)
  }

  return (
    <CartProvider>
      <Header isModalHandler={isModalHandler} />
      <Hero />

      <MenusList theMenus={menus} />
      {isModal && <Modal isModalHandler={isModalHandler} />}

    </CartProvider>
  );
}

export default App;
