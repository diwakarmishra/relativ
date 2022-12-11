

import { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import axios from 'axios';

const Dashboard = () => {

   const [courses, setCourses] = useState([])
   const [loading, setLoading] = useState(false)

   useEffect(()=> {
      axios("/api/course").then(res => {
         setCourses(res.data)
         setLoading(true);
      })
      .catch(error => {
         setLoading(false)
      })
   }, [])

   const renderCourses = (courses) => {
      return (
         courses.map(course => (
               <div class="col-sm-4 p-2">
                  <div class="card">
                     <a href={`/editCourse/${course._id}`}>
                        <div class="img-col">
                           <img src="images/top-img-1.jpg"/>
                           <h5 class="card-title text-center mb-0">{course.title}</h5>
                           <input type="file" id="upload" hidden/>
                           <label for="upload" class="upload-label"><i class="fa fa-camera"></i>Upload Image</label>
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