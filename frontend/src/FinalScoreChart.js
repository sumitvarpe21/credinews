import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function FinalScoreChart({ articles }) {
  const data = {
    labels: articles.map(a => a.title),
    datasets: [
      {
        label: "Final Credibility Score",
        data: articles.map(a => a.final_score),
        backgroundColor: "#673ab7",
      },
    ],
  };

  return <Bar data={data} />;
}

export default FinalScoreChart;
