import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from "firebase/firestore"
import { moviesRef } from '../firebase/firebase.js'
import { Link } from 'react-router-dom';


function Card() {

    /*useState data is use to store the data and when we fetch data 
    from the database than using setData we will set data and this data apply on card using data.map() method8*/

    const [data, setData] = useState([])

    /*make one useState as loading which is initially false
      when we fetch the data at that time our loader is loaded and when process of fetch data has been completd
      at that time our loader become false ,so so when our loader become false our card will be display .this code done below
    */
    const [loading, setLoading] = useState(false);

    //whenever page will render at first time than this useEffect will run 
    useEffect(() => {
        //make a function getData().in this function we will fetch the data from the firebase database
        async function getData() {

            //useEffect run when our page render first time that time oue getData() method will also execute and our 
            //loader also runnning  
            setLoading(true)

            /*getDocs() is a firebase database method which will take one parameter ,a parameter which is refer our database's document(schema)
             
              IMP: 
              getDocs() method will use for get multiple document
              ans getDoc() is use for get a single document
            */
            const _data = await getDocs(moviesRef);

            // console.log(_data);
            /*using forEach loop all the data will be set in setData useState
              and this useState is apply on all the card field
              setData useState is an array which store all the value which is come from the database
             */
            _data.forEach((doc) => {
                setData((pre) => [...pre, { ...(doc.data()), id: doc.id }])
            })

            //whenever data will be fetch and set in card laoder also become false
            setLoading(false)
        }
        //now run getData() method
        getData();
    }, [])
    return (
        <div className='flex md:ml-2  flex-wrap justify-between px-3 mt-2 '>

            {/* it means if setLoading is true till that time display loader else display our card */}

            {loading ? <div className='w-full flex justify-center items-center h-96'><MutatingDots height={100} color='red' /> </div> :

                //  data.map() is a method to map all of the data in differenr card it return card card store all the field and filed is full fill by data useState which is define above 
                data.map((e, i) => {
                    return (
                        //number of data = number of card
                        <Link to={`detail/${e.id}`}>
                            <div key={i} className='card w-40 md:w-60 font-medium shadow-lg p-1 hover:-translate-y-3 cursor-pointer transition-all duration-500 mt-6'>
                                <img className='h-60 w-40 md:w-60 md:h-72' src={e.img} />
                                <div className=''>
                                    <h5><span className='text-red-400 '> {e.title} </span></h5>
                                    <h2 className='flex items-center'>Rating :
                                        {/* add react component star with its property */}
                                        <ReactStars className='ml-2'
                                            size={20}
                                            // half={true}
                                            count={5}
                                            value={e.rating / e.rated}
                                            edit={false}
                                        />
                                    </h2>
                                    <h2>Year : {e.year}</h2>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }

        </div>
    )
}
export default Card
