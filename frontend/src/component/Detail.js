import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { moviesRef } from '../firebase/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { ThreeDots } from "react-loader-spinner"
import Reviews from "../component/Reviews.js"

const Detail = () => {
    /*useParams use to get a patameter from the link means here id will be
    come in parameter so id will be taken by useParams() ans store into the id variable 
    
    id descibe the a perticuler data.all the data have a different id so using id
    when we click on card then this card id goes in parameter and using above useParams 
    method we will fetch the perticuler card data based on id 
    */
    const { id } = useParams();
    // console.log(id);
    //docRef variable store a perticuler data using doc() in-build method and based on id
    const docRef = doc(moviesRef, id);

    const [data, setData] = useState({

        title: "",
        year: "",
        img: "",
        about: "",
        rating: 0,
        rated: 0

    })



    const [loading, setLoading] = useState(false);

    /*whenever page will render at the first time at useEffect will execute and 
     in useEffct there is a function which is make by devlopere(me) 
     this function is await means javascript can not move ahead until getData() will 
     not complete .so in this method we fetch the data 
     getDoc() is a method to fetch the data from the firebase
     it take two parameter,first is database refeence moviesRef which is import above from the firebase.js file
     and second is id using id it will fetch a perticuler data 
     and last set all data in setData useState
     and this useState is apply in detail page 
    */
    useEffect(() => {
        try {
            async function getData() {
                setLoading(true);
                const _data = await getDoc(docRef);
                setData(_data.data());
                setLoading(false);
            }

            //after execution of getData function we need to call getData function
            getData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (



        <div className='p-4 mt-4  w-full flex flex-col md:flex-row items-center md:items-start justify-center '>
            {loading ? <div className='h-96 flex w-full justify-center items-center'> < ThreeDots height={25} color='white' /></div > :
                <>
                    <img className='h-96 w-72 md:sticky md:top-24' src={data.img} alt="" />
                    <div className="md:ml-4 block ml-0 w-full md:w-1/2">
                        <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>

                        <ReactStars className='ml-2'
                            size={25}
                            count={5}
                            value={data.rating / data.rated}
                            edit={false}
                        />
                        <p className='mt-2'>{data.about}
                        </p>

                        <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
                    </div>
                </>
            }
        </div >

    )
}

export default Detail
