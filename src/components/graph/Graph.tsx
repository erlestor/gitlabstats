import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

  const strokeColors = ["#8884d8", "green", "red", "yellow", "blue"]

  return (
    <div className="chart-container">
      <h1>Commits</h1>
      <LineChart width={800} height={500} data={getGraphData()}>
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
        {showUsers.map((user: any, userIdx: number) => (
          <Line
            key={userIdx}
            type="monotone"
            dataKey={user}
            stroke={strokeColors[userIdx]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  )
}

export default Graph
