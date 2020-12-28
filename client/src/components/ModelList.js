import React, { useEffect, useContext, Fragment,useState } from "react";
import { useHistory } from "react-router-dom";
import ModelFinder from "../apis/ModelFinder";
import { ModelsContext } from "../context/ModelsContext";
import StarRating from "./StarRating";
const ModelList = (props) => {
  let history = useHistory();
  const { models, setModels } = useContext(ModelsContext);
  const [facePhoto,setFacePhoto]=useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ModelFinder.get("/");
        setModels(response.data.data.models);
        console.log(response.data.data.models);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
    console.log('models',models)
    uiFacesFetch(models.length);
  }, []);

  const uiFacesFetch = async (number) => {
    const response = await fetch(
      `https://uifaces.co/api?limit=${number}&gender[]=female&from_age=18&to_age=30`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": ["D3745996-3E2C41D1-9CA9CBE9-554CB42A"],
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    const faces = await response.json();
    setFacePhoto(faces)
    console.log('faces',faces.length)
    
  };

  

//   const faceImage = async () => {
//     uiFacesFetch();
   
//   };

  const handleDeleteModel = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await ModelFinder.delete(`/${id}`);
      setModels(
        models.filter((model) => {
          return model.id !== id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateModel = (e, id) => {
    e.stopPropagation();
    history.push(`/models/${id}/update`);
  };

  const handleModelSelect = (id) => {
    history.push(`/models/${id}`);
  };
  const renderRating = (model) => {
    if (!model.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <Fragment>
        <StarRating rating={model.average_rating} />
        <span className="text-warning ml-1">({model.count})</span>
      </Fragment>
    );
  };
  const modelArray = models.map((model,index) => {
    // uiFacesFetch(restaurants.length);
    return (
      <tr
        onClick={() => handleModelSelect(model.id)}
        key={model.id}
      >
        <td>{model.name}</td>
        <td>{model.location}</td>
        <td>{"$".repeat(model.rank_range)}</td>
        <td>{renderRating(model)}</td>
        <td>{!facePhoto.length ? <div>Waiting</div>:<img alt='model-face' src={facePhoto[index].photo} style={{borderRadius:'50%'}} width='100px' height='100px'/>}</td>
        <td>
          <button
            onClick={(e) => handleUpdateModel(e, model.id)}
            className="btn btn-warning"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={(e) => handleDeleteModel(e, model.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="list-group">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Model Name</th>
            <th scope="col">Location</th>
            <th scope="col">Rank Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Photo</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {modelArray}
          {/* <tr>
      
      <td>McDonalds</td>
      <td>Richmond Hill</td>
      <td>$$$</td>
      <td>Ratings</td>
      <td><button className='btn btn-warning'>Update</button></td>
      <td><button className='btn btn-danger'>Delete</button></td>
    </tr>
    <tr>
      
      <td>Tim Hortons</td>
      <td>Thornhill</td>
      <td>$$$$$</td>
      <td>Ratings</td>
      <td><button className='btn btn-warning'>Update</button></td>
      <td><button className='btn btn-danger'>Delete</button></td>
    </tr>
     */}
        </tbody>
      </table>
    </div>
  );
};

export default ModelList;
