/* eslint-disable react/prop-types */
const PetDetail = (props) => {
    if (!props.selectedPet)
        return (
            <div>
                <h1>NO DETAILS</h1>
            </div>
        )

    return (
        // return statement if props.selected has a truthy value
        <div>
            <h1>{props.selectedPet.name}</h1>
            <h2>Breed: {props.selectedPet.breed}</h2>
            <h2>
                Age: {props.selectedPet.age} year{props.selectedPet.age > 1 ? 's' : ''} old
            </h2>
            <div>
                <button onClick={() => props.handleFormView(props.selectedPet)}>
                    Edit
                </button>
                <button onClick={() => props.handleRemovePet(props.selectedPet._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PetDetail;