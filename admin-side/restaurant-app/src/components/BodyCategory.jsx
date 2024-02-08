function BodyCategory({category,index,handleClickDelete,handleClickEdit}) {
  return  <tr key={index}>
  <th scope="row">{++index}</th>
  <td>{category.name}</td>
  <td className='d-flex'>
    <button className='btn btn-danger btn-sm' onClick={() => {
      handleClickDelete(category.id)
    }}><i className="bi bi-trash"></i></button>
    <button className='btn btn-warning btn-sm' onClick={() => {
      handleClickEdit(category.id)
    }}><i className="bi bi-pencil"></i></button>
    </td>
</tr>
}

export default BodyCategory
