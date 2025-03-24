import { useLocation } from "react-router-dom";
import React from "react";
import Chart from "react-apexcharts";

const ViewSummaryDoc = () => {
  const location = useLocation();
  const { response } = location.state || {};
  const {
    CompanyMasterSummary,
    DirectorSignatoryMasterSummary,
    FinancialsSummary,
    CreditRatingDetail,
    ChargesMasterSummary,
    EmployeeAndEstablishmentSummary,
  } = response?.InstaSummary || {};
  if (!response?.InstaSummary) {
    return <p className="text-center text-gray-500 mt-4">No data available.</p>;
  }
  const creditRatings = CreditRatingDetail?.CreditRating || []; // Ensure it's always an array

  const today = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(today.getFullYear() - 1);

  const recentRatings = [];
  const olderRatings = [];

  // Ensure creditRatings is an array before looping
  creditRatings.forEach((rating) => {
    if (!rating.RatingAssignedDate || rating.RatingAssignedDate === "null")
      return;

    const dateParts = rating.RatingAssignedDate.split("-");
    const ratingDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // Format: DD-MM-YYYY

    if (ratingDate >= twelveMonthsAgo) {
      recentRatings.push(rating);
    } else {
      olderRatings.push(rating);
    }
  });
  const financialData = FinancialsSummary?.FinancialsYearWise;

  const IncomeExpenseChart = () => {
    const incomeExpenseOptions = {
      chart: { type: "bar", height: 350 },
      title: { text: "Total Income vs Expenditure" },
      xaxis: { categories: financialData.map((d) => `FY ${d.FinancialYear}`) },
      yaxis: { title: { text: "Amount in Lakhs" } },
      legend: { position: "top" },
      colors: ["#0000FF", "#228B22"],
      dataLabels: { enabled: false },
    };

    const incomeExpenseSeries = [
      {
        name: "Total Income",
        data: financialData.map((d) => d.TotalIncome / 1e5),
      },
      {
        name: "Total Expenditure",
        data: financialData.map((d) => d.TotalExpense / 1e5),
      },
    ];

    return (
      <Chart
        options={incomeExpenseOptions}
        series={incomeExpenseSeries}
        type="bar"
        height={350}
      />
    );
  };

  const PBTChart = () => {
    const pbtOptions = {
      chart: { type: "bar", height: 350 },
      title: { text: "PBT, Income Tax & PAT" },
      xaxis: { categories: financialData.map((d) => `FY ${d.FinancialYear}`) },
      yaxis: { title: { text: "Amount in Lakhs" } },
      legend: { position: "top" },
      colors: ["#8B4513", "#FF4500", "#0000FF"],
      dataLabels: { enabled: false },
    };

    const pbtSeries = [
      { name: "PBT", data: financialData.map((d) => d.ProfitBeforeTax / 1e5) },
      { name: "Income Tax", data: financialData.map((d) => d.IncomeTax / 1e5) },
      { name: "PAT", data: financialData.map((d) => d.ProfitAfterTax / 1e5) },
    ];

    return (
      <Chart options={pbtOptions} series={pbtSeries} type="bar" height={350} />
    );
  };

  const employeeData =
    EmployeeAndEstablishmentSummary?.EmployeeTrend?.EmployeeMonthWise || [];

  const EmployeeChart = () => {
    const options = {
      chart: { type: "bar", height: 350 },
      title: { text: "Employees Count", align: "left" },
      xaxis: {
        categories: employeeData.map((d) => d.WagesMonth),
        labels: { rotate: -45 },
      },
      yaxis: { title: { text: "No. of Employees" } },
      legend: { show: false },
      colors: ["#4169E1"], // Royal Blue for bars
      dataLabels: { enabled: false },
    };

    const series = [
      {
        name: "Employees",
        data: employeeData.map((d) => d.EpfEmployeeCountTotal),
      },
    ];

    return <Chart options={options} series={series} type="bar" height={350} />;
  };

  const EPFChart = () => {
    const options = {
      chart: { type: "line", height: 350 },
      title: { text: "EPF Amount Paid", align: "left" },
      xaxis: {
        categories: employeeData.map((d) => d.WagesMonth),
        labels: { rotate: -45 },
      },
      yaxis: { title: { text: "Amount in Lakhs" } },
      legend: { show: false },
      colors: ["#228B22"], // Green for line
      stroke: { curve: "smooth", width: 2 },
      dataLabels: { enabled: false },
    };

    const series = [
      {
        name: "Amount",
        data: employeeData.map((d) => d.EpfEmployeeCountTotal / 1e5),
      },
    ];

    return <Chart options={options} series={series} type="line" height={350} />;
  };
  return (
    <div className="md:max-w-[77rem] max-w-4xl mx-auto mt-6 bg-white rounded-lg p-4">
      <h2 className="md:text-2xl text-xl font-semibold text-center mb-10">
        📄 InstaSummary Report
      </h2>
      {CompanyMasterSummary && (
        <>
          {/* 1.1 Company Basic Information */}
          <div className="my-4">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">
              Company Basic Information
            </h3>
            <table className="w-full border border-gray-300">
              <tbody>
                {[
                  ["Company Name", CompanyMasterSummary.CompanyName],
                  ["CIN", CompanyMasterSummary.CompanyCIN],
                  [
                    "Date of Incorporation",
                    CompanyMasterSummary.CompanyDateOfInc,
                  ],
                  ["ROC City", CompanyMasterSummary.CompanyRocCity],
                  [
                    "Registration Number",
                    CompanyMasterSummary.CompanyRegNumber,
                  ],
                  ["Company Category", CompanyMasterSummary.CompanyCategory],
                  [
                    "Company Sub-Category",
                    CompanyMasterSummary.CompanySubCategory,
                  ],
                  ["Company Class", CompanyMasterSummary.CompanyClass],
                  [
                    "Authorized Capital",
                    `₹${(CompanyMasterSummary.CompanyAuthCapital / 1e7).toFixed(
                      2
                    )} Cr`,
                  ],
                  [
                    "Paid-Up Capital",
                    `₹${(
                      CompanyMasterSummary.CompanyPaidUpCapital / 1e7
                    ).toFixed(2)} Cr`,
                  ],
                  ["Company Status", CompanyMasterSummary.CompanyMcaStatus],
                  ["Last AGM Date", CompanyMasterSummary.CompanyLastAgmDate],
                  [
                    "Last Balance Sheet Date",
                    CompanyMasterSummary.CompanyLastBsDate,
                  ],
                  ["Email ID", CompanyMasterSummary.CompanyEmail],
                  ["Website", CompanyMasterSummary.CompanyWebSite || "NA"],
                  ["Industry", CompanyMasterSummary.CompanyMcaIndustry],
                  ["Company Address", CompanyMasterSummary.CompanyFullAddress],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {label}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {value || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 1.2 Company KYC Information */}
          <div className="my-4">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">
              Company KYC Information
            </h3>
            <table className="w-full border border-gray-300">
              <tbody>
                {[
                  ["State", CompanyMasterSummary.CompanyRegState],
                  ["City", CompanyMasterSummary.CompanyRegCity],
                  ["PAN", CompanyMasterSummary.CompanyPan],

                  ["Pincode", CompanyMasterSummary.CompanyRegPinCode],
                  [
                    "Industry Division",
                    CompanyMasterSummary.CompanyMcaIndustryDivision,
                  ],
                  [
                    "Industry Group",
                    CompanyMasterSummary.CompanyMcaIndustryGroup,
                  ],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {label}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {value || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {FinancialsSummary && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl mb-4 font-semibold text-blue-950">
            Financial Summary
          </h2>
          <div className="w-full">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 font-bold">
                    Category
                  </th>
                  {FinancialsSummary.FinancialsYearWise.map((yearData) => (
                    <th
                      key={yearData.FinancialYear}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {yearData.FinancialYear}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "PaidUpCapital", label: "Paid-Up Capital" },
                  { key: "NetWorth", label: "Net Worth" },
                  { key: "TotalIncome", label: "Total Income" },
                  { key: "TotalExpense", label: "Total Expense" },
                  { key: "ProfitBeforeTax", label: "Profit Before Tax" },
                  { key: "IncomeTax", label: "Income Tax" },
                  { key: "ProfitAfterTax", label: "Profit After Tax" },
                ].map((item, index) => (
                  <tr
                    key={item.key}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {item.label}
                    </td>
                    {FinancialsSummary.FinancialsYearWise.map((yearData) => (
                      <td
                        key={`${item.key}-${yearData.FinancialYear}`}
                        className="border border-gray-300 p-2 text-right"
                      >
                        {yearData[item.key]
                          ? parseFloat(yearData[item.key]).toLocaleString(
                              "en-IN"
                            )
                          : "N/A"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="w-1/2">{<IncomeExpenseChart />}</div>
        <div className="w-1/2">{<PBTChart />}</div>
      </div>

      {CreditRatingDetail && (
        <div className="my-4">
          <h3 className="text-xl font-bold text-blue-950">
            Credit Ratings & Defaults
          </h3>

          {/* Section: Recent Ratings (Last 12 Months) */}
          <div className="overflow-x-auto my-4 border border-gray-300">
            <h3 className="bg-gray-200 p-2 text-lg font-semibold text-blue-950">
              Ratings - Last 12 Months
            </h3>
            {recentRatings.length === 0 ? (
              <p className="p-4 font-semibold text-gray-600">
                Credit Rating Details are not available.
              </p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Agency</th>
                    <th className="border border-gray-300 p-2">Rating Date</th>
                    <th className="border border-gray-300 p-2">Type</th>
                    <th className="border border-gray-300 p-2">Instrument</th>
                    <th className="border border-gray-300 p-2">
                      Amount (₹ in Lakhs)
                    </th>
                    <th className="border border-gray-300 p-2">Rating</th>
                    <th className="border border-gray-300 p-2">Last Status</th>
                    <th className="border border-gray-300 p-2">Rational</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRatings.map((rating, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 p-2">
                        {rating.RatingAgency || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingAssignedDate || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingPeriod || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingInstrumentName || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {rating.RatingInstrumentwiseAmount &&
                        rating.RatingInstrumentwiseAmount !== "null"
                          ? `₹${parseFloat(
                              rating.RatingInstrumentwiseAmount
                            ).toLocaleString("en-IN")}`
                          : "Nil"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingAssigned || "--"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingRoundingoff || "--"}
                      </td>
                      <td className="border border-gray-300 p-2 text-blue-600 underline cursor-pointer">
                        {rating.RatingPdfUrl !== "null" ? (
                          <a
                            href={rating.RatingPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click Here
                          </a>
                        ) : (
                          "--"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Section: Older Ratings (More than 12 Months) */}
          <div className="overflow-x-auto my-4 border border-gray-300">
            <h3 className="bg-gray-200 p-2 text-lg font-semibold text-blue-950">
              Ratings - More than 12 Months
            </h3>
            {olderRatings.length === 0 ? (
              <p className="p-4 font-semibold text-gray-600">
                No older credit ratings found.
              </p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Agency</th>
                    <th className="border border-gray-300 p-2">Rating Date</th>
                    <th className="border border-gray-300 p-2">Type</th>
                    <th className="border border-gray-300 p-2">Instrument</th>
                    <th className="border border-gray-300 p-2">
                      Amount (₹ in Lakhs)
                    </th>
                    <th className="border border-gray-300 p-2">Rating</th>
                    <th className="border border-gray-300 p-2">Last Status</th>
                    <th className="border border-gray-300 p-2">Rational</th>
                  </tr>
                </thead>
                <tbody>
                  {olderRatings.map((rating, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 p-2">
                        {rating.RatingAgency || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingAssignedDate || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingPeriod || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingInstrumentName || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {rating.RatingInstrumentwiseAmount &&
                        rating.RatingInstrumentwiseAmount !== "null"
                          ? `₹${parseFloat(
                              rating.RatingInstrumentwiseAmount
                            ).toLocaleString("en-IN")}`
                          : "Nil"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingAssigned || "--"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {rating.RatingRoundingoff || "--"}
                      </td>
                      <td className="border border-gray-300 p-2 text-blue-600 underline cursor-pointer">
                        {rating.RatingPdfUrl !== "null" ? (
                          <a
                            href={rating.RatingPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click Here
                          </a>
                        ) : (
                          "--"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {ChargesMasterSummary && (
        <div className=" bg-white ">
          {/* Section Title */}
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Charges Master Summary
          </h2>
          <p className="text-gray-600 text-sm">
            Last Updated: {ChargesMasterSummary.LastUpdatedDateTime}
          </p>

          {/* Open Charges Table */}
          <section className="mt-6">
            <h3 className="text-lg font-bold  mb-3">Open Charges</h3>
            <div className="overflow-x-auto ">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100 border">
                  <tr className="border">
                    <th className="p-2 text-left">Charge Holder</th>
                    <th className="p-2 text-left">Address</th>
                    <th className="p-2 text-right">Amount (₹)</th>
                    <th className="p-2 text-left">Created On</th>
                    <th className="p-2 text-left">Last Modified</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {ChargesMasterSummary?.OpenChargesMasterSummary?.Charge.map(
                    (charge, index) => (
                      <tr
                        key={charge.ChargeID}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="p-2">{charge.ChargeHolderName}</td>
                        <td className="p-2 text-sm text-gray-600">
                          {charge.ChargeHolderAddress}
                        </td>
                        <td className="p-2 text-right">
                          {Number(charge.ChargeAmount).toLocaleString()}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          {charge.ChargeDateOfCreation}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          {charge.ChargeDateOfLastModification || "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Satisfied Charges Table */}
          <section className="mt-8">
            <h3 className="text-lg font-bold  mb-3">Satisfied Charges</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr className="border-b">
                    <th className="p-2 text-left">Charge Holder</th>
                    <th className="p-2 text-left">Address</th>
                    <th className="p-2 text-right">Amount (₹)</th>
                    <th className="p-2 text-left">Created On</th>
                    <th className="p-2 text-left">Satisfied On</th>
                  </tr>
                </thead>
                <tbody>
                  {ChargesMasterSummary?.SatisfiedChargesMasterSummary?.Charge.map(
                    (charge, index) => (
                      <tr
                        key={charge.ChargeID}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="p-2">{charge.ChargeHolderName}</td>
                        <td className="p-2 text-sm text-gray-600">
                          {charge.ChargeHolderAddress}
                        </td>
                        <td className="p-2 text-right">
                          {Number(charge.ChargeAmount).toLocaleString()}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          {charge.ChargeDateOfCreation}
                        </td>
                        <td className="p-2 text-sm text-gray-700 font-semibold">
                          {charge.ChargeDateOfSatisfaction || "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {EmployeeAndEstablishmentSummary && (
        <div className=" my-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Establishments & Employees
          </h2>

          {/* Establishment Table */}
          <h3 className="text-lg font-semibold mt-4 text-gray-700">
            1. Establishment
          </h3>
          <div className="bg-white overflow-x-auto mt-2">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border text-start">Unit Name</th>
                  <th className="p-2 border">City</th>
                  <th className="p-2 border">Establishment Code</th>
                </tr>
              </thead>
              <tbody>
                {EmployeeAndEstablishmentSummary?.EstablishmentMaster?.Establishment?.map(
                  (establishment, index) => (
                    <tr key={index} className="text-center bg-white">
                      <td className="p-2 border text-start">
                        {establishment.EstablishmentName}
                      </td>
                      <td className="p-2 border">{establishment.EPFCity}</td>
                      <td className="p-2 border">
                        {establishment.EstablishmentCode}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Employees Trend Table */}
          <h3 className="text-lg font-semibold mt-6 text-gray-700">
            2. Employees Trend
          </h3>
          <div className="bg-white mt-2 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">Month Year</th>
                  <th className="p-2 border">No of Employees</th>
                  <th className="p-2 border">EPF Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {EmployeeAndEstablishmentSummary?.EmployeeTrend?.EmployeeMonthWise?.map(
                  (entry, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="p-2 border text-center">
                        {entry.WagesMonth}
                      </td>
                      <td className="p-2 border text-center">
                        {entry.EpfEmployeeCountTotal}
                      </td>
                      <td className="p-2 border text-right">
                        ₹{(entry.EpfAmountPaidTotal / 100000).toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-center mt-4">
        <div className="w-1/2">{<EmployeeChart />}</div>
        <div className="w-1/2">{<EPFChart />}</div>
      </div>
      {DirectorSignatoryMasterSummary?.DirectorCurrentDirectorshipMasterSummary
        ?.Director?.length > 0 && (
        <div className=" bg-white my-4">
          <h2 className="text-xl font-semibold text-blue-950 mb-4">
            Director Current Directorships
          </h2>

          {DirectorSignatoryMasterSummary.DirectorCurrentDirectorshipMasterSummary.Director.map(
            (director, dIndex) => (
              <div key={dIndex} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800">
                  {director.DirectorName} - (DIN: {director.DirectorDin})
                </h3>

                {director?.CompanyOtherDirecorship?.length > 0 ? (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border border-gray-200 text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 border">Current Company Name</th>
                          <th className="p-2 border">CIN</th>
                          <th className="p-2 border">Date of Incorporation</th>
                          <th className="p-2 border">Status</th>
                          <th className="p-2 border">Industry</th>
                          <th className="p-2 border">
                            Last Balance Sheet Date
                          </th>
                          <th className="p-2 border">Paid-Up Capital</th>
                        </tr>
                      </thead>
                      <tbody>
                        {director.CompanyOtherDirecorship.map(
                          (company, cIndex) => (
                            <tr
                              key={cIndex}
                              className={
                                cIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                              }
                            >
                              <td className="p-2 border">
                                {company.CompanyName}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyCin}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyDateOfInc}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyMcaStatus}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyMcaIndustry}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyLastBsDate}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyPaidUpCapital}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-600">No companies found</p>
                )}
              </div>
            )
          )}
        </div>
      )}

      {DirectorSignatoryMasterSummary?.DirectorPastDirectorshipMasterSummary
        ?.Director?.length > 0 && (
        <div className="bg-white ">
          <h2 className="text-xl font-semibold text-blue-950 mb-4">
            Director Past Directorships
          </h2>

          {DirectorSignatoryMasterSummary.DirectorPastDirectorshipMasterSummary.Director.map(
            (director, dIndex) => (
              <div key={dIndex} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800">
                  {director.DirectorName} - (DIN: {director.DirectorDin})
                </h3>

                {director?.CompanyOtherDirecorship?.length > 0 ? (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border border-gray-200 text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 border">Past Company Name</th>
                          <th className="p-2 border">CIN</th>
                          <th className="p-2 border">Date of Incorporation</th>
                          <th className="p-2 border">Status</th>
                          <th className="p-2 border">Industry</th>
                          <th className="p-2 border">
                            Last Balance Sheet Date
                          </th>
                          <th className="p-2 border">Paid-Up Capital</th>
                        </tr>
                      </thead>
                      <tbody>
                        {director.CompanyOtherDirecorship.map(
                          (company, cIndex) => (
                            <tr
                              key={cIndex}
                              className={
                                cIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                              }
                            >
                              <td className="p-2 border">
                                {company.CompanyName}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyCin}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyDateOfInc}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyMcaStatus}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyMcaIndustry}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyLastBsDate}
                              </td>
                              <td className="p-2 border">
                                {company.CompanyPaidUpCapital}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-600">No companies found</p>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ViewSummaryDoc;
