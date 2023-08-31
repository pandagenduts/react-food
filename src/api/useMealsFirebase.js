import { useState } from "react";

const useMealsFirebase = () => {
  const [isError, setIsError] = useState(null)
  
  const fetchFromFirebase = async () => {
    try {
      const response = await fetch('https://react-http-practice-e4a0e-default-rtdb.asia-southeast1.firebasedatabase.app/react-food.json/');
      if(!response.ok) throw new Error('something went wrong.')
      const data = await response.json()

      const theMeals = []
      for(const key in data) {
        theMeals.push(data[key]);
      }
      localStorage.setItem('menus', JSON.stringify(theMeals[0]));
      return theMeals[0];
    } 
    catch (error) {
      setIsError(error.message)
    }
  }

  return {
    isError,
    fetchFromFirebase,
  };
}

export default useMealsFirebase;