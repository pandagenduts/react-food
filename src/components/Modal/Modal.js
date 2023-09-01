import React, { useContext, useState } from 'react'
import classes from './Modal.module.css'
import ModalList from './ModalList/ModalList'
import Total from './Total/Total'
import CartContext from '../../context/CartContext';
import CheckoutForm from './CheckoutForm/CheckoutForm';


function Modal(props) {
  const { menu: menuOnCart } = useContext(CartContext);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  let menuList = <p>Your cart feels a bit lonely. <br />Explore our menu and add some delicious items to your cart!</p>;

  if (menuOnCart.length !== 0) {
    menuList = menuOnCart.map(menu => (
      <ModalList menuData={menu} key={menu.id} cartHandler={props.cartHandler} />
    ))
  }

  const toCheckout = () => {
    setShowCheckoutForm(true);
  }

  const closeTheForm = () => {
    props.isModalHandler();
    setShowCheckoutForm(false);
  }

  return (
    <div className={classes['modal']}>
      <div className={classes['overlay']} onClick={closeTheForm}></div>
      <div className={classes['content']}>
        {menuList}

        {showCheckoutForm && <CheckoutForm onCloseForm={closeTheForm} />}

        {menuOnCart.length !== 0 && !showCheckoutForm ? <Total /> : ''}

        {!showCheckoutForm &&
          <div className={classes['button-wrapper']}>
            <button onClick={closeTheForm}>Close</button>
            {menuOnCart.length !== 0 && !showCheckoutForm && <button onClick={toCheckout}>Order</button>}
          </div>
        }

      </div>
    </div>
  )
}

export default Modal