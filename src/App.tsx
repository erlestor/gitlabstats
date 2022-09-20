import "./App.css"
import CommitsGraph from "./components/graph/CommitsGraph"
import LinesGraph from "./components/graph/LInesGraph"

function App() {
  const showUsers = ["erlestor", "bruker1"]
  const timeFrame = "week"

  return (
    <div className="App">
      <LinesGraph showUsers={showUsers} timeFrame={timeFrame}  />
      <CommitsGraph showUsers={showUsers} timeFrame={timeFrame}  />
    </div>
  )
}

export default App
