import React, {useContext} from 'react'
import classes from './Total.module.css'
import CartContext from '../../../context/CartContext';

function Total(props) {
  const {totalPrice} = useContext(CartContext);

  return (
    <div className={classes['wrapper']}>
      <span>Total</span>
      <span>{totalPrice}</span>
    </div>
  )
}

export default Total