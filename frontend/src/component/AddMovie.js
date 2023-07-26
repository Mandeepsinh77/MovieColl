import React, { useContext, useState } from 'react'
import { TailSpin } from "react-loader-spinner"
import { addDoc } from "firebase/firestore"
import { moviesRef } from '../firebase/firebase.js'
import swal from "sweetalert"
import { Appstate } from '../App.js'
import { useNavigate } from 'react-router-dom'


function AddMovie() {
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate();

  //WE CREATE A USESTATE FORM
  const [form, setForm] = useState([
    {
      title: "",
      year: "",
      about: "",
      img: "",
      rated: "",
      rating: ""
    }
  ])

  //CREATE A USESTATE LOADING
  const [loading, setLoading] = useState(false);



  /*
  addMovie() IS A FUNCTION IT WILL WHEN WE CLICK ON ADD BUTTON AT THAT TIME THIS FUNCITON IS CALLED
  */
  const addMovie = async () => {

    /*BY DEFAULT IN FORM WE SET RATED AND RATING AS A 0. 
      WE CAN NOT SET IT IN DYNAMICALY. JUST SEND THIS BOTH FIELD 0 WHEN WE ADD MOVIE IN DATABASE
    */
    const formData = {
      //...form MEANS ALL THE OTHER DATA AS IT IS JUST SET RATED AND RATING
      ...form,
      rated: 0,
      rating: 0,
    }

    // console.log(formData)
    setLoading(true);
    try {

      if (useAppstate.login) {


        /*USING addDoc() WE CAN ADD A DOCUMENT IN OUR DATABASE
        THIS METHOD TAKE TWO ARGUMENT ONE IS REFERANCE VARIABLE WHICH REFER TO OUR 
        DATABASE MOVIES AND SECOND IS USESTATE OR VARIABLE WHICH HAVE ALL THE FIELD VALUE 
        */
        await addDoc(moviesRef, formData);

        //IT JUST A SWEETALERT
        swal({
          title: "Successfully Added",
          icon: "success",
          button: false,
          timer: 3000
        })

        //AFTER ADDING WE CLEAR OUR FORM
        setForm([]);

      } else {
        window.alert("Do Login First");
        9537519367('/login')
      }
    } catch (err) {
      swal({
        title: err.message,
        icon: "error",
        button: false,
        timer: 3000
      })
    }
    setLoading(false)
  }
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-20 mx-auto ">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-red-500"><span className='border-b-2 border-'> Add Your Favorite Movie</span></h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">

            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-lg text-gray-200"><span className='text-red-500'>Movie</span> Title</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    //CHANGE TITLE FIELD IN FORM USING SETFORM
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-lg text-gray-200"><span className='text-red-500'>Release</span> Year</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-lg text-gray-200"><span className='text-red-500'>Poster</span> Link</label>
                  <input
                    type="name"
                    id="name"
                    name="poster"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-lg text-gray-200"><span className='text-red-500'>About</span> Movie</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none  text-neutral-950 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={addMovie} className="flex mx-auto text-white  bg-red-500 border-0 py-2 px-8 focus:outline-none  rounded hover:text-red-600 hover:bg-white text-lg"><span className='text-lg '></span>
                  {loading ? <TailSpin height={25} color='white' /> : "ADD"}
                </button>
              </div>

              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}

export default AddMovie
