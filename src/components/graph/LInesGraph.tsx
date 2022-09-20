import {
    PieChart,
    Pie,
  } from "recharts"
  import "./graph.css"
  import { FC } from "react"
  import { getGraphData } from "../../service/commitsToGraph"
  
  interface GraphProps {
    showUsers: string[]
    timeFrame: string
  }
  
  const  LinesGraph: FC<GraphProps> = ({ showUsers, timeFrame }) => {
    const colors = ["#8884d8", "green", "red", "yellow", "blue"]
    const graphData = getGraphData(timeFrame, showUsers)

    const test1 = [{name: "erlestor", value: 100}, {name: "bruker1", value: 70}]
  
    return (
      <div className="chart-container">
        <h1>Commits</h1>
        <PieChart width={730} height={450}>
            <Pie data={test1} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8"  />
        </PieChart>
      </div>
    )
  }
  
  export default LinesGraph
  