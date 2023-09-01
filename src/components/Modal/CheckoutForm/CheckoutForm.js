import React, { useContext, useRef } from 'react'
import classes from './CheckoutForm.module.css'
import useInputValidation from '../../../hooks/input-validation'
import Total from '../Total/Total'
import CartContext from '../../../context/CartContext'
import useMealsFirebase from '../../../api/useMealsFirebase'

const CheckoutForm = (props) => {
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);

  const {menu: onCartMenu, totalPrice} = useContext(CartContext);
  const { fetchFromFirebase } = useMealsFirebase();

  // console.log(onCartMenu);
  // console.log(totalPrice);

  const {
    value: nameValue,
    onChange: nameOnChange,
    onBlur: nameOnBlur,
    isError: nameIsError,
    reset: nameReset,
  } = useInputValidation((theValue, isTouched) => !theValue.length > 0 && isTouched)

  const {
    value: addressValue,
    onChange: addressOnChange,
    onBlur: addressOnBlur,
    isError: addressIsError,
    reset: addressReset,
  } = useInputValidation((theValue, isTouched) => !theValue.length > 0 && isTouched)

  const {
    value: emailValue,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
    isError: emailIsError,
    reset: emailReset,
  } = useInputValidation((theValue, isTouched) => !theValue.includes('@') && isTouched)

  const submitHandler = event => {
    event.preventDefault();
    nameOnBlur();
    addressOnBlur();
    emailOnBlur();

    if(nameIsError) {
      nameRef.current.focus();
    }
    else if (addressIsError) {
      addressRef.current.focus();
    }
    else if (emailIsError) {
      emailRef.current.focus();
    }

    if(!nameIsError && !addressIsError && !emailIsError) {
      const orderMenu = []
      onCartMenu.forEach(menu => {
        orderMenu.push({
          menu: menu.title,
          amount: menu.amount,
        })
      })

      const recipient = {
        name: nameValue,
        address: addressValue,
        email: emailValue,
      }

      const theOrder = {
        recipient: recipient,
        menu: orderMenu,
        totalPrice: totalPrice,
      }

      fetchFromFirebase({
        method: 'POST',
        url: 'https://react-http-practice-e4a0e-default-rtdb.asia-southeast1.firebasedatabase.app/react-food-orders.json/',
        value: theOrder,
      });
    }
  }

  return (
    <div>
      <form className={classes['form']} onSubmit={submitHandler}>
        <div className={classes['input-wrapper']}>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' name='name' onChange={nameOnChange} onBlur={nameOnBlur} value={nameValue} ref={nameRef}/>
          {nameIsError && <p>Name cant be empty.</p>}
        </div>
        <div className={classes['input-wrapper']}>
          <label htmlFor="address">Address</label>
          <input type="text" id='address' name='address' onChange={addressOnChange} onBlur={addressOnBlur} value={addressValue} ref={addressRef} />
          {addressIsError && <p>Address cant be empty.</p>}
        </div>
        <div className={classes['input-wrapper']}>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' onChange={emailOnChange} onBlur={emailOnBlur} value={emailValue} ref={emailRef}/>
          {emailIsError && <p>Please enter a valid email.</p>}
        </div>
        <Total theTotal={props.theTotal} />
        <div className={classes['button-wrapper']}>
          <button onClick={props.onCloseForm}>Close</button>
          <button>Checkout</button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm