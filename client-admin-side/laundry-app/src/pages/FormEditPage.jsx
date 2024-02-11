import {  useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateRequestHandler, fetchRequestById } from '../store/actions/actionCreator';
import { fetchUsers } from '../store/actions/actionCreator';
import Select from 'react-select';
import { useParams } from 'react-router-dom';


// fuction for login
function FormAddPage() {
  // define fuction needed for action
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let { id } = useParams();
  // state
  const[loading,setLoading] = useState(true)
  const {request} = useSelector(((state) => state.request))
  const {users} = useSelector(((state) => state.user))
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState({
    scale:0,
    price:0,
    userId : 0
  })

   // function page reload first time and once
   useEffect(() => {
    dispatch(fetchRequestById(id))
    .then(() => {
      dispatch(fetchUsers())
      .then(() => {
        setLoading(false)
      })
    })
    },[])
       
    useEffect(() => {
      setData({
        scale: request.scale, // Convert scale to string
        price: request.price, // Convert price to string
        userId: request.userId // Convert userId to string
      });
    },[request])

    useEffect(() => {
      if (users.length > 0) {
        const selectedUser = users.find(user => user.id === request.userId);
        setSelectedUser({ value: selectedUser.id, label: selectedUser.username });
      }
    },[request,users])


  // function fon handle change value from input form and execute every changing
  function handleChange(e) {
    // set variable usestatu data to input from
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }


  // function fon handle submit  form and execute every button submit clicking
  function handleSubmit(e) {
    e.preventDefault();
    // dispatch and call handler or other fucntion for query to server
    dispatch(updateRequestHandler(data))
      .then(() => {
        // move to router / if successfully
          navigate("/")
      })
      .catch(() => {
        // stay in this page
        navigate("/form-edit/" +id)
      })
  }

  const handleUserChange = selectedOption => {
    setData({ ...data, userId: selectedOption.value });
    setSelectedUser(selectedOption);
  };

    // contional if data not relode yet
    if (loading) {
      return <h1>memuat...</h1>
    }

  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
        <h1 className='text-center fw-bold fst-italic'>Form Mengedit Pesanan</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label fst-italic">Total Timbangan</label>
            <input type="number" name='scale' id='scale' className="form-control shadow p-3 bg-body rounded" value={data.scale} onChange={(e) => handleChange(e)}/>
          </div>

          <div className="mb-2">
            <label className="form-label fst-italic">Total Harga</label>
            <input type="number" name='price' id='price' className="form-control shadow p-3 bg-body rounded" value={data.price} onChange={(e) => handleChange(e)}/>
          </div>

          <div className="mb-2">
            <label className="form-label fst-italic">pilih user</label>
            <Select
                className="form-select"
                aria-label="Default select example"
                options={users.map(user => ({ value: user.id, label: user.username }))}
                value={selectedUser}
                onChange={handleUserChange}
              />
          </div>

         
          {/* button submit */}
          <button type="submit" className="btn btn-warning shadow my-3">Submit</button>

          {/* button to register if you dont hange account */}
        </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
   
    </>
  )
}

export default FormAddPage