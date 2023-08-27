import React from 'react'
import classes from './ModalList.module.css'

function ModalList(props) {
  const {title, price, amount, id} = props.menuData

  const onDecrease = () => {
    const theMenu = {
      id: id,
      amount: -1
    }
    props.cartHandler('ON_REMOVE', theMenu)
  }

  const onIncrease = () => {
    const theMenu = {
      id: id,
      amount: 1
    }
    props.cartHandler('ON_ADD', theMenu)
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