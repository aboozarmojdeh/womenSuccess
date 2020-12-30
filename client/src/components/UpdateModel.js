import React, { useState, useContext,useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ModelFinder from '../apis/ModelFinder';
import { ModelsContext } from '../context/ModelsContext';

const UpdateModel = (props) => {
    const { id } = useParams();
    let history=useHistory();
    const { models } = useContext(ModelsContext)
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [rankRange, setRankRange] = useState('');

    useEffect(() => {
        const fetchData=async()=>{
            try {
                
                    const response=await ModelFinder.get(`/${id}`);
                    
                    console.log(response.data.data.model)
                    setName(response.data.data.model.name)
                    setLocation(response.data.data.model.location)
                    setRankRange(response.data.data.model.rank_range)
                }catch (err) {
                console.error(err.message)
            }}
            fetchData();
    }, [])
    const nameChange = (event) => {
        setName(event.target.value)
    };
    const locationChange = (event) => {
        setLocation(event.target.value)
    };
    const rankChange = (event) => {
        setRankRange(event.target.value)
    };

    const handleUpdateModel = async(e) => {
e.preventDefault();
const updateModel=await ModelFinder.put(`/${id}`,{
    name:name,
    location:location,
    rank_range:rankRange
})
history.push('/dashboard');
    };
    
    return (
        <div>
        {/* <h1>{restaurants[0].name}</h1> */}
            <form>
            <div className='input-group mb-3'>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={nameChange} id='name' className='form-control' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={locationChange} id='location' className='form-control' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='rank_range'>Rank Range</label>
                    <input value={rankRange} onChange={rankChange} id='rank_range' className='form-control' type='number' />
                </div>
                </div>
                <button type='submit' onClick={handleUpdateModel} className='btn btn-primary'>Submit</button>
                
            </form>
        </div>
    )
}

export default UpdateModel
