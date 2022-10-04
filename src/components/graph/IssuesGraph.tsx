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
import { getIssues } from "../../services/gitlabService"
import { getIssueGraphData } from "../../services/graph/issuesToGraph"
import { getRepoInformation } from "../../services/getRepoInformation"

interface GraphProps {
  selectedUsers: Set<string>
  timeFrame: string
}

// Graph Component for displaying graph of issues
const IssuesGraph: FC<GraphProps> = ({ selectedUsers, timeFrame }) => {
  const colors = ["#8884d8", "green", "red", "purple", "blue"]
  // issues from api
  const [issues, setIssues] = useState([])
  // data that the 'recharts' graph takes in as parameter
  const [graphData, setGraphData]: any = useState([])

  useEffect(() => {
    // on load => get the issues from gitlab api
    const projectId = getRepoInformation().projectId
    if (!projectId) return

    getIssues(projectId).then((issues: any) => {
      setIssues(issues)
    })
  }, [])

  useEffect(() => {
    // everytime filters are changed, get the correct graph data by passing commits to getGraphData
    const graphData = getIssueGraphData(timeFrame, selectedUsers, issues)
    setGraphData(graphData)
  }, [issues, selectedUsers, timeFrame])

  return (
    <div className="chart-container">
      <h1>Issues</h1>
      {selectedUsers.size > 0 ? (
        <>
          <h5>number of issues</h5>
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
              {Array.from(selectedUsers).map((user, userIdx) => {
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
        </>
      ) : (
        <h4>Select one or more users to view graph</h4>
      )}
    </div>
  )
}

export default IssuesGraph
