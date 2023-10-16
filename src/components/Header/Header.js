import React, { useContext } from 'react'
import classes from './Header.module.css'
import CartIcon from './CartIcon/CartIcon'
import CartContext from '../../context/CartContext'

function Header(props) {
  const {amount: cartTotal} = useContext(CartContext)

  return (
    <header className={classes['header']}>
      <div className={classes['container']}>
        <p className={classes['logo']}>ReactMeals</p>

        <button className={classes.cart} onClick={props.isModalHandler}>
          <CartIcon />
          <span className={classes['button-label']}>Your Cart</span>
          <span className={classes['number']}>{cartTotal}</span>

        </button>

      </div>
    </header>
  )
}

export default Header