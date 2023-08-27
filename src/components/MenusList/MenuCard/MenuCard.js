import React from 'react'
import classes from './MenuCard.module.css'

const MenuCard = (props) => {
  const { name: title, description: desc, price, id } = props.data;

  const addHandler = () => {
    const theMenu = {
      id: id,
      title: title,
      price: price,
      amount: 1
    }

    props.cartHandler('ON_ADD', theMenu)
  }

  const onBlurHandler = event => {
    console.log(event.target.value);
    if(event.target.value >= 0) {
      const theMenu = {
        id: id,
        title: title,
        price: price,
        amount: event.target.value,
      }
      props.cartHandler('ON_CHANGE', theMenu)
    }
  }

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
          <input type="number" name="amount" id="amount" onBlur={onBlurHandler}/>
        </div>
        <button onClick={addHandler}>+ Add</button>
      </div>

    </div>
  )
}

export default MenuCard