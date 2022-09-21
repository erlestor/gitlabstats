import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
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
      <h1>Lines written</h1>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="lines" fill="#8884d8">
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  )
}

export default LinesGraph
