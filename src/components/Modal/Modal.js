import React from 'react'
import classes from './Modal.module.css'


function Modal() {
  return (
    <div className={classes['overlay']}>
      <div className={classes['modal']}>
        <h1>this is modal</h1>
      </div>
    </div>
  )
}

export default Modal