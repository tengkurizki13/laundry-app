import { useState } from 'react'
import { registerHandler } from '../store/actions/actionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FormAddItem() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
    role:"admin",
    phoneNumber:"",
    address:"",
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerHandler(form))
        .then(() => {
          navigate("/")
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'register successfully',
            showConfirmButton: false,
            timer: 1500
          })
        })
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="username" className="form-label">New Username</label>
          <input type="text" className="form-control" name='username' id="username" value={form.username} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">New Email</label>
          <input type="email" className="form-control" name='email' id="email" value={form.email} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">New Password</label>
          <input type="password" className="form-control" name='password' id="password" value={form.password} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="phoneNumber" className="form-label">New Phone Number</label>
          <input type="text" className="form-control" name='phoneNumber' id="phoneNumber" value={form.phoneNumber} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="address" className="form-label">New Address</label>
          <input type="text" className="form-control" name='address' id="address" value={form.address} onChange={(e) => handleChange(e)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  )
}

export default FormAddItem
