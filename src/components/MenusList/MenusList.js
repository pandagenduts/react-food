import React from 'react'
import classes from './MenusList.module.css'
import MenuCard from './MenuCard/MenuCard';

function MenusList(props) {
  // console.log(props.onCart);
  // console.log(props.theMenus);
  return (
    <section className={classes['menus-list']}>
      <div className={classes['wrapper']}>
        {props.theMenus.map((item) => (
          <MenuCard data={item} key={item.id} cartHandler={props.cartHandler} onCart={props.onCart}/>
        ))}
      </div>
    </section>
  )
}

export default MenusList