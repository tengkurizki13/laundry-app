
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,deleteUserHandler } from '../store/actions/actionCreator';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// fuction for home page
function CustomerPage() {
   // define fuction needed for action
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

  // states
  const[loading,setLoading] = useState(true)
  const {users} = useSelector(((state) => state.user))
  const [searchTerm, setSearchTerm] = useState('');
  // function page reload first time and once
  useEffect(() => {
    dispatch(fetchUsers())
      .then(() => {
        setLoading(false)
      })
    },[])

    
  function changePageToForm(form,id){
    if (form == "add") {
      navigate("/form-add-customer")
    }else if (form == "edit") {
      navigate("/form-edit-customer/" + id)
    }else{
      navigate("/customer")
    }
  }
 
function handleSearch(event) {
  const searchTerm = event.target.value;
  setSearchTerm(searchTerm);
}


function handleSubmit(event) {
  event.preventDefault();
  dispatch(fetchUsers(searchTerm)); // Menggunakan filter dan searchTerm
}




  function handleDelete(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserHandler(id))
        .then(() => {
          dispatch(fetchUsers())
          .then(() => {
            navigate("/customer")
          })
        })
        console.log(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
   
  }

  console.log(users,"ori");

  // contional if data not relode yet
  if (loading) {
    return <h1>memuat...</h1>
  }

    // contional if data not relode yet

  return (
    <>
      <div className="row mt-5">
            <div className="col-10 d-flex">
              <form className="d-flex me-3" onSubmit={handleSubmit}>
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleSearch}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
            <div className="col-2 text-end">
                   <button className="btn btn-success shadow" onClick={() => {changePageToForm("add")}} ><i className="bi bi-plus-circle"></i></button>
            </div>
      </div>
     
      <div className='mt-3'>
  {users.length === 0 ?  
    <p className='text-center mt-5'>Data kosong</p> 
    : 
    <table className="table shadow">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">username</th>
          <th scope="col">No WhatApp</th>
          <th scope="col">Waktu daftar</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{user.username}</td>
            <td>{user.phoneNumber}</td>
            <td>{format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
            <td>
              <button className='btn btn-danger me-3' onClick={() => handleDelete(user.id)}><i className="bi bi-trash"></i></button>
              <button className='btn btn-warning me-3' onClick={() => {changePageToForm("edit",user.id)}}><i className="bi bi-pencil"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  }
</div>
    </>
  )
}

export default CustomerPage
