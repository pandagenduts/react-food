import React from 'react'
import classes from './MenusList.module.css'
import MenuCard from './MenuCard/MenuCard';

function MenusList(props) {
  const onCartMenu = props.onCart.menu

  return (
    <section className={classes['menus-list']}>
      <div className={classes['wrapper']}>
        {props.theMenus.map((item) => {
          const isMenuExist = onCartMenu.find(menu => menu.id === item.id)
          let onCartAmount = 0;
          if (onCartMenu.length !== 0 && isMenuExist) {
            onCartAmount = isMenuExist.amount;
          }

          return (<MenuCard data={item} key={item.id} cartHandler={props.cartHandler} onCartAmount={onCartAmount}/>)
        })}
      </div>
    </section>
  )
}

export default MenusList