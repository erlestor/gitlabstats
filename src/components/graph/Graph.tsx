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
import { commits } from "./data"
import { FC } from "react"

interface Commit {
  authorName: string
  date: string
  numberOfCommits: number
}

interface GraphProps {
  showUsers: string[]
  timeFrame: string
}

const Graph: FC<GraphProps> = ({ showUsers, timeFrame }) => {
  const colors = ["#8884d8", "green", "red", "yellow", "blue"]

  const getDateSpan = (): Date[] => {
    const endDate = new Date()
    if (timeFrame === "week") {
      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 7
      )
      return [startDate, endDate]
    }
    if (timeFrame === "month") {
      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 1,
        endDate.getDate()
      )
      return [startDate, endDate]
    }
    if (timeFrame === "year") {
      const startDate = new Date(
        endDate.getFullYear() - 1,
        endDate.getMonth(),
        endDate.getDate()
      )
      return [startDate, endDate]
    }
    return []
  }

  const getDatesInRange = (startDate: any, endDate: any) => {
    const date = new Date(startDate.getTime())
    const dates = []
    while (date <= endDate) {
      dates.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return dates
  }

  const getFormattedDate = (date: Date) => {
    const day = date.getDate().toString()
    const month = (date.getMonth() + 1).toString()
    // const year = date.getFullYear().toString()
    return day + "/" + month
  }

  const addDatesAsData = (data: any) => {
    const dateSpan: Date[] = getDateSpan()
    const datesInRange = getDatesInRange(dateSpan[0], dateSpan[1])
    datesInRange.forEach((date) => {
      const formattedDate = getFormattedDate(date)
      let datapoint = { name: formattedDate }
      showUsers.forEach((user) => {
        datapoint = {
          ...datapoint,
          [user]: 0,
        }
      })
      data.push(datapoint)
    })
  }

  const inDateSpan = (commit: Commit) => {
    const dateSpan: Date[] = getDateSpan()
    const commitDate = new Date(commit.date)
    const startDate = dateSpan[0]
    const endDate = dateSpan[1]
    return commitDate >= startDate && commitDate <= endDate
  }

  const getGraphData = () => {
    const data: any = []
    addDatesAsData(data)
    const filteredCommits = commits.filter((c) => inDateSpan(c))

    filteredCommits.forEach((commit) => {
      const date = new Date(commit.date)
      const formattedDate = getFormattedDate(date)
      const datapointIdx = data.findIndex((d: any) => d.name === formattedDate)
      data[datapointIdx] = {
        ...data[datapointIdx],
        [commit.authorName]: commit.numberOfCommits,
      }
    })

    return data
  }

  return (
    <div className="chart-container">
      <h1>Commits</h1>
      <AreaChart width={800} height={500} data={getGraphData()}>
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
        {showUsers.map((user: any, userIdx: number) => {
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

export default Graph
