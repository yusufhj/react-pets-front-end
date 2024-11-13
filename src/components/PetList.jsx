/* eslint-disable react/prop-types */
const PetList = (props) => {
    const pets = props.petList.map((pet) => (
        <a key={pet._id} onClick={() => props.updateSelectedPet(pet)}>
          <li>{pet.name}</li>
        </a>
    ));

    return (
        <div className="sidebar-container">
            <h1>Pet List</h1>
            <div className="list-container">
                {!props.petList.length ? (
                    <h2>No Pets Yet!</h2> 
                ) : (
                    <ul role="list">{pets}</ul>
                )}
            </div>
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Pet'}
            </button>
        </div>
      );
};
  
export default PetList;