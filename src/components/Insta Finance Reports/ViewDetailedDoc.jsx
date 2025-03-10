import { useLocation } from "react-router-dom";
const ViewDetailedDoc = () => {
  const location = useLocation();
  // Extract data from location.state safely
  const { response } = location.state || {};

  if (!response) {
    return <p className="text-center text-gray-500 mt-4">No data available.</p>;
  }
  debugger;
  console.log(response);

  return (
    <div className="max-w-6xl mx-auto mt-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        📄 InstaDetailed Report
      </h2>
    </div>
  );
};

export default ViewDetailedDoc;
