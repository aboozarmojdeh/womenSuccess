import React, { Fragment, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ModelFinder from '../apis/ModelFinder';
import Reviews from '../components/Reviews';
import { ModelsContext } from '../context/ModelsContext';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';
const ModelDetailPage = () => {

    const { id } = useParams();
    const { selectedModel, setSelectedModel } = useContext(ModelsContext);

    useEffect(() => {
        try {
            const fetchData = async () => {

                const response = await ModelFinder.get(`/${id}`);
                console.log(response.data.data)
                setSelectedModel(response.data.data)

        
            }
            fetchData();

        } catch (err) {
            console.error(err.message)
        }


    }, [])
    return (
        <div>{selectedModel && (
            <Fragment>
                <h1 className="text-center display-1">{selectedModel.model.name}</h1>
                <div className='text-center'>
                    <StarRating rating={selectedModel.model.average_rating} />
                    <span className="text-warning ml-1">
                        {selectedModel.model.count ? `(${selectedModel.model.count})` : "(0)"}

                    </span>
                </div>
                <div className='mt-3'>
                    <Reviews reviews={selectedModel.reviews} />

                </div>
                <AddReview />
            </Fragment>
        )}


        </div>
    )
}

export default ModelDetailPage
