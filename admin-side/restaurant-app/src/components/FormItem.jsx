import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewItem, fetchCategories, fetchItemById, fetchItems, updateItem } from '../store/actions/actionCreator';
import { useNavigate, useParams } from 'react-router-dom';

function FormItem() {
  let { id } = useParams()
  const[message,setMessage] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {categories} = useSelector(((state) => state.category))
  const {item} = useSelector(((state) => state.item))
  const [form, setForm] = useState({
    name:"",
    description:"",
    price:0,
    imgUrl:"",
    categoryId:0,
    first_ingredients: "",
    second_ingredients: "",
    thirt_ingredients: "",
  })

  useEffect(() => {
    dispatch(fetchCategories())
  },[])

  if(id) {
  useEffect(() => {
        dispatch(fetchItemById(id))
      },[])
      
      useEffect(() => {
        setForm({
          name:item.name,
          description:item.description,
          price:item.price,
          imgUrl:item.imgUrl,
          categoryId:item.categoryId,
          first_ingredients:item.name ? item.Ingredients[0].name : "",
          second_ingredients:item.name  ? item.Ingredients[1].name : "",
          thirt_ingredients:item.name  ? item.Ingredients[2].name : "",
        })
      },[item])
    }

  function handleClick() {
    navigate("/")
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    // let messages = []
    // if(!form.name){
    //   messages.push("name is required")
    // }
    // if(!form.description){
    //   messages.push("description is required")
    // }
    // if(!form.price){
    //   messages.push("price is required")
    // }
    // if(!form.imgUrl){
    //   messages.push("imgUrl is required")
    // }
    // if(!form.categoryId){
    //   messages.push("category is required")
    // }
    // if(!form.first_ingredients){
    //   messages.push("first ingredients is required")
    // }
    // if(!form.second_ingredients){
    //   messages.push("second ingredients is required")
    // }
    // if(!form.thirt_ingredients){
    //   messages.push("third ingredients is required")
    // }

    // setMessage(messages)

    // if(messages.length === 0){
    
    form.price = Number(form.price)
    form.categoryId = Number(form.categoryId)
    form.authorId = 1
    form.ingredients = [{
      id:item.name ? item.Ingredients[0].id: 0,
      name:form.first_ingredients
    },
    {
      id:item.name ? item.Ingredients[1].id: 1,
      name:form.second_ingredients
    },
    {
      id:item.name ? item.Ingredients[2].id: 3,
      name:form.thirt_ingredients
    }
  ]

    if(id) {
      dispatch(updateItem(id,form))
      .then(() => {
        dispatch(fetchItems())
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'update item successfully',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/")
      })
    }else{
      dispatch(addNewItem(form))
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'add item successfully',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/")
      })
      .catch(() => {
        navigate("/form-item")
      })
    }
  // }
  }
  return (
    <>
    {/* {message.length !== 0 ? (  <div class="alert alert-danger" role="alert">
      {message?.map((el,i) =>{
        return <ul key={i}>
          <li>{el}</li>
        </ul>
      })}
    </div>) : ""} */}
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label  className="form-label">New Name Item</label>
          <input type="text" className="form-control" name='name' id="name" value={form.name} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">New Description Item</label>
          <input type="text" className="form-control" name='description' id="description" value={form.description} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">New Price Item</label>
          <input type="number" className="form-control" name='price' id="price" value={form.price} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">New Image Item</label>
          <input type="text" className="form-control" name='imgUrl' id="imgUrl" value={form.imgUrl} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" aria-label="Default select example" name='categoryId' onChange={(e) => handleChange(e)}>
              <option selected>--select category---</option>
              {categories?.map((el,i) => {
                  return  <option value={el.id} key={i} selected = {el.id == form.categoryId ? true : false}>{el.name}</option>
                })}
        </select>
        </div>
        <div className="mb-3">
          <label  className="form-label">First Ingredient</label>
          <input type="text" className="form-control" name='first_ingredients' id="first_ingredients" value={form.first_ingredients} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Second Ingredient</label>
          <input type="text" className="form-control" name='second_ingredients' id="second_ingredients" value={form.second_ingredients} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">third Ingredient</label>
          <input type="text" className="form-control" name='thirt_ingredients' id="thirt_ingredients" value={form.thirt_ingredients} onChange={(e) => handleChange(e)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-danger ms-3" onClick={handleClick}>kembali</button>
    </form>
    </>
  )
}

export default FormItem
