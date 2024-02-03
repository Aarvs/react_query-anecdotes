import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateVote } from './request'
import { useNotificationDispatch } from './context/notificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation({
    mutationFn :updateVote,
    onSuccess: (updatedVote) => {
      // queryClient.invalidateQueries({queryKey:["anecdotes"]})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const target = anecdotes.find((anecdote) => anecdote.id === updatedVote.id)
      queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) => anecdote.id !== target.id ? anecdote : updatedVote))
    } 
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateVoteMutation.mutate(anecdote)

    // for notification 
    dispatch({
        type: 'VOTED_ANECDOTE',
        payload: `anecdote "${anecdote.content}" voted`
    })
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isError){
    return <div>anecdote service not available due to problem in server</div>
  }

  if(result.isLoading){
    return <div>Loading.....</div>
  }

  const anecdotes = result.data
  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
            {console.log(anecdote.content)}
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
