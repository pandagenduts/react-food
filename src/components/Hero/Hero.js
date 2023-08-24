import React from 'react'
import classes from './Hero.module.css'
import backgroundImage from '../../assets/react-food-cover.jpg'

function Hero() {
  return (
    <section style={{backgroundImage: `url(${backgroundImage})`}} className={classes['hero']}>
      {/* <div  className={classes['background']}></div> */}
      <div className={classes['content']}>

        <h1>Delicious Food, Delivered To You</h1>
        <p>
          Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home. <br /> <br/>
          All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!
        </p>
      </div>
    </section>
  )
}

export default Hero