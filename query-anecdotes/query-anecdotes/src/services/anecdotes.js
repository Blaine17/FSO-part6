import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const newAnecdote = async (anecdote) => {
  const res = await axios.post(baseUrl, {content: anecdote, votes: 0})
  console.log(res.data)
  return res.data
}

export const updateVotes = async (anecdote) => {
  const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  console.log(changedAnecdote)
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, changedAnecdote)
  console.log(response.data)
  return response.data
}