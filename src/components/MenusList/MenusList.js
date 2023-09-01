import React, { useContext } from 'react'
import classes from './MenusList.module.css'
import MenuCard from './MenuCard/MenuCard';

function MenusList(props) {

  let menusListContent = <h3>Fetching the menu, please wait...</h3>

  if (props.theMenus) {
    menusListContent = props.theMenus?.map((item) => (
      <MenuCard data={item} key={item.id} />
    ))
  }

  return (
    <section className={classes['menus-list']}>
      <div className={classes['wrapper']}>
        {/* {props.theMenus?.map((item) => (
          <MenuCard data={item} key={item.id} />
        ))} */}
        {menusListContent}
      </div>
    </section>
  )
}

export default MenusList