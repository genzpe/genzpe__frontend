import React from "react";
import { useLocation } from "react-router-dom";

const ViewLegalDoc = () => {
  const location = useLocation();
  const { response } = location.state || {};
  const {
    CompanyMasterSummary,
    DirectorMasterSummary,
    LegalSummary,
    LegalDetails,
  } = response?.ReportData || {};

  if (!response) {
    return <p className="text-center text-gray-500 mt-4">No data available.</p>;
  }
  return (
    <>
      {CompanyMasterSummary && (
        <div className="md:max-w-7xl max-x-5xl mx-auto p-6 bg-white ">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Company Basic Information
            </h3>
            <div className="w-full border border-gray-300 rounded-lg">
              {Object.entries(CompanyMasterSummary).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-2 text-sm ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div className="p-3 font-medium text-gray-700 border-r border-gray-300">
                      {key}
                    </div>
                    <div className="p-3 text-gray-900">{value}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {DirectorMasterSummary?.CurrentDirectorMasterSummary && (
        <div className="max-w-7xl mx-auto p-6 bg-white">
          {/* Title */}
          <h2 className="text-xl font-bold text-blue-950 mb-4">
            Director Master Summary
          </h2>

          {/* Horizontal Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              {/* Table Header */}
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border border-gray-300 text-left">
                    Director Name
                  </th>
                  <th className="p-3 border border-gray-300 text-left">DIN</th>
                  <th className="p-3 border border-gray-300 text-left">
                    Designation
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    Appointment Date
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    Disqualified
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    DIN Deactivated
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {DirectorMasterSummary?.CurrentDirectorMasterSummary?.Director
                  ?.length > 0 ? (
                  DirectorMasterSummary.CurrentDirectorMasterSummary.Director.map(
                    (director, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="p-3 border border-gray-300">
                          {director.DirectorName}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {director.DirectorDIN}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {director.Designation}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {director.AppointmentDate}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {director.DisqualifiedUnderSection164_2}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {director.DINDeactivated}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-3 text-center border border-gray-300"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {
        <div className="bg-white text-xs p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Legal Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 border border-gray-300">Court Type</th>
                  <th className="p-3 border border-gray-300">Case Type</th>
                  <th className="p-3 border border-gray-300">Open Cases</th>
                  <th className="p-3 border border-gray-300">Disposed Cases</th>
                  <th className="p-3 border border-gray-300">Unknown Cases</th>
                </tr>
              </thead>
              <tbody>
                {LegalSummary?.length > 0 ? (
                  LegalSummary.map((court, courtIndex) => (
                    <React.Fragment key={courtIndex}>
                      {court?.CaseSummary?.map((caseItem, caseIndex) => (
                        <tr
                          key={`${courtIndex}-${caseIndex}`}
                          className={
                            caseIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }
                        >
                          {caseIndex === 0 && (
                            <td
                              rowSpan={court?.CaseSummary?.length}
                              className="p-3 border border-gray-300 font-semibold text-gray-700"
                            >
                              {court?.CourtType}
                            </td>
                          )}
                          <td className="p-3 border border-gray-300">
                            {caseItem?.CaseType}
                          </td>
                          <td className="p-3 border border-gray-300">
                            {caseItem?.CaseSummary?.OpenCases ?? 0}
                          </td>
                          <td className="p-3 border border-gray-300">
                            {caseItem?.CaseSummary?.DisposedCases ?? 0}
                          </td>
                          <td className="p-3 border border-gray-300">
                            {caseItem?.CaseSummary?.UnknownCases ?? 0}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-3 text-center border border-gray-300"
                    >
                      No legal cases available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      }

      {LegalDetails?.length > 0 && (
        <div className="max-w-7xl mx-auto p-6 bg-white ">
          <h2 className="text-xl font-bold text-blue-950 mb-4">
            Legal Details
          </h2>

          <div className="overflow-x-auto text-xs">
            <table className="w-full border border-gray-300">
              {/* Table Header */}
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Case No
                  </th>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Court
                  </th>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Petitioner
                  </th>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Respondent
                  </th>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Case Type
                  </th>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Order Link
                  </th>
                  <th className="p-3 border border-gray-300 text-left font-bold">
                    Year
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {LegalDetails.map((caseGroup, groupIndex) =>
                  caseGroup.CaseDetails?.length > 0 ? (
                    caseGroup.CaseDetails.map((caseItem, caseIndex) => (
                      <tr
                        key={`${groupIndex}-${caseIndex}`}
                        className={
                          caseIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }
                      >
                        <td className="p-3 border border-gray-300 text-blue-500">
                          {caseItem.CaseNo}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {caseItem.Court}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {caseItem.Petitioner}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {caseItem.Respondent}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {caseItem.CaseType}
                        </td>
                        <td className="p-3 border border-gray-300">
                          <a
                            href={caseItem.OrderLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 "
                          >
                            CaseReport{" "}
                          </a>
                        </td>
                        <td className="p-3 border border-gray-300">
                          {caseItem.Year}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={groupIndex}>
                      <td
                        colSpan="8"
                        className="p-3 text-center border border-gray-300"
                      >
                        No cases found
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewLegalDoc;
