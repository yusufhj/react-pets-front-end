import './App.css';
import { useState, useEffect } from 'react';
// services
import * as petService from './services/petService';
// components
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetForm from './components/PetForm';

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Create a new useEffect
  useEffect(() => {
    // create new async function
    const getPets = async () => {
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
  
  const updateSelectedPet = (pet) => {
    setSelectedPet(pet);
  };

  const handleFormView = (pet) => {
    // make sure we dont accidentally pass bad data to the edit pet form
    if (!pet.name) setSelectedPet(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      // Call petService.create, assign return value to newPet
      const newPet = await petService.create(formData);
      if (newPet.error) {
        throw new Error(newPet.error);
      }
      // Add the pet object and the current petList to a new array, and
      // set that array as the new petList
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      // Log the error to the console
      console.log(error);
    }
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.updatePet(formData, petId);
  
      // handle potential errors
      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }
  
      const updatedPetList = petList.map((pet) =>{
        // If the id of the current pet is not the same as the updated pet's id, return the existing pet. If the id's match, instead return the updated pet.
        if(pet._id !== updatedPet._id){
          return pet
        }else{
          return updatedPet
        }
      });
      // Set petList state to this updated array
      setPetList(updatedPetList);
      // If we don't set selected to the updated pet object, the details page will reference outdated data until the page reloads.
      setSelectedPet(updatedPet);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }

      setPetList(petList.filter((pet) => pet._id !== deletedPet._id));
      setSelectedPet(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PetList
        petList={petList}
        isFormOpen={isFormOpen}
        updateSelectedPet={updateSelectedPet}
        handleFormView={handleFormView}
      />
      {isFormOpen ? (
        <PetForm 
          selectedPet={selectedPet}
          handleAddPet={handleAddPet} 
          handleUpdatePet={handleUpdatePet} 
        />
      ) : (
        <PetDetail 
          selectedPet ={selectedPet} 
          handleFormView={handleFormView} 
          handleRemovePet={handleRemovePet}
        />
      )}
    </>
  );
};

export default App;