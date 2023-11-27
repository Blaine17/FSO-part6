import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const object = { content: content, votes: 0}
  const response = await axios.post(baseURL, object)
  console.log(response)
  return response.data
}

const updateVotes = async (anecdote) => {
  const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  console.log(changedAnecdote)
  const response = await axios.put(`${baseURL}/${anecdote.id}`, changedAnecdote)
  console.log(response.data)
  return response.data
}

export default { getAll, createNew, updateVotes }