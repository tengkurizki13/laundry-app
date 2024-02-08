import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewCategory, fetchCategories, fetchCategoryById, updateCategory } from '../store/actions/actionCreator';

function FormCategory() {
  let { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {category} = useSelector(((state) => state.category))
  const [form, setForm] = useState({
    name:"",
  })

  if(id) {
  useEffect(() => {
      dispatch(fetchCategoryById(id))
    },[])
  useEffect(() => {
      setForm({
          name : category.name
        })
  },[category])
  }


  function handleClick() {
   navigate("/categories")
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })

  
  }

  function handleSubmit(e) {
    e.preventDefault()

    if(id) {
      dispatch(updateCategory(id,form))
      .then(() => {
        dispatch(fetchCategories())
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "update category successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/categories")
      })
    }else{
      dispatch(addNewCategory(form))
      .then(() => {
        dispatch(fetchCategories())
        navigate("/categories")
      })
      .catch(() => {
        console.log("masuk 3");
        navigate("/form-category")
      })
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">Name Category</label>
          <input type="text" className="form-control" name='name' id="name" value={form.name} onChange={(e) => handleChange(e)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-danger ms-3" onClick={handleClick}>kembali</button>
    </form>
    </>
  )
}

export default FormCategory
