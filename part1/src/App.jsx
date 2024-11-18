import {useState} from 'react'

const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, wow you are {age} years old!!!</p>
      <p>You were most likely born in {bornYear()}</p>
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>


const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  /*
  Never call use state from inside a conditional or loop
  */
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    increaseLeft()
    const updatedLeft = clicks.left + 1
    setTotal(clicks.right + updatedLeft)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R')) // DONT PUSH
    increaseRight()
    const updatedRight = clicks.right + 1
    setTotal(updatedRight + clicks.left)
  }

  const increaseLeft = () => {
    setClicks({
      ...clicks,
      left : clicks.left + 1,
    })
  }
  const increaseRight = () => {
    setClicks({
      ...clicks,
      right : clicks.right + 1
    })
  }
  
  
  return (
    <div>
      <Display counter = {clicks.left}/>
      <Display counter = {clicks.right}/>
      <Button onClick = {handleLeftClick} text = 'L'/>
      <Button onClick = {handleRightClick} text = 'R'/>
      <History allClicks = {allClicks} />
      <p>Toal Clicks: {total}</p>
    </div>
  )
}

/*
const App = () => {
  const name = 'Peter'
  const age = 10
  
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Gregory' age={12+10}/>
      <Hello name={name} age={age}/>
    </div>
  )
}*/

export default App