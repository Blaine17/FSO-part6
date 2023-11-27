import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateVotes } from './services/anecdotes'
import axios from 'axios'
import { useContext, useReducer } from 'react'
import AnecdoteContext from './AnecdoteContext'
import NotificationContext from './AnecdoteContext'


const App = () => {
  // const [notification, notificationDispatch] = useReducer(notifcationReducer, null)

  const queryClient = useQueryClient()


  const newAnecdoteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(anecdotes)
      const updatedAnecdotes = anecdotes.map(anecdote => {
        return anecdote.id === updatedAnecdote.id
        ? updatedAnecdote
        : anecdote 
      })
      console.log(updatedAnecdotes)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      // queryClient.invalidateQueries({ querykey: ['anecdotes'] })
    },
  })

  const [notification, dispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate(anecdote)
    dispatch({type: 'SET', payload: `${anecdote.content} liked`})
    // notificationDispatch({type: 'SET', payload: `${anecdote.content} liked`})
    setTimeout(() => dispatch({type: 'REMOVE', payload: null}), 5000)
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => 
    axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>{result.error.message}</div>
  }

  const anecdotes = result.data

  console.log(anecdotes)
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification notification={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
