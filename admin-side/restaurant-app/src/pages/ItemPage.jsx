import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, fetchItems } from '../store/actions/actionCreator';
import { useNavigate } from "react-router-dom";
import BodyItem from '../components/BodyItem';


function ItemPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {items} = useSelector(((state) => state.item))
  const [loading,setLoading] = useState(true)

useEffect(() => {
    dispatch(fetchItems())
    .finally(() => {
      setLoading(false)
    })
  },[])

  function handleClick() {
    navigate("/form-item")
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
        dispatch(deleteItem(id))
        .then(() => {
          dispatch(fetchItems())
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
    navigate("/form-item/" + id)
  }

  if (loading) {
    let url = "https://tenor.com/view/loading-loading-forever-bobux-loader-gif-18368917"
    return( <h1>Memuat ...</h1>)
  }
  
  return (
    <>
    <button className="btn btn-primary" onClick={handleClick}>Add Item</button>
     <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">price</th>
            <th scope="col">image</th>
            <th scope="col">author</th>
            <th scope="col">category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((el,i) => {
            return <BodyItem item={el} index={i} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
          })}
         
        </tbody>
      </table>
    </>
  )
}

export default ItemPage
