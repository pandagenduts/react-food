import React from 'react'
import classes from './MenusList.module.css'
import MenuCard from './MenuCard/MenuCard';
import { Skeleton } from 'antd';

function MenusList(props) {

  let menusListContent = <Skeleton active />

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