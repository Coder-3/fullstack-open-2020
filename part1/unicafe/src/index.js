import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ header }) => <h2>{header}</h2>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ statName, statValue }) => <p>{statName} {statValue}</p>

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      <Heading header="statistics" />
      <table>
        <tbody>
          <tr>
            <td><Statistic statName="good" statValue={good} /></td>
          </tr>
          <tr>
            <td><Statistic statName="neutral" statValue={neutral} /></td>
          </tr>
          <tr>
            <td><Statistic statName="bad" statValue={bad} /></td>
          </tr>
          <tr>
            <td><Statistic statName="total" statValue={total} /></td>
          </tr>
          <tr>
            <td><Statistic statName="average" statValue={average} /></td>
          </tr>
          <tr>
            <td><Statistic statName="positive" statValue={positive} /></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
  
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

  const total = () => {
    return (good + neutral + bad)
  }

  const average = () => {
    return  total() === 0 ? 0 : ((good * 1) + (bad * (-1))) / total()
  }

  const positive = () => {
    return total() === 0 ? '0%' : ((good / total()) * 100) + "%"
  }

  return (
    <div>
      <Heading header="give feedback" />
      <Button handleClick={() => handleGood(good + 1)} text="good" />
      <Button handleClick={() => handleNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => handleBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total()} average={average()} positive={positive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)