import "./App.css"
import CommitsGraph from "./components/graph/CommitsGraph"

function App() {
  const showUsers = ["erlestor", "bruker1"]
  const timeFrame = "month"

  return (
    <div className="App">
      <CommitsGraph showUsers={showUsers} timeFrame={timeFrame} />
    </div>
  )
}

export default App
