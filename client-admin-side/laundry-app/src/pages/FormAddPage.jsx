import {  useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addRequestHandler } from '../store/actions/actionCreator';
import { fetchUsers } from '../store/actions/actionCreator';
import Select from 'react-select';


// fuction for login
function FormAddPage() {
  // define fuction needed for action
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // state
  const[loading,setLoading] = useState(true)
  const {users} = useSelector(((state) => state.user))
  const [data, setData] = useState({
    scale:0,
    price:0,
    userId : 0
  })

   // function page reload first time and once
   useEffect(() => {
    dispatch(fetchUsers())
      .then(() => {
        setLoading(false)
      })
    },[])



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
    dispatch(addRequestHandler(data))
      .then(() => {
        // move to router / if successfully
          navigate("/")
      })
      .catch(() => {
        // stay in this page
        navigate("/form-add")
      })
  }

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
        <h1 className='text-center fw-bold fst-italic'>Form Menambah Pesanan</h1>
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
              onChange={selectedOption => setData({ ...data, userId: selectedOption.value })}
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