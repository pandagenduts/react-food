import React from 'react'
import classes from './Modal.module.css'
import ModalList from './ModalList/ModalList'
import Total from './Total/Total'


function Modal(props) {
  const { menu: theMenu } = props.onCart;


  let menuList = <p>No data found.</p>;
  if( theMenu.length !== 0 ) {
    menuList = theMenu.map(menu => (
      <ModalList menuData={menu} key={menu.id} cartHandler={props.cartHandler}/>
    ))
  }

  return (
    <div className={classes['modal']}>
      <div className={classes['overlay']} onClick={props.isModalHandler}></div>
      <div className={classes['content']}>
        {menuList}
        {/* <ModalList /> */}
        {/* <ModalList /> */}
        {/* <ModalList /> */}

        {theMenu.length !== 0 ? <Total /> : ''}
        
        <div className={classes['button-wrapper']}>
          <button onClick={props.isModalHandler}>Close</button>
          <button>Order</button>
        </div>
      </div>
    </div>
  )
}

export default Modal