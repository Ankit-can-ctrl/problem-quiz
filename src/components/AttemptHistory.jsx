const AttemptHistory = ({ attemptHistory }) => {
  if (attemptHistory.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">No previous attempts</p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Attempt History</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-left">Date</th>
              <th className="p-2 border text-left">Score</th>
              <th className="p-2 border text-left">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attemptHistory.map((attempt, index) => {
              const attemptDate = new Date(attempt.timestamp);
              const percentage = Math.round(
                (attempt.score / attempt.totalQuestions) * 100
              );

              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-2 border">
                    {attemptDate.toLocaleDateString()}{" "}
                    {attemptDate.toLocaleTimeString()}
                  </td>
                  <td className="p-2 border">
                    {attempt.score}/{attempt.totalQuestions}
                  </td>
                  <td className="p-2 border">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            percentage >= 70
                              ? "bg-green-600"
                              : percentage >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{percentage}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttemptHistory;
