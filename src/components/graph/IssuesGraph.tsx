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
  selectedUsers: Set<string>;
  timeFrame: string;
}

const IssuesGraph: FC<GraphProps> = ({ selectedUsers, timeFrame }) => {
  const colors = ["#8884d8", "green", "red", "purple", "blue"];
  const [issues, setIssues] = useState([]);
  const [graphData, setGraphData]: any = useState([]);

  useEffect(() => {
    const projectId = getRepoInformation().projectId;
    if (!projectId) return;

    getIssues(projectId).then((issues: any) => {
      setIssues(issues);
    });
  }, []);

  useEffect(() => {
    const graphData = getIssueGraphData(timeFrame, selectedUsers, issues);
    setGraphData(graphData);
  }, [issues, selectedUsers, timeFrame]);

  return (
    <div className="chart-container">
      <h5>Number of issues</h5>
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" />
          {Array.from(selectedUsers).map((user, userIdx) => {
            const color = colors[userIdx];
            const fill = "url(#" + color + ")";
            return (
              <Area
                key={userIdx}
                type="monotone"
                dataKey={user}
                stroke={color}
                fillOpacity={0.8}
                fill={fill}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssuesGraph;
