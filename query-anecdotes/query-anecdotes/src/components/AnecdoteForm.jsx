import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { newAnecdote } from '../services/anecdotes'
import NotificationContext from '../AnecdoteContext'
import { useContext } from 'react'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (addedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(addedAnecdote))
      queryClient.invalidateQueries({ querykey: ['anecdotes'] })
    },
    onError: (error) => {
      const message = error.response.data.error
      dispatch({type: 'SET', payload: message})
      setTimeout(() => dispatch({type: 'REMOVE', payload: null}), 5000)

      console.log(error.response.data.error)
    }
  })

  

  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    dispatch({type: 'SET', payload: `${content} created`})
      setTimeout(() => dispatch({type: 'REMOVE', payload: null}), 5000)
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
