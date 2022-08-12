import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Statistics = (props) => {
  if (props.bad === 0 && props.good === 0 && props.neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.good + props.bad + props.neutral} />
      <StatisticLine text="average" value ={(props.good - props.bad)/(props.good + props.bad + props.neutral)} />
      <StatisticLine text="positive" value ={`${(props.good)/(props.bad + props.good + props.neutral) * 100} %`} />
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <Statistics bad={bad} good={good} neutral={neutral}/>
    </div>
  )
}

export default App
