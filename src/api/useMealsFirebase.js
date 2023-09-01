import { useState } from "react";

const useMealsFirebase = () => {
  const [isError, setIsError] = useState(null)

  // fetchConfig accept object, which property is method, url, value
  // method, url and value is mandatory for POST method
  // for GET method, only first 2 is mandatory

  const fetchFromFirebase = async (fetchConfig) => {
    try {
      console.log(fetchConfig);
      const requestOption = {
        method: fetchConfig.method,
        headers: {
          "Content-Type": 'application/json'
        }
      }      

      if (fetchConfig.method === 'POST') {
        requestOption.body = JSON.stringify(fetchConfig.value);
      }

      const response = await fetch(fetchConfig.url, requestOption);
      if(!response.ok) throw new Error('something went wrong.')

      const data = await response.json()

      if(fetchConfig.method === 'GET') {
        const theMeals = []
        for(const key in data) {
          theMeals.push(data[key]);
        }
        localStorage.setItem('menus', JSON.stringify(theMeals[0]));
        return theMeals[0];
      }
      else if (fetchConfig.method === 'POST') {
        console.log('order has been submitted!');
      }

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