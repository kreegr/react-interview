import React, {useReducer, useState, useEffect} from 'react';

const createId = (()=>{
    let id = 1;

    return () => {
        return id++;
    }
})();

const changePetName = (id, newName) => {
    console.log('created action');
    return {
        type: 'changePetName',
        payload: {
            id,
            newName
        }
    }
}

const addPet = (name) => {
    return {
        type: 'addPet',
        payload: {
            id : createId(),
            name
        }
    }
}

// const reducer = function(state, action){

//     switch (action.type) {
//         case 'changePetName' : 
//             let {id, newName} = action.payload;
//             const pet = state.pets.find((p)=>p.id === id);
//             pet.name = newName; // broken... side effect

//             break;

//         case 'addPet' : 
//             state.pets.push(action.payload); // also borked


//             break;

//         default:
//             break;
    
//     }

//     return state;
// }


function reducer (state, action){
    
    switch (action.type) {
        case 'changePetName' : 
            let {id, newName} = action.payload;
            // const pet = state.pets.find((p)=>p.id === id);
            const [pet, ...restPets] = state.pets;
            return {
                ...state,
                pets : [
                    {
                        ...pet,
                        name: newName
                    },
                    ...restPets
                ]
            };

        case 'addPet' : 
            return {
                ...state,
                pets : [
                    ...state.pets,
                    {
                        ...action.payload
                    }
                ]
            };

        default:
            break;
    
    }

    return state;
}


const defaultState = {
    ownerName : 'Matt',
    pets : [
        {
            name: 'Tom Cat',
            id: 1
        }
    ]
}

export default function Main(props) {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [other, setOther] = useState('other');

    const onClick = (newName)=>{
       dispatch(changePetName(1, 'Threes Cat'));
    }

    const onClickAddPet = (name) => {
        dispatch(addPet(name));
    }

    return <div>
        <ThePet pets={state.pets} other={other} /><br/>
        <Three onClick={onClick} setOther={setOther} onClickAddPet={onClickAddPet} />
    </div>
}

function ThePet (props) {
    const {pets, other} = props;

    return <div>
        {pets.map((p, i)=>{
            return <div key={p.name}>{i+1}: {p.name}</div>;
        })}
    </div>
}


function Three (props){  
    // const {onClick} = props;
    const onClick = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        props.onClick("Three's Cat");
    }

    const onOther = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        props.setOther('Some Other Changed')
    }

    const [newPetName, setNewPetName] = useState('');

    const handleChange = (evt) => {
        const newVal = evt.target.value;
        setNewPetName(newVal);
    }


    const onClickAdd = (evt) => {
        debugger;
        props.onClickAddPet(newPetName);
        setNewPetName('');
    }

    return <>
    <div style={{color:'green'}} onClick={onClick}>Three's Change Pet Name</div>
    <div style={{color:'green'}} onClick={onOther}>Set Other</div>
    <div>
        <input type="text" value={newPetName} onChange={handleChange} /><button onClick={onClickAdd}>Add</button>
    </div>
    
    </>
}