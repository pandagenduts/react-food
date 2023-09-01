import React, { useReducer } from 'react'
import CartContext from './CartContext'



// use like this:
// formatter.format(yourValue);
// const total = formatter.format(props.theTotal);

const cartReducer = (state, action) => {
  // console.log(action.type);
  // console.log(action.value);

  // return {
  //   menu: state.menu,
  //   amount: state.amount,
  // }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const prevMenu = [...state.menu]
  let theAmount = 0;
  let totalPrice = 0;
  let formattedTotalPrice = '';
  const isMenuExist = prevMenu.find(menu => menu.id === action.value.id)

  // this bad boi return the total item on cart, based on latest menu thrown at parameter latestMenu
  function totalItemOnCart(latestMenu) {
    latestMenu.forEach(menu => {
      theAmount += +menu.amount
    })
  }

  function calculateTotalPrice(latestMenu) {
    latestMenu.forEach(menu => {
      const thisMenuTotalPrice = menu.price * menu.amount;
      totalPrice += thisMenuTotalPrice;
    })
    formattedTotalPrice = formatter.format(totalPrice);
  }

  if (action.type === 'ON_ADD') {
    if (isMenuExist) {
      isMenuExist.amount += action.value.amount;
    } else {
      prevMenu.push(action.value)
    }
    totalItemOnCart(prevMenu);
    calculateTotalPrice(prevMenu);

    return {
      menu: prevMenu,
      amount: theAmount,
      totalPrice: formattedTotalPrice
    }
  }
  else if (action.type === 'ON_REMOVE') {
    if (isMenuExist.amount > 1) {
      isMenuExist.amount -= 1;
      totalItemOnCart(prevMenu);
      calculateTotalPrice(prevMenu);

      return {
        menu: prevMenu,
        amount: theAmount,
        totalPrice: formattedTotalPrice
      }
    }
    else if (isMenuExist.amount <= 1) {
      const deleteMenu = prevMenu.filter(menu => menu.id !== action.value.id);
      totalItemOnCart(deleteMenu);
      calculateTotalPrice(deleteMenu);

      return {
        menu: deleteMenu,
        amount: theAmount,
        totalPrice: formattedTotalPrice
      }
    }
  }

}

const CartProvider = (props) => {
  const [onCart, dispatchOnCart] = useReducer(cartReducer, {
    menu: [],
    amount: 0,
    totalPrice: 0,
  })
  
  const onAddHandler = (item) => {
    dispatchOnCart({type: 'ON_ADD', value: item})
  }

  const onRemoveHandler = (item) => {
    dispatchOnCart({type: 'ON_REMOVE', value: item})
  }

  const contextValue = {
    menu: onCart.menu,
    amount: onCart.amount,
    totalPrice: onCart.totalPrice,
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