import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef } from '../firebase/firebase.js';
import { moviesRef } from '../firebase/firebase.js';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { ColorRing, Comment } from "react-loader-spinner"
import swal from "sweetalert"
import { Appstate } from "../App";
import { useNavigate } from 'react-router-dom';


const Reviews = ({ id, prevRating, userRated }) => {
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate();
    //CREATE REQUIRED USESTATE
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [thought, setThought] = useState("");
    const [data, setData] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [newAdded, setNewAdded] = useState(0);


    //WHEN PAGE LOADED USEEFFECT() CALLED
    useEffect(() => {

        /*IN THIS REVIEW PORTION WE GET ALL THE REVIEW FROM THE COLLECTION REVIEW USING USERDEFINE FUNCTION
          IT IS async BECAUSE IT WILL TAKE SOME TIME SO JAVASCRIPT ENGINE WAIT FOR THAT TIME IT CAN NOT MOVE FURTHER
         */
        async function getData() {
            setReviewsLoading(true);

            setData([]);
            /*
            query() IS METHOD IN FIRESTORE,IT WILL USE TO FETCH THE DATA USING WRITING QUERY
            IT TAKE TWO ARG FIRST IS REFERECE VARIABLE WHICH WAS REFER TO A PERTICULER DOCUMENT IN DATABESE COLLECTION
            SECOND IS WHERE CONDITION USING where() METHOD WE CAN WRITE A CONTION IN QUERY
            IT MEANS QUERY IS GIVE ME A KEY WHERE movieid(it  is a field in document database) == id(WE GET ID FROM THE DETAIL PAGE USING PROPS)

            FINALY USING getDocs() METHOD WE WILL GET ALL THE REVIEWS AND STORE IN INCOMINGDATA VARIABLE

            AND USING FOREACH LOOP ALL THE DATA SET IN DATA USESTATE
             */

            let q = query(reviewsRef, where('movieid', '==', id))
            const incomingData = await getDocs(q);


            incomingData.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [newAdded])

    /*
    WHENEVER WE CLICK ON ADD BUTTON BELOW CODE WILL CALLED
    IT CHECK FIRST CONDITION 


   AFTER THAT USING addDoc() METHOD THE REVIEW WILL STORE IN DATABASE USING REVIEWREF VARIABLE 
   SAME AS ADD ITEM PAGE
   BUT IN ADD ITEM WE PASS USESTATE FORM BUT HERE WE PASS ALL THE FIELD SEPARATLY AND ALL THE SAPERATE 
   FIELD USE A USESTATE

    */
    const sendReview = async () => {
        if (thought.length <= 0 || rating.length <= 0) {
            window.alert("please Share your review or give rating to this movie")
        }
        else {
            setLoading(true);
            try {
                if (useAppstate.login) {

                    await addDoc(reviewsRef, {
                        movieid: id,
                        name: useAppstate.userName,
                        rating: rating,
                        thoughts: thought,
                        timestamp: new Date().getTime()
                    })


                    /**
                     * HERE WE UPDATE A STAR IN MOVIES SECTION
                     * SO USING doc() METHOD WE WILL GET A PERTICULER DOCUMENT WHICH WE WANT TO UPDATE
                     * THIS METHOD ALSO TAKE A TWO VARIABLE FIRST IS REFERENCE VARIABLE WHICH IS REFER TO A PERTICULER COLLECTION
                     * AND SECOND IS ID WHICH IS REFER TO A PERTICULER DOCUMENT WHICH WE WANT TO UPDATE 
                     * USING updateDoc() METHOD WE WILL BE UPDATE A DOCUMENT IT ALSO TAKE TWO FIELD 
                     * FIRST IS DOCREF AND SECOND IS A FIELD WHICH WE WANT TO UPDATE
                     * 
                    */
                    const docRef = doc(moviesRef, id);
                    // console.log(docRef)
                    await updateDoc(docRef, {
                        rating: Number(rating + prevRating),
                        rated: Number(userRated + 1)

                    })
                    setRating(0);
                    setThought("")
                    //it is for just a autometic relod while we give the review
                    setNewAdded(newAdded + 1);

                    swal({
                        title: "Review Submit Successfully",
                        icon: "success",
                        button: false,
                        timer: 3000
                    })
                }
                else {
                    window.alert("Do Login First");
                    navigate("/login");
                }
                setLoading(false);
            } catch (error) {
                swal({
                    title: error.message,
                    icon: "error",
                    button: false,
                    timer: 3000
                })
            }
        }
    }

    return (

        //IT IS A REVIEW FIELD
        <div className='mt-4 w-full border-t-2 border-gray-700 '>
            <ReactStars className='ml-2'
                size={30}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />
            <input type="text"
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder='Share Your Thoughts....'
                className='w-full p-2 outline-none header'

            />
            <button onClick={sendReview} className='bg-green-500 flex justify-center w-full p-2 mt-2'>{loading ? <ColorRing height={25} /> : "Share"}</button>

            {reviewsLoading ?
                <div className='mt-6 flex  justify-center'><Comment height={50} /></div>
                :
                <div className='mt-4'>
                    {data.map((e, i) => {
                        return (
                            <div className='header border-b border-gray-600 p-2 w-full mt-2' key={i}>
                                <div className='flex justify-between'>
                                    <p className='text-orange-400 text-lg'>{e.name}</p>
                                    <p className='ml-5 text-xs'>{new Date(e.timestamp).toLocaleString()}</p>
                                </div>
                                <ReactStars
                                    size={20}
                                    half={true}
                                    edit={false}
                                    value={e.rating}
                                // onChange={(rate) => setRating(rate)}
                                />
                                <p>{e.thoughts}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Reviews
