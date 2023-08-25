import React from 'react'
import classes from './ModalList.module.css'

function ModalList() {
  return (
    <div className={`${classes['wrapper']} menu-card`}>
      <div className={classes['left']}>
        <h4>Sushi</h4>
        <span className={classes['price']}>$22.99</span>
        <span className={classes['quantity']}>x 1</span>
      </div>
      <div className={classes['right']}>
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  )
}

export default ModalList