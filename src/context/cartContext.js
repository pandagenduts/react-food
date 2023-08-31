import React from 'react'

const cartContext = React.createContext({
  menu: [],
  amount: 0,
  addItem: id => {},
  removeItem: id => {},
})

export default cartContext;