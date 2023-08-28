import React from 'react'
import classes from './Modal.module.css'
import ModalList from './ModalList/ModalList'
import Total from './Total/Total'


function Modal(props) {
  const { menu: theMenu } = props.onCart;
  // console.log(theMenu);

  let menuList = <p>Your cart feels a bit lonely. <br />Explore our menu and add some delicious items to your cart!</p>;
  let theTotal = 0;
  if( theMenu.length !== 0 ) {
    menuList = theMenu.map(menu => (
      <ModalList menuData={menu} key={menu.id} cartHandler={props.cartHandler}/>
    ))

    theMenu.forEach(item => {
      const totalPrice = item.price * item.amount;
      theTotal += totalPrice;
    })
  }

  const onOrderhandler = () => {
    console.log('Ordering...');
  }

  return (
    <div className={classes['modal']}>
      <div className={classes['overlay']} onClick={props.isModalHandler}></div>
      <div className={classes['content']}>
        {menuList}

        {theMenu.length !== 0 ? <Total theTotal={theTotal} /> : ''}
        
        <div className={classes['button-wrapper']}>
          <button onClick={props.isModalHandler}>Close</button>
          {theMenu.length !== 0 ? <button onClick={onOrderhandler}>Order</button> : ''}
        </div>
      </div>
    </div>
  )
}

export default Modal