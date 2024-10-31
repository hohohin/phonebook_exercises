import React from "react";

const Form = ({addPerson, newName, handleAdd, newNumber, handleNumber}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleAdd} placeholder='add new name here'/><br></br>
                number: <input value={newNumber} onChange={handleNumber} placeholder='add new number here' />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form