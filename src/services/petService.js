const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

export const index = async () => {
    try {
      const res = await fetch(BASE_URL);
      const pets = await res.json();
      return pets
    } catch (err) {
      console.log(err);
    }
};
  
export const create = async (formData) => {
    try {
      const res = await fetch(BASE_URL, {
        // We specify that this is a 'POST' request
        method: 'POST',
        // We're sending JSON data, so we attach a Content-Type header
        // and specify that the data being sent is type 'application/json'
        headers: {
          'Content-Type': 'application/json',
        },
        // The formData, converted to JSON, is sent as the body
        // This will be received on the backend as req.body
        body: JSON.stringify(formData),
      });
      const pet = await res.json()
      return pet
    } catch (err) {
      console.log(err);
    }
  };

export const updatePet = async (formData, petId) => {
    try {
      const res = await fetch(`${BASE_URL}/${petId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
}

export const deletePet = async (petId) => {
    try {
      const deletedPet = await fetch(`${BASE_URL}/${petId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
      });
      return deletedPet;
    } catch (err) {
      console.log(err);
    }
}