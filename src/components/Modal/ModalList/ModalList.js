import React, { useContext } from 'react'
import classes from './ModalList.module.css'
import CartContext from '../../../context/CartContext'


function ModalList(props) {
  const {title, price, amount, id} = props.menuData
  const {addItem, removeItem} = useContext(CartContext)

  const onDecrease = () => {
    const theMenu = {
      id: id
    }
    removeItem(theMenu);
  }

  const onIncrease = () => {
    const theMenu = {
      id: id,
      amount: 1
    }
    addItem(theMenu);
  }

  return (
    <div className={`${classes['wrapper']} menu-card`}>
      <div className={classes['left']}>
        <h4>{title}</h4>
        <span className={classes['price']}>${price}</span>
        <span className={classes['quantity']}>x {amount}</span>
      </div>
      <div className={classes['right']}>
        <button onClick={onDecrease}>-</button>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  )
}

export default ModalList