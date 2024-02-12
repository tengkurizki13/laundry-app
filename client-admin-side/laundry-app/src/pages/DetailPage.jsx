import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../store/actions/actionCreator';
import { format } from 'date-fns';


// fuction for detail page
function DetailPage() {

  // define fuction needed for action
  const dispatch = useDispatch()

  // get id from http parameter
  let { id } = useParams();

  // states
  const {tracks} = useSelector(((state) => state.track))
  const[loading,setLoading] = useState(true)

  // function page reload first time and once
  useEffect(() => {
    // contional to cek id form params
    if(id) {
        dispatch(fetchTracks(id))
        .then(() => {
          setLoading(false)
        })
      }
    },[])

    console.log(tracks,"di page");
 

    // contional if data not relode yet
    if (loading) {
      return <h1>memuat...</h1>
    }

   return  <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="card border-top border-bottom border-3" style={{ borderColor: '#f37a27', borderWidth: '3px', borderStyle: 'solid' }}>
            <div className="card-body">
              <div className="row">
                <div className="col mb-3">
                  <p className="small text-muted mb-1">Date</p>
                  <p>{format(new Date(tracks[0].Request.createdAt), 'dd/MM/yyyy HH:mm:ss')}</p>
                </div>
                <div className="col mb-3">
                  <p className="small text-muted mb-1">Order No.</p>
                  <p>012j1gvs356c</p>
                </div>
              </div>
  
              <p className="lead fw-bold mb-4 pb-2" style={{ color: "#f37a27" }}>Tracking Order</p>
  
              <div className="row">
                <div className="col-lg-12">
                  <div className="horizontal-timeline">
                    <ul className="list-inline items d-flex justify-content-between">
                    {tracks.map((track,i) =>{
                      return  <li className="list-inline-item items-list" key={i}>
                      <p className="py-1 px-2 rounded text-white" style={{ backgroundColor: "#f37a27" }}>{track.status}</p>
                      <p className="py-1 px-2 rounded text-dark text-center">{format(new Date(track.createdAt), 'HH:mm')}</p>
                    </li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
  
              <p className="mt-4 pt-2 mb-0">Want any help? <a href="#!" style={{ color: "#f37a27" }}>Please contact us</a></p>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
}

export default DetailPage
