import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories } from '../store/actions/actionCreator';
import { useNavigate } from 'react-router-dom';
import BodyCategory from '../components/BodyCategory';


function CategoryPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {categories} = useSelector(((state) => state.category))
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCategories())
    .finally(() => {
      setLoading(false)
    })
  },[])

  
  function handleClick() {
    navigate("/form-category")
  }

  function handleClickDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        dispatch(deleteCategory(id))
        .then(() => {
          dispatch(fetchCategories())
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
   
   }
 
   function handleClickEdit(id) {
     navigate("/form-category/"+ id)
   }

   if (loading) {
    let url = "https://tenor.com/view/loading-loading-forever-bobux-loader-gif-18368917"
    return( <h1>Memuat ...</h1>)
  }
  return (
    <>
    <button className="btn btn-primary" onClick={handleClick}>Add Category</button>
     <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((el,i) => {
            return <BodyCategory category={el} index={i} handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit}/>
          })}
         
        </tbody>
      </table>
    </>
  )
}

export default CategoryPage
