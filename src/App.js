import React from 'react'
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MenusList from './components/MenusList/MenusList';

// the lists of menus
import menus from './api/dummy-meals'
import Modal from './components/Modal/Modal';

function App() {
  // console.log(menus);

  return (
    <>
      <Header></Header>
      <Hero />
      
      <MenusList theMenus={menus}/>
      <Modal />
    </>
  );
}

export default App;
