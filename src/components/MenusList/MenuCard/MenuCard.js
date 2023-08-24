import React from 'react'
import classes from './MenuCard.module.css'

const MenuCard = (props) => {
  const { name: title, description: desc, price } = props.data;

  return (
    <div className={`${classes['card']} menu-card`}>

      <div className="inner_left">
        <h4>{title}</h4>
        <p>{desc}</p>
        <span>${price}</span>
      </div>

      <div className={classes['inner_right']}>
        <div className={classes['wrapper']}>
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" id="amount" />
        </div>
        <button>+ Add</button>
      </div>

    </div>
  )
}

export default MenuCard