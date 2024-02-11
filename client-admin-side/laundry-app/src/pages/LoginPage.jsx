import {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginHandler } from '../store/actions/actionCreator';


// fuction for login
function LoginPage() {
  // define fuction needed for action
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // state
  const [data, setData] = useState({
    username:"",
    password:"",
  })


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
    dispatch(loginHandler(data))
      .then(() => {
        // move to router / if successfully
          navigate("/")
      })
      .catch(() => {
        // stay in this page
        navigate("/login")
      })
  }
  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
        <h1 className='text-center fw-bold fst-italic'>Login</h1>
        <form onSubmit={handleSubmit}>
          {/* email input */}
          <div className="mb-2">
            <label className="form-label fst-italic">your username</label>
            <input type="text" name='username' id='username' className="form-control shadow p-3 bg-body rounded" value={data.username} onChange={(e) => handleChange(e)}/>
          </div>
          {/* passwordinput */}
          <div className="mb-2">
            <label className="form-label fst-italic">your password</label>
            <input type="password" name='password' id='password' className="form-control shadow p-3 bg-body rounded" value={data.password} onChange={(e) => handleChange(e)}/>
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

export default LoginPage