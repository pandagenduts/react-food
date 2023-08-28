import React from 'react'
import classes from './Total.module.css'

function Total(props) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // use like this:
  // formatter.format(yourValue);
  const total = formatter.format(props.theTotal);
  return (
    <div className={classes['wrapper']}>
      <span>Total</span>
      <span>{total}</span>
    </div>
  )
}

export default Total