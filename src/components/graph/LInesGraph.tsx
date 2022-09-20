import {
  PieChart,
  Pie,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts"
import "./graph.css"
import { FC } from "react"
import { linesWritten } from "../../service/linesWritten"

interface GraphProps {
  showUsers: string[]
  timeFrame: string
}

const LinesGraph: FC<GraphProps> = ({ showUsers, timeFrame }) => {
  const colors = ["#8884d8", "green", "red", "yellow", "blue"]

  const data = linesWritten

  return (
    <div className="chart-container">
      <h1>Commits</h1>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="lines" fill="#8884d8" />
      </BarChart>
    </div>
  )
}

export default LinesGraph
