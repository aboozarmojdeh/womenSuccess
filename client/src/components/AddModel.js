import React, { useState,useContext } from 'react'
import ModelFinder from '../apis/ModelFinder';
import { ModelsContext } from '../context/ModelsContext';
const AddModel = () => {
    const {addModels}=useContext(ModelsContext)
    const [name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ rankRange, setRankRange ] = useState("Rank Range");

    const nameChange = (event) => {
        setName(event.target.value)
    };
    const locationChange = (event) => {
        setLocation(event.target.value)
    };
    const rankChange = (event) => {
        setRankRange(event.target.value)
    };

    const handleSubmitModel = async(e) => {
        e.preventDefault();
        
        try {
            const addModel=await ModelFinder.post('/',{
                name:name,
                location:location,
                rank_range:rankRange
            })  
            console.log(addModel)
            addModels(addModel.data.data.model)
        } catch (err) {
            console.error(err.message)
        }
       
    }

    return (
        <div className='mb-4'>
            <form>
                <div className='form-row'>
                    <div className='input-group mb-3'>
                    <div className='col'>
                        <input value={name} onChange={nameChange} className='form-control' type='text' placeholder='name' />
                    </div>
                    <div className='col'>
                        <input value={location} onChange={locationChange} className='form-control' type='text' placeholder='location' />
                    </div>
                    <div className='col'>
                        <select value={rankRange} onChange={rankChange} className='form-select'>
                            <option disabled={true}>Rank Range</option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className='btn btn-primary' onClick={handleSubmitModel} >Add</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AddModel
