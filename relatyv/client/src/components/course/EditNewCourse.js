import Sidebar from "../sidebar/sidebar"
import { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditNewCourse = () => {

    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setcourseDescription] = useState('')
    const [sessionTitle, setSessionTitle] = useState('')
    const [sessionDescription, setSessionDescription] = useState('')
    const [sessionStart, setSessionStart] = useState('')
    const [sessionEnd, setSessionEnd] = useState('')
    const [sessionData, setSessionData] = useState([])
    const [loading, setLoading] = useState(false)
    const [courseId, setCourseId] = useState('')

    useEffect(() => {
      const tempCourseID = window.location.href.split("/")[4];

      setCourseId(tempCourseID)

      if(tempCourseID.includes("?")) {
         setCourseId(tempCourseID.substring(0, tempCourseID.indexOf('?')))
      }

        axios(`/api/course/${tempCourseID}`)
        .then(res => {
            const data = res.data;
            setCourseTitle(data.title)
            setcourseDescription(data.description)
            setLoading(true)
        })
        .catch(err => {
            setLoading(true)
        })

        axios(`/api/session?course=${tempCourseID}`)
        .then(res => {
            const data = res.data;
            setSessionData(data);
        })
        .catch(error => {
            console.log(error, "error value is here")
        })
    }, [])

    const fetchSessionData = (sessionData) => {

        if(sessionData?.length) {
         return (
            sessionData.map(session => (
                <li>
                    < a href='/session'><div class="session-content">{session.title}<span class="unlock-icon"><i class="fa fa-check"></i></span></div></a>
                </li>
            ))
         )
        }
        return ''
    }

    const handleSubmit = async(e) => {
      if(!courseTitle || !courseDescription ) {
         return toast.error(' Please enter course name and description!', {
            position: toast.POSITION.TOP_RIGHT
            });
      }

      e.preventDefault();

      const response = await axios.post('/api/course/update', { 
         id: courseId,
         title: courseTitle , 
         description: courseDescription
      });

      if(response.status) {
         toast.success('updated course successfully!', {
            position: toast.POSITION.TOP_RIGHT
            });
         reload()
      }
    }
   
    const handleSessionSubmit = async(e) => {

      e.preventDefault()
      if(!sessionTitle || !sessionDescription || !sessionStart ) {
         return toast.error(' Please enter course name and description!', {
            position: toast.POSITION.TOP_RIGHT
            });
      }
      const response = await axios.post('/api/session', { 
         title: sessionTitle , 
         description: sessionDescription,
         start: sessionStart,
         end: sessionEnd,
         courseId: courseId
      });

      if(response.data.status) {
         toast.success('Upated session successfully!', {
            position: toast.POSITION.TOP_RIGHT
            });
         reload()
         insertEvent(response.data.id);
      } else {
         toast.error('Something Went Wrong!', {
            position: toast.POSITION.TOP_RIGHT
            });
         reload()
      }
    }

   const insertEvent = (sessionId) => {
      try {
         const response = axios.post('/api/event', { 
            title: sessionTitle , 
            description: sessionDescription,
            start: sessionStart,
            end: sessionEnd,
            sessionId: sessionId
         });
      }
      catch ( error ) {
         throw error;
      }
   }

   const reload = () => {
      setTimeout(function(){
         window.location.reload(1);
      }, 4000);
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
               <div class="top-img mb-4">
                     <img src="/images/doctor.jpg"></img>
                     <button onClick = {handleSubmit} class="btn btn-primary btn-block"> Update Course</button>
               </div>
                  <form>

                     <div class="mt-4 w-50">
                        <div class="mb-3">
                           <input type="text" class="form-control" onChange={ e => { setCourseTitle(e.target.value)}} id="coursename" name="coursename" placeholder="title"  value ={ courseTitle }required/>
                        </div>
                        <div class="mb-3">
                           <textarea class="form-control" id="coursedesc" onChange={e=> { setcourseDescription(e.target.value)}} name="coursedesc" rows="3" placeholder="description" value = {courseDescription} required></textarea>
                        </div>
                     </div>
                  </form>
                  <hr class="my-5" />

                  <div class="edit-session mb-5">
                     <ul class="m-0 list-unstyled">
                        <li>  
                            <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#addsession" class="card"><i class="fa fa-plus"></i>Add New Session</a>
                        </li>
                     </ul>
                  </div>

                  <div class="session-block">
                  <h2 class="mb-4 pb-3 h4">All Sessions</h2>
                  <ul>
                    {fetchSessionData(sessionData)}
                  </ul>
                  </div>

               </div>
            </div>
         </div>
         <div class="modal fade new-session-popup" id="addsession" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
               <div class="modal-content">
                  <div class="modal-header">
                     <h1 class="modal-title fs-5">Add New Session</h1>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                     <form onSubmit ={handleSessionSubmit} >
                        <div class="mb-2 modal-content-body">
                           <input type="text" class="form-control" id="title" name="title" onChange = { e=> { setSessionTitle(e.target.value)}} placeholder="title" required/>
                        </div>
                        <div class="mb-2 modal-content-body">
                             <textarea class="form-control" id="description" name="description" onChange = { e=> { setSessionDescription(e.target.value)}} rows="3" placeholder="description"></textarea>
                        </div>
                        <div class="mb-2 modal-content-body">
                           <label class ="SessionDateTimeLabel mb-2" for="SessionDateTimeLabel">Session Date Start</label> 
                           <input  class="form-control" type="datetime-local" id="sessionStart" name="sessionStart" onChange = { e=> { setSessionStart(e.target.value)}} />
                       </div>
                       <div class="mb-2 modal-content-body">
                           <label class ="SessionDateTimeLabel mb-2" for="SessionDateTimeLabel">Session Date End</label> 
                           <input class="form-control" type="datetime-local" id="sessionEnd" name="sessionEnd" onChange = { e=> { setSessionEnd(e.target.value)}} />
                       </div>
                       
                        <button type="submit" name="sessionadd" class="btn btn-primary btn-block">Add Session</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
    )
}

export default EditNewCourse;