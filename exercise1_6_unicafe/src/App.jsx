import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const CountDisplay = ({counter, label}) => {
  return (
    <p>{label} {counter}</p>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Stat = ({label, value, unit}) => {
  return (
    <p>
      {label} {value} {unit}
    </p>
  )
}

const Statistics = ({good,bad,neutral}) => {

  const goodCount = good
  const badCount = bad
  const neutralCount = neutral

  const calculateAvg = () => {
    const total = goodCount + badCount * -1
    return total / (goodCount + badCount + neutralCount)
  }

  const calculatePositivePercent = () => {
    return (goodCount / (goodCount + neutralCount + badCount))* 100
  }
  if (good + bad + neutral != 0) {
    return (
      <div>
        <CountDisplay label='Good' counter={goodCount}/>
        <CountDisplay label='Neutral' counter={neutralCount} />
        <CountDisplay label='Bad' counter={badCount} /> 
        <Stat value={calculateAvg()} label='Average'/>
        <Stat value ={calculatePositivePercent()} label='Positive' unit='%'/>
      </div>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)

  const incrementCounter = (counter, func) => {
    const updatedValue = counter + 1
    func(updatedValue)
  }

  const incrementGood = () => {
    incrementCounter(goodCount, setGoodCount)
  }
  
  const incrementBad = () => {
    incrementCounter(badCount, setBadCount) 
  }

  const incrementNeutral = () => {
    incrementCounter(neutralCount, setNeutralCount)
  }


  return (
  <div>
    <p>Hi :D</p>
    <Header text='Give Feedback' />
    <Button text='Good' onClick={incrementGood}/>
    <Button text='Neutral' onClick={incrementNeutral} />
    <Button text='Bad' onClick={incrementBad}/>
    <Header text='Statistics' />
    <Statistics good={goodCount} bad={badCount} neutral={neutralCount} />
    
  </div>
  )
}

export default App
