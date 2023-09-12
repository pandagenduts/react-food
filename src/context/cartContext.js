import React from 'react'

const CartContext = React.createContext({
  menu: [],
  amount: 0,
  totalPrice: 0,
  addItem: (id) => {},
  removeItem: (id) => {},
  clearCart: () => {},
})

export default CartContext;