import React, { useRef } from 'react'
import classes from './MenuCard.module.css'

const MenuCard = (props) => {
  const { name: title, description: desc, price, id } = props.data;
  const inputValue = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const theMenu = {
      id: id,
      title: title,
      price: price,
      amount: +inputValue.current.value
    }

    props.cartHandler('ON_ADD', theMenu)
  }

  return (
    <div className={`${classes['card']} menu-card`}>

      <div className="inner_left">
        <h4>{title}</h4>
        <p>{desc}</p>
        <span>${price}</span>
      </div>

      <div className={classes['inner_right']}>
        <form onSubmit={submitHandler}>
          <div className={classes['wrapper']}>
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" id="amount" defaultValue={1} min={1} max={5} ref={inputValue}/>
          </div>
          <button>+ Add</button>
        </form>
      </div>

    </div >
  )
}

export default MenuCard