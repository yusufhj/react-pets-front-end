/* eslint-disable react/prop-types */
import { useState } from 'react';

const PetForm = (props) => {
  // formData state to control the form
  const initialState = props.selectedPet ? props.selectedPet : {
    name: '',
    age: '',
    breed: '',
  }
  // If pet data has been passed as props, we set formData as that pet object.
  // Otherwise, we can assume this is a new pet form, and use the empty initialState object.
  const [formData, setFormData] = useState(initialState)


  // handleChange function to update formData state
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    if (props.selectedPet) {
        props.handleUpdatePet(formData, props.selectedPet._id);
    } else {
        props.handleAddPet(formData);
    }
  };

  return (
    <div className="form-container">
      <form>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
         <button onClick={handleSubmitForm} type="submit">{props.selectedPet ? "Update Pet" : "Add New Pet"}</button>
      </form>
    </div>
  );
};

export default PetForm;