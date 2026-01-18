import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CredibilityChart({ ai, community, source }) {
  const data = {
    labels: ["AI Analysis", "Community Feedback", "Source Trust"],
    datasets: [
      {
        data: [ai, community, source],
        backgroundColor: ["#ff6384", "#36a2eb", "#4caf50"],
      },
    ],
  };

  return (
    <div style={{ width: "300px" }}>
      <Pie data={data} />
    </div>
  );
}

export default CredibilityChart;
