import { filterAnecdotes } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    console.log(event.target.value)
    const x = filterAnecdotes(filter)
    console.log(x)
    dispatch(x)
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter