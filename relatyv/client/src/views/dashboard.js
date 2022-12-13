import { useEffect, useState, useRef, ChangeEvent } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

   const [courses, setCourses] = useState([])
   const [loading, setLoading] = useState(false)
   const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(()=> {
      axios("/api/course").then(res => {
         setCourses(res.data)
         setLoading(true);
      })
      .catch(error => {
         setLoading(false)
      })
   }, [])

   const handleFileChange = (courseId) => async(e) => {
      if (!e.target.files) {
         return;
       }
       const formdata = new FormData()
       formdata.append('file', e.target.files[0])
       formdata.append('course_id', courseId)
       const response = await axios.post('/api/course/upload', formdata, { 
         headers: {
            'content-type': e.target.files[0].type,
            'content-length': `${e.target.files[0].size}`, // 👈 Headers need to be a string
          }
      });
      if(response.data.status) {
         return toast.success('Image uploaded successfully!', {
            position: toast.POSITION.TOP_RIGHT
            });
      }
      return toast.error('Something went wrong!', {
         position: toast.POSITION.TOP_RIGHT
         });
   }

   const renderCourses = (courses) => {
      return (
         courses.map(course => (
               <div class="col-sm-4 p-2">
                  <div class="card">
                     <a href={`/editCourse/${course._id}`}>
                        <div class="img-col">
                           <img src= {course.image ? course.image : "images/doctor.jpg"}/>
                           <h5 class="card-title text-center mb-0">{course.title}</h5>
                           <input type="file" id="upload" onChange={handleFileChange(course._id) } hidden/>
                           <label for="upload" class="upload-label" on><i class="fa fa-camera"></i>Upload Image</label>
                        </div>
                        </a>
                  </div>
               </div>
         ))
      )
   }
   if(!loading) {
      return (
          <div>
              loading...
          </div>
      )
   }

   return (
      <div class="main-content">
      <div class="d-lg-flex">
          <Sidebar />
          <ToastContainer />
         <div class="content-area py-4 p-lg-4 w-100 bg-light">
            <div class="container">
               <div class="for-image-upload mb-4">
                  <div class="row">
                     <div class="col-sm-4 p-2">
                           <div class="card">
                              <a href="/addCourse" class="new-gp">Add New Group</a>
                           </div>
                     </div>
                     {renderCourses(courses)}
                  </div>  
               </div>
            </div>
         </div>
      </div>
   </div>
  )
}

export default Dashboard