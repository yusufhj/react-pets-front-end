import { useState, useEffect } from 'react';
// services
import * as petService from './services/petService';
// components
import PetList from './components/PetList';

const App = () => {
  const [petList, setPetList] = useState([]);

  // Create a new useEffect
  useEffect(() => {
    // create new async function
    async function getPets() {
      try {
        // call the index function from petService
        const pets = await petService.index();

        // Don't forget the pass the error object to the new Error
        if (pets.error) {
          throw new Error(pets.error);
        }
        // set the petList state to the pets
        setPetList(pets);
      } catch (error) {
        console.log(error);
      }
    };
      // call the fetchPets function
    getPets();
  }, []);

  return <PetList petList={petList} />;
};

export default App;