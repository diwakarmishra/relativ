import Sidebar from "../sidebar/sidebar"
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewCourse = () => {

    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setcourseDescription] = useState('')
    const [sessionTitle, setSessionTitle] = useState('')
    const [sessionDescription, setSessionDescription] = useState('')
    const [sessionDateAndTime, setSessionDateAndTime] = useState('')

    const handleSubmit = async(e) => {
      if(!courseTitle || !courseDescription ) {
         return toast.error(' Please enter course name and description!', {
            position: toast.POSITION.TOP_RIGHT
            });
      }

      e.preventDefault();
      const response = await axios.post('/api/course', { 
         title: courseTitle , 
         description: courseDescription
      });

      if(response.status) {
         toast.success('Course added successfully!', {
            position: toast.POSITION.TOP_RIGHT
            });
      }
    }
   
    const handleSessionSubmit = async(e) => {

      if(!sessionTitle || !sessionDescription || !sessionDateAndTime ) {
         return toast.error(' Please enter course name and description!', {
            position: toast.POSITION.TOP_RIGHT
            });
      }
      const response = await axios.post('/api/session', { 
         title: sessionTitle , 
         description: sessionDescription,
         dateAndTime: sessionDateAndTime
      });

      if(response.status) {
         toast.success('Course added successfully!', {
            position: toast.POSITION.TOP_RIGHT
            });
         setTimeout(e.preventDefault(),200)
      }

    }

    return (
      <div class="main-content">
         <div class="d-lg-flex">
            <Sidebar />
            <ToastContainer />
            <div class="content-area py-4 p-lg-4 w-100 bg-light">
               <div class="container">
               <div class="top-img mb-4">
                     <img src="images/top-img-1.jpg"></img>
                     <button onClick = {handleSubmit} class="btn btn-primary btn-block"> Add Course</button>
               </div>
                  <form>

                     <div class="mt-4 w-50">
                        <div class="mb-3">
                           <input type="text" class="form-control" onChange={ e => { setCourseTitle(e.target.value)}} id="coursename" name="coursename" placeholder="title" required/>
                        </div>
                        <div class="mb-3">
                           <textarea class="form-control" id="coursedesc" onChange={e=> { setcourseDescription(e.target.value)}} name="coursedesc" rows="3" placeholder="description" required></textarea>
                        </div>
                     </div>
                  </form>
                  <hr class="my-5" />
               </div>
            </div>
         </div>
      </div>
    )
}

export default AddNewCourse;