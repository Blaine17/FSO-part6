import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifcationReducer'
 
const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(anecdote)
    dispatch(createAnecdote(anecdote))
    // const newAnecdote = await anecdoteService.createNew(anecdote)
    // console.log(newAnecdote)
    // dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`created ${anecdote}`, 5))
    // dispatch(createNotifcation(`created ${anecdote}`))
    // setTimeout(() => dispatch(removeNotifcation(`notification finished`)), 5000)
  }

  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm