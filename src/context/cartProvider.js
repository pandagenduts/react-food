import React, { useReducer } from 'react'
import CartContext from './CartContext'

const cartReducer = (state, action) => {
  // console.log(action.type);
  // console.log(action.value);

  // return {
  //   menu: state.menu,
  //   amount: state.amount,
  // }
  const prevMenu = [...state.menu]
  let theAmount = 0;
  const isMenuExist = prevMenu.find(menu => menu.id === action.value.id)

  // this bad boi return the total item on cart, based on latest menu thrown at parameter latestMenu
  function totalItemOnCart(latestMenu) {
    latestMenu.forEach(menu => {
      theAmount += +menu.amount
    })
  }

  if (action.type === 'ON_ADD') {
    if (isMenuExist) {
      isMenuExist.amount += action.value.amount;
    } else {
      prevMenu.push(action.value)
    }
    totalItemOnCart(prevMenu);

    return {
      menu: prevMenu,
      amount: theAmount,
    }
  }
  else if (action.type === 'ON_REMOVE') {
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

}

const CartProvider = (props) => {
  const [onCart, dispatchOnCart] = useReducer(cartReducer, {
    menu: [],
    amount: 0,
  })
  
  console.log(onCart);

  const onAddHandler = (item) => {
    dispatchOnCart({type: 'ON_ADD', value: item})
  }

  const onRemoveHandler = (item) => {
    dispatchOnCart({type: 'ON_REMOVE', value: item})
  }

  const contextValue = {
    menu: onCart.menu,
    amount: onCart.amount,
    addItem: onAddHandler,
    removeItem: onRemoveHandler,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;