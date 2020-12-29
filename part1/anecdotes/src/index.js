import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat))

  const nextAnecdote = () => {
    const randomAnecdoteIndex = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(randomAnecdoteIndex)
  }

  const voteForSelectedAnecdote = () => {
    const copyOfNumberOfVotes = [...votes]
    copyOfNumberOfVotes[selected] += 1
    setVotes(copyOfNumberOfVotes)
  }

  const anecdoteWithMostVotes = () => {
    const highestVote = Math.max(...votes)
    const indexOfHighestVotes = votes.indexOf(highestVote)
    
    return [indexOfHighestVotes, highestVote]
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => voteForSelectedAnecdote()} text="vote" />
      <Button handleClick={() => nextAnecdote()} text="next anecdote" />
      <h2>Anecdote with the most votes</h2>
      <p>{props.anecdotes[anecdoteWithMostVotes()[0]]}</p>
      <p>has {anecdoteWithMostVotes()[1]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)