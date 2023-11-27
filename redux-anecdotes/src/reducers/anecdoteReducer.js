import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
// import anecdotes from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload.id
      const voteAnecdote = state.find(qoute => qoute.id === id)
      const changedAnecdote = {...voteAnecdote, votes: voteAnecdote.votes + 1}
      const updatedAnecdotes = state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
      return updatedAnecdotes
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
    }
  }

export const createAnecdote = (content) => {
   return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      console.log(newAnecdote)
      dispatch(appendAnecdote(newAnecdote))
   }
  }

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote)
    dispatch(voteForAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer