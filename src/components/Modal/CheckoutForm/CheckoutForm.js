import React, { useContext, useEffect, useRef, useState } from 'react'
import classes from './CheckoutForm.module.css'
import useInputValidation from '../../../hooks/input-validation'
import Total from '../Total/Total'
import CartContext from '../../../context/CartContext'
import useMealsFirebase from '../../../api/useMealsFirebase'

let init = true;

const CheckoutForm = (props) => {
  const [allValid, setAllValid] = useState(false);
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);

  const {menu: onCartMenu, totalPrice} = useContext(CartContext);
  const { fetchFromFirebase } = useMealsFirebase();

  const {
    value: nameValue,
    onChange: nameOnChange,
    onBlur: nameOnBlur,
    isTouched: nameIsTouched,
    isValid: nameIsValid,
  } = useInputValidation((theValue, isTouched) => theValue.length > 0 && isTouched)

  const {
    value: addressValue,
    onChange: addressOnChange,
    onBlur: addressOnBlur,
    isTouched: addressIsTouched,
    isValid: addressIsValid,
  } = useInputValidation((theValue, isTouched) => theValue.length > 0 && isTouched)

  const {
    value: emailValue,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
    isTouched: emailIsTouched,
    isValid: emailIsValid,
  } = useInputValidation((theValue, isTouched) => theValue.includes('@') && isTouched)

  const submitHandler = async (event) => {
    event.preventDefault();
    nameOnBlur();
    addressOnBlur();
    emailOnBlur();

    if(!nameIsValid) {
      nameRef.current.focus();
    }
    else if (!addressIsValid) {
      addressRef.current.focus();
    }
    else if (!emailIsValid) {
      emailRef.current.focus();
    }

    if(allValid) {
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

      await fetchFromFirebase({
        method: 'POST',
        url: 'https://react-http-practice-e4a0e-default-rtdb.asia-southeast1.firebasedatabase.app/react-food-orders.json/',
        value: theOrder,
      });

      props.submitSuccessHandler();
    }
  }

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }

    setAllValid(nameIsValid && addressIsValid && emailIsValid)
  }, [nameValue, nameIsTouched, addressValue, addressIsTouched, emailValue, emailIsTouched])

  return (
    <div>
      <form className={classes['form']} onSubmit={submitHandler}>
        <div className={classes['input-wrapper']}>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' name='name' onChange={nameOnChange} onBlur={nameOnBlur} value={nameValue} ref={nameRef}/>
          {!nameIsValid && nameIsTouched && <p>Name cant be empty.</p>}
        </div>
        <div className={classes['input-wrapper']}>
          <label htmlFor="address">Address</label>
          <input type="text" id='address' name='address' onChange={addressOnChange} onBlur={addressOnBlur} value={addressValue} ref={addressRef} />
          {!addressIsValid && addressIsTouched && <p>Address cant be empty.</p>}
        </div>
        <div className={classes['input-wrapper']}>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' onChange={emailOnChange} onBlur={emailOnBlur} value={emailValue} ref={emailRef}/>
          {!emailIsValid && emailIsTouched && <p>Please enter a valid email.</p>}
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