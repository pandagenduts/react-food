import React from 'react'
import classes from './Modal.module.css'
import ModalList from './ModalList/ModalList'
import Total from './Total/Total'


function Modal(props) {
  return (
    <div className={classes['modal']}>
      <div className={classes['overlay']} onClick={props.isModalHandler}></div>
      <div className={classes['content']}>
        <ModalList />
        <ModalList />
        <ModalList />

        <Total />
        <div className={classes['button-wrapper']}>
          <button onClick={props.isModalHandler}>Close</button>
          <button>Order</button>
        </div>
      </div>
    </div>
  )
}

export default Modal