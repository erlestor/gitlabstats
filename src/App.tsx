import "./App.css"
import Graph from "./components/graph/Graph"

function App() {
  const showUsers = ["erlestor", "bruker1"]
  const timeFrame = "year"

  return (
    <div className="App">
      <Graph showUsers={showUsers} timeFrame={timeFrame} />
    </div>
  )
}

export default App
