import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
  } from "recharts"
  import "./graph.css"
  import { FC } from "react"
  import { getGraphData } from "../../service/commitsToGraph"
  
  interface GraphProps {
    showUsers: string[]
    timeFrame: string
  }
  
  const  CommitsGraph: FC<GraphProps> = ({ showUsers, timeFrame }) => {
    const colors = ["#8884d8", "green", "red", "yellow", "blue"]
    const graphData = getGraphData(timeFrame, showUsers)
  
    return (
      <div className="chart-container">
        <h1>Commits</h1>
        <AreaChart width={800} height={500} data={graphData}>
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
          <YAxis
            label={{
              value: "number of commits",
              angle: -90,
              position: "insideLeft",
            }}
          />
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
      </div>
    )
  }
  
  export default CommitsGraph
  