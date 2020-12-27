import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ header }) => <h2>{header}</h2>

const Button = ({ text, handleClick }) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ quality, quantity }) => <p>{quality} {quantity}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = (goodValue) => {
    setGood(goodValue)
  }
  
  const handleNeutral = (neutralValue) => {
    setNeutral(neutralValue)
  }
  
  const handleBad = (badValue) => {
    setBad(badValue)
  }

  return (
    <div>
      <Heading header="give feedback" />
      <Button handleClick={() => handleGood(good + 1)} text="good" />
      <Button handleClick={() => handleNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => handleBad(bad + 1)} text="bad" />
      <Heading header="statistics" />
      <Statistic quality="good" quantity={good} />
      <Statistic quality="neutral" quantity={neutral} />
      <Statistic quality="bad" quantity={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)