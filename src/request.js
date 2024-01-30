import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = async() => {
    const request = await axios.get(baseUrl)
    // return (await request).data
    return request.data
}

export const createAnecdote = async(content) => {
    const newAnecdote = {
        // content: typeof content === 'object' ? content.content : content,
        content,
        id: getId(),
        votes: 0,
    }
    const request = await axios.post(baseUrl, newAnecdote)
    return request.data
}

export const updateVote = async(anecdote) => {
    const id = anecdote.id
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const request = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return request.data
}