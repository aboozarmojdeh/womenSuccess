import React , {useState, createContext} from 'react';

export const RestaurantsContext=createContext();

export const RestaurantContextProvider=(props)=>{

    const [models,setModels]=useState([]);
    const [selectedModel,setSelectedModel]=useState(null)

    const addModels=(model)=>{
        setModels([...models,model])
    }

    return(
        <RestaurantsContext.Provider value={{models,setModels,addModels,selectedModel,setSelectedModel}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}