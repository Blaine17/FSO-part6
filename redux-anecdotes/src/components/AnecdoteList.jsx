import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifcationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(anecdote => {
        console.log(anecdote)
        return state.filter === ''
          ? anecdote
          : anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase())
      })
    console.log(filteredAnecdotes)
    return filteredAnecdotes
  })
  const handleClick = (anecdote) => {
    // anecdoteService.updateVotes(anecdote)
    dispatch(vote(anecdote))
    dispatch(setNotification(`voted for ${anecdote.content}`, 5))
    // dispatch(createNotifcation(`voted for ${anecdote.content}`))
    // setTimeout(() => dispatch(removeNotifcation(`notification finished`)), 5000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  console.log(sortedAnecdotes[0])
  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
 
  // return (
  //   <div>{sortedAnecdotes[0].content}</div>
  // )
}

export default AnecdoteList