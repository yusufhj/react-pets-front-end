/* eslint-disable react/prop-types */
const PetList = (props) => {
    const pets = props.petList.map((pet) => (
        <a key={pet._id} onClick={() => props.updateSelectedPet(pet)}>
          <li>{pet.name}</li>
        </a>
    ));

    return (
        <div>
            <h1>Pet List</h1>
            <button onClick={props.handleFormView}>{props.isFormOpen ? 'Close Form' : 'New Pet'}</button>
            <ul>
                {!props.petList.length ? <h2>No Pets Yet!</h2> : <ul>{pets}</ul>}
            </ul>
        </div>
      );
};
  
export default PetList;