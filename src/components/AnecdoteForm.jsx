import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useNotificationDispatch } from '../context/notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({queryKey:['anecdotes']})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  console.log(newAnecdoteMutation.data)


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    newAnecdoteMutation.mutate(content)

    // for notification
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: `anecdote ${content} is added`
    })
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
