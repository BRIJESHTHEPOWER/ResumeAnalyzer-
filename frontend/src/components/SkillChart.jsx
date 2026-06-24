import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SkillChart({ skills = [] }) {

  const data = {
    labels: skills,

    datasets: [
      {
        label: "Skills",
        data: skills.map(() => 1),

        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
          "#ec4899",
          "#84cc16",
          "#14b8a6",
          "#f97316"
        ],

        borderWidth: 2
      }
    ]
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">

      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Skill Analytics
      </h3>

      {skills.length === 0 ? (
        <p className="text-gray-500">
          No skills detected
        </p>
      ) : (
        <div className="max-w-md mx-auto">
          <Doughnut data={data} />
        </div>
      )}

    </div>
  );
}

export default SkillChart;