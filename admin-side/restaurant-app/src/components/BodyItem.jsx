function BodyItem({item,index,handleClickDelete,handleClickEdit}) {
  return  <tr key={index}>
            <th scope="row">{++index}</th>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>
              <img src={item.imgUrl} width={50} />
            </td>
            <td>{item.Author.username}</td>
            <td>{item.Category.name}</td>
            <td className='d-flex'>
              <button className='btn btn-danger btn-sm' onClick={() => {
                handleClickDelete(item.id)
              }}><i className="bi bi-trash"></i></button>
              <button className='btn btn-warning btn-sm' onClick={() => {
                handleClickEdit(item.id)
              }}><i className="bi bi-pencil"></i></button>
              </td>
          </tr>
}

export default BodyItem
