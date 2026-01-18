import { Doughnut } from "react-chartjs-2";

function AdminCharts({ stats }) {
  const data = {
    labels: ["High Credibility", "Needs Verification", "Low Credibility"],
    datasets: [
      {
        data: [
          stats.high || 0,
          stats.medium || 0,
          stats.low || 0,
        ],
        backgroundColor: ["green", "orange", "red"],
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default AdminCharts;
