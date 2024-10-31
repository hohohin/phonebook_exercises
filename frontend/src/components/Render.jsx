import React from "react";

const Render = ({persons, deletePerson}) => {
    const names = persons.map(person => 
    <li key={person.id}>{person.name} {person.number}
    <button onClick={()=>deletePerson(person.id)}>delete</button></li>
    )
    return (
        <ul>
        {names}
        </ul>
    )
}

export default Render