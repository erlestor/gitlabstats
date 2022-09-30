import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"
import "./graph.css"
import { FC, useEffect, useState } from "react"
import { getGraphData } from "../../services/commitsToGraph"
import { getCommits } from "../../services/gitlabService"
import { getRepoInformation } from "../../getRepoInformation"

interface GraphProps {
  showUsers: string[]
  timeFrame: string
}

const CommitsGraph: FC<GraphProps> = ({ showUsers, timeFrame }) => {
  const colors = ["#8884d8", "green", "red", "purple", "blue"]
  const [commits, setCommits] = useState([])
  const [graphData, setGraphData]: any = useState([])

  useEffect(() => {
    const projectId = getRepoInformation().projectId
    if (!projectId) return

    getCommits(projectId).then((commits: any) => {
      setCommits(commits)
    })
  }, [])

  useEffect(() => {
    const graphData = getGraphData(timeFrame, showUsers, commits)
    setGraphData(graphData)
  }, [commits, showUsers, timeFrame])

  return (
    <div className="chart-container">
      <h1>Commits</h1>
      <h5>number of commits</h5>
      {showUsers.length > 0 ? (
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={graphData} margin={{ left: -35 }}>
            <defs>
              {colors.map((color, colorIdx) => (
                <linearGradient
                  key={colorIdx}
                  id={color}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              // label={{ value: "date", position: "insideBottomRight", offset: 0 }}
            />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" />
            {showUsers.map((user, userIdx) => {
              const color = colors[userIdx]
              const fill = "url(#" + color + ")"
              return (
                <Area
                  key={userIdx}
                  type="monotone"
                  dataKey={user}
                  stroke={color}
                  fillOpacity={0.8}
                  fill={fill}
                />
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <h3>Select one or more users to view graph</h3>
      )}
    </div>
  )
}

export default CommitsGraph
