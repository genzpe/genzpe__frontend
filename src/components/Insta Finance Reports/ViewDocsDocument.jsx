import { useLocation } from "react-router-dom";

import pdf_download_icon from "../../assets/pdfDownloadIcon.png";
const ViewDocsDocument = () => {
  const location = useLocation();
  // Extract data from location.state safely
  const { response } = location.state || {};

  if (!response) {
    return <p className="text-center text-gray-500 mt-4">No data available.</p>;
  }

  const { Metadata, Reportdata } = response?.InstaAPIReport;
  const documents = Reportdata?.InstaDocs?.Document || [];

  return (
    <div className="md:max-w-7xl max-w-3xl mx-auto mt-6 bg-white rounded-lg">
      <h2 className="md:text-2xl text-xl font-semibold text-center mb-4">
        📄 InstaDocs Report
      </h2>

      {/* Metadata Section */}
      {Metadata ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-6 mx-auto">
          <h3 className="text-lg  font-semibold text-gray-700 mb-2">
            📌 Report Metadata
          </h3>
          <p>
            <strong>Company Name:</strong> {Metadata.CompanyName}
          </p>
          <p>
            <strong>Company CIN:</strong> {Metadata.CompanyCIN}
          </p>
          <p>
            <strong>Order ID:</strong> {Metadata.OrderID}
          </p>
          <p>
            <strong>Order Timestamp:</strong> {Metadata.OrderTimeStamp}
          </p>
          <p>
            <strong>Report Type:</strong> {Metadata.ReportType}
          </p>
          <p>
            <strong>Version:</strong> {Metadata.Version}
          </p>
          <p>
            <strong>Delivery Timestamp:</strong> {Metadata.DeliveryTimeStamp}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No metadata available.</p>
      )}

      {/* Document Table */}
      <div className="flex justify-center items-center min-h-screen p-2">
        <div className="overflow-x-auto border-black">
          <table className="w-full border-collapse border-2 border-black text-center">
            <thead>
              <tr className="bg-blue-600 text-sm text-white">
                <th className="p-2 border-2 border-black">Document Name</th>
                <th className="p-2 border-2 border-black">Category</th>
                <th className="p-2 border-2 border-black min-w-[110px]">
                  Filing Date
                </th>
                <th className="p-2 border-2 border-black min-w-[100px]">
                  Size (MB)
                </th>
                <th className="p-2 border-2 border-black">Download</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={index} className="border-2 border-black">
                    <td className="p-2 font-bold border-2 border-black">
                      {doc.DocumentName}
                    </td>
                    <td className="p-2 border-2 border-black">
                      {doc.DocumentCategory}
                    </td>
                    <td className="p-2 border-2 border-black">
                      {doc.DocumentFillingDate || "N/A"}
                    </td>
                    <td className="p-2 border-2 border-black">
                      {doc.DocumentSize}
                    </td>
                    <td className="p-2 border-2 border-black">
                      {doc.DocumentLink ? (
                        <a
                          href={doc.DocumentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black underline"
                        >
                          <img
                            src={pdf_download_icon}
                            className="m-auto w-[36px] h-[36px]"
                            alt="download"
                          />
                        </a>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500 border-2 border-black"
                  >
                    No documents available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDocsDocument;
