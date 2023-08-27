import React from 'react'
import classes from './Header.module.css'
import CartIcon from './CartIcon/CartIcon'


function Header(props) {
  return (
    <header className={classes['header']}>
      <div className={classes['container']}>
        <p className={classes['logo']}>ReactMeals</p>

        <button className={classes.cart} onClick={props.isModalHandler}>
          <CartIcon />
          <span className={classes['button-label']}>Your Cart</span>
          <span className={classes['number']}>{props.cartAmount}</span>

        </button>

      </div>
    </header>
  )
}

export default Header