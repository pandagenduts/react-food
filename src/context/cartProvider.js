import React, { useReducer } from 'react'
import cartContext from './cartContext'

const onCartInitValue = {
  menu: [],
  amount: 0,
}

const CartProvider = () => {
  const [onCart, dispatchOnCart] = useReducer(cartReducer, onCartInitValue)
  

  
  return (
    <cartContext.Provider value={onCart}>

    </cartContext>
  )
}

export default CartProvider;