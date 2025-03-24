import { useLocation } from "react-router-dom";
import React from "react";
const ViewDetailedDoc = () => {
  const ratioCategories = {
    GrowthRatios: ["OperatingRevenueGrowth", "EBDITAGrowth", "EPSGrowth"],
    ProfitabilityRatios: [
      "EBDITAMargin",
      "PATMargin",
      "ReturnOnCapitalEmployed",
      "ReturnOnEquity",
    ],
    WorkingCapitalRatios: [
      "InventoryHoldingDays",
      "DebtorsOutstandingDays",
      "TradePayableDays",
      "CashConversionCycle",
    ],
    LiquidityAndSolvencyRatios: [
      "DebtEquityRatio",
      "InterestCoverage",
      "CurrentRatio",
      "LeverageTOLTNW",
      "AssetTurnoverRatio",
      "InventoryTurnoverRatio",
      "WorkingCapitalTurnover",
    ],
    CashFlowIndicatorRatios: [
      "OperatingCashMargin",
      "FreeCashFlowPercentage",
      "CashGeneratingPower",
      "ShortTermDebtCoverageRatio",
      "CapitalExpenditureCoverageRatio",
    ],
  };

  const ratioLabels = {
    OperatingRevenueGrowth: "Operative Revenue Growth (%)",
    EBDITAGrowth: "EBITDA Growth (%)",
    EPSGrowth: "EPS Growth (%)",
    EBDITAMargin: "EBITDA Margin (%)",
    PATMargin: "PAT Margin (%)",
    ReturnOnCapitalEmployed: "Return on Capital Employed (RoCE) (%)",
    ReturnOnEquity: "Return on Equity (RoE) (%)",
    InventoryHoldingDays: "Avg. Inventory Holding Days",
    DebtorsOutstandingDays: "Avg. Debtors Outstanding Days",
    TradePayableDays: "Avg. Trade Payable Days",
    CashConversionCycle: "Avg. Cash Conversion Cycle",
    DebtEquityRatio: "Net Debt-Equity",
    InterestCoverage: "Interest Coverage",
    CurrentRatio: "Current Ratio",
    LeverageTOLTNW: "Leverage (TOL/TNW)",
    AssetTurnoverRatio: "Asset Turnover",
    InventoryTurnoverRatio: "Inventory Turnover",
    WorkingCapitalTurnover: "Working Capital Turnover",
    OperatingCashMargin: "Operating Cash Margin (OCF/Sales) (%)",
    FreeCashFlowPercentage: "Free Cash Flow/OCF (%)",
    CashGeneratingPower: "Cash Generating Power",
    ShortTermDebtCoverageRatio: "Short-Term Debt Coverage Ratio",
    CapitalExpenditureCoverageRatio: "Capital Expenditure Coverage Ratio",
  };

  const cashFlowMappings = {
    ProfitBeforeExtraordinaryItemsAndTax: "Profit Before Tax",
    AdjustmentsForFinanceCosts: "Finance Costs",
    AdjustmentsForDepreciationAndAmortisationExpense:
      "Depreciation & Amortization",
    AdjustmentsForDividendIncome: "Dividend Income",
    OtherAdjustmentsForWhichCashEffectsAreInvestingOrFinancingCashFlow:
      "Other Cash Adjustments",
    OtherAdjustmentsToReconcileProfitLoss: "Other Adjustments to Profit/Loss",
    TotalAdjustmentsToProfitLoss: "Total Adjustments to Profit/Loss",
    AdjustmentsForDecreaseIncreaseInInventories: "Inventory Adjustments",
    AdjustmentsForDecreaseIncreaseInTradeReceivables:
      "Trade Receivables Adjustments",
    AdjustmentsForIncreaseDecreaseInTradePayables: "Trade Payables Adjustments",
    AdjustmentsForProvisions: "Provisions Adjustments",
    IncomeTaxesPaidRefundClassifiedAsOperatingActivities: "Income Tax Paid",
    NetCashFlowsFromUsedInOperatingActivities: "Net Cash from Operations",
    CashFlowsUsedInObtainingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities:
      "Subsidiary Acquisition",
    ProceedsFromSalesOfTangibleAssetsClassifiedAsInvestingActivities:
      "Asset Sales",
    PurchaseOfTangibleAssetsClassifiedAsInvestingActivities: "Asset Purchases",
    DividendsReceivedClassifiedAsInvestingActivities: "Dividends Received",
    InterestReceivedClassifiedAsInvestingActivities: "Interest Received",
    ProceedsFromGovernmentGrantsClassifiedAsInvestingActivities:
      "Government Grants",
    NetCashFlowsFromUsedInInvestingActivities: "Net Cash from Investing",
    ProceedsFromBorrowingsClassifiedAsFinancingActivities: "Borrowings",
    RepaymentsOfBorrowingsClassifiedAsFinancingActivities:
      "Borrowing Repayments",
    DividendsPaidClassifiedAsFinancingActivities: "Dividends Paid",
    InterestPaidClassifiedAsFinancingActivities: "Interest Paid",
    OtherInflowsOutflowsOfCashClassifiedAsFinancingActivities:
      "Other Financing Cash Flow",
    NetCashFlowsFromUsedInFinancingActivities: "Net Cash from Financing",
    NetIncreaseDecreaseInCashAndCashEquivalentsBeforeEffectOfExchangeRateChanges:
      "Net Cash Before Exchange Rate Effect",
    NetIncreaseDecreaseInCashAndCashEquivalents: "Net Cash Change",
    CashAndCashEquivalentsCashFlowStatement: "Cash Equivalents",
    TotalCashAndCashEquivalents: "Total Cash Equivalents",
    OtherAdjustmentsForNoncashItems: "Other Non-Cash Adjustments",
    OtherInflowsOutflowsOfCashClassifiedAsInvestingActivities:
      "Other Investing Cash Flow",
    OtherCashPaymentsToAcquireEquityOrDebtInstrumentsOfOtherEntitiesClassifiedAsInvestingActivities:
      "Equity/Debt Acquisition",
  };

  const loanAdvancesMappings = {
    LongAllLoanAndAdvanceSecured: "Secured Loans (Long Term)",
    LongCapitalAdvancesLoanAndAdvanceUnsecured: "Capital Advances (Unsecured)",
    LongSecurityDepositsLoanAndAdvanceUnsecured:
      "Security Deposits (Unsecured)",
    LongRelatedPartyLoanAndAdvanceUnsecured: "Related Party Loans (Unsecured)",
    LongOtherLoanAndAdvanceUnsecured: "Other Loans (Unsecured)",
    LongRelatedPartyLoanAndAdvanceProvisionUnsecured:
      "Provision for Related Party Loans (Unsecured)",
    LongOtherLoanAndAdvanceProvisionUnsecured:
      "Provision for Other Loans (Unsecured)",
    LongAllLoanAndAdvanceUnsecured: "Total Unsecured Loans",
    LongCapitalAdvancesLoanAndAdvanceDoubtful: "Capital Advances (Doubtful)",
    LongSecurityDepositsLoanAndAdvanceDoubtful: "Security Deposits (Doubtful)",
    LongRelatedPartyLoanAndAdvanceDoubtful: "Related Party Loans (Doubtful)",
    LongOtherLoanAndAdvanceDoubtful: "Other Loans (Doubtful)",
    LongRelatedPartyLoanAndAdvanceProvisionDoubtful:
      "Provision for Related Party Loans (Doubtful)",
    LongOtherLoanAndAdvanceProvisionDoubtful:
      "Provision for Other Loans (Doubtful)",
    LongAllLoanAndAdvanceDoubtful: "Total Doubtful Loans",
    LongTermLoansAndAdvances: "Total Long-Term Loans & Advances",
    ShortLoanAndAdvance: "Short-Term Loans & Advances",
    TotalLoanAndAdvance: "Total Loans & Advances",
  };

  const extractYearsAndCategories = (data) => {
    if (!data) return { years: [], categories: [] };

    const years = Object.keys(data).filter((key) => key.startsWith("FY"));

    // Get unique categories from all years while filtering out null and "NA" values
    const categories = Array.from(
      new Set(
        years.flatMap((year) =>
          Object.entries(data[year] || {})
            .filter(([, value]) => value !== null && value !== "NA")
            .map(([key]) => key)
        )
      )
    );

    return { years, categories };
  };

  const location = useLocation();
  const { response } = location.state || {};

  if (!response) {
    return <p className="text-center text-gray-500 mt-4">No data available.</p>;
  }

  const {
    CompanyMasterSummary,
    OwnershipDetails,
    Borrowings,
    ChargesMasterSummary,
    CreditRatingDetail,
    StatementOfProfitAndLoss,
    BalanceSheet,
    CashFlowStatement,
    RatioAnalysis,
    RevenueFromOperationsSchedule,
    FinanceCost,
    OtherExpenseSchedule,
    ContingentLiabilitiesAndCommitments,
    LoansAndAdvances,
    DebtorsAnalysis,
    EquityShareCapitalReconciliation,
    PreferenceShareCapitalReconciliation,
    DirectorSignatoryMasterSummary,
    EmployeeAndEstablishmentSummary,
    ChargeSearchReport,
  } = response.InstaDetailed || {};

  const { RelatedRartyTransactionDetails } =
    response?.InstaDetailed?.RelatedPartySchedule;

  const { AuditorsDetail } =
    response?.InstaDetailed?.AuditorsDetailReportAndCaro;

  const DisclosuresRelatedToBalanceSheet =
    response?.InstaDetailed["Misc.DisclosuresRelatedToBalanceSheet"];

  const { AuditorsReport } =
    response?.InstaDetailed?.AuditorsDetailReportAndCaro;

  const { AuditorCaro } = response?.InstaDetailed?.AuditorsDetailReportAndCaro;

  // Process Credit Ratings Function
  const processCreditRatings = (ratings) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Filter ratings older than 12 months and group them by year
    return ratings.reduce((grouped, rating) => {
      const ratingDate = new Date(rating.RatingAssignedDate);
      if (ratingDate < oneYearAgo) {
        const year = ratingDate.getFullYear();
        grouped[year] = grouped[year] || [];
        grouped[year].push(rating);
      }
      return grouped;
    }, {});
  };

  // Get Credit Ratings Grouped by Year
  const groupedRatings =
    CreditRatingDetail?.CreditRating &&
    processCreditRatings(CreditRatingDetail.CreditRating);

  // Extract years & categories for each financial dataset
  const { years: profitLossYears, categories: profitLossCategories } =
    extractYearsAndCategories(StatementOfProfitAndLoss);
  const { years: balanceSheetYears, categories: balanceSheetCategories } =
    extractYearsAndCategories(BalanceSheet);
  const { years: cashFlowYears, categories: cashFlowCategories } =
    extractYearsAndCategories(
      CashFlowStatement?.CashFlowStatementIndirectMethod
    );
  const { years, categories } = extractYearsAndCategories(RatioAnalysis);
  if (!OwnershipDetails || Object.keys(OwnershipDetails).length === 0) {
    return <p>No data available</p>;
  }

  // Use a unique variable name for OwnershipDetails' years
  const ownershipYears = Object.keys(OwnershipDetails).filter((year) =>
    year.startsWith("FY")
  );

  // Extract unique shareholder names from all years
  const allShareholders = new Set();
  ownershipYears.forEach((year) => {
    OwnershipDetails[year]?.Shareholder?.forEach((shareholder) => {
      allShareholders.add(shareholder.ShareholderName);
    });
  });

  const shareholderNames = Array.from(allShareholders);
  return (
    <div className="md:max-w-[77rem] max-w-4xl mx-auto mt-6 bg-white rounded-lg p-4">
      <h2 className="md:text-2xl text-xl font-semibold text-center mb-10">
        📄 InstaDetailed Report
      </h2>

      {CompanyMasterSummary && (
        <div className=" bg-white ">
          {/* 1.1 Basic Information */}
          <div className="my-4">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">
              Company Basic Information
            </h3>
            <table className="w-full border border-gray-300 ">
              <tbody>
                {[
                  ["Company Name", CompanyMasterSummary?.CompanyName],
                  ["CIN", CompanyMasterSummary?.CompanyCin],
                  [
                    "Date of Incorporation",
                    CompanyMasterSummary?.CompanyDateOfInc,
                  ],
                  ["ROC City", CompanyMasterSummary?.CompanyRocCity],
                  [
                    "Registration Number",
                    CompanyMasterSummary?.CompanyRegNumber,
                  ],
                  ["Company Category", CompanyMasterSummary?.CompanyCategory],
                  [
                    "Company Sub-Category",
                    CompanyMasterSummary?.CompanySubCategory,
                  ],
                  ["Company Class", CompanyMasterSummary?.CompanyClass],
                  [
                    "Authorized Capital",
                    `₹${(
                      CompanyMasterSummary?.CompanyAuthCapital / 1e7
                    ).toFixed(2)} Cr`,
                  ],
                  [
                    "Paid-Up Capital",
                    `₹${(
                      CompanyMasterSummary?.CompanyPaidUpCapital / 1e7
                    ).toFixed(2)} Cr`,
                  ],
                  ["Company Status", CompanyMasterSummary?.CompanyMcaStatus],
                  ["Last AGM Date", CompanyMasterSummary?.CompanyLastAgmDate],
                  [
                    "Last Balance Sheet Date",
                    CompanyMasterSummary?.CompanyLastBsDate,
                  ],
                  ["Email ID", CompanyMasterSummary?.CompanyEmail],
                  ["Website", CompanyMasterSummary?.CompanyWebSite || "NA"],
                  ["Industry", CompanyMasterSummary?.CompanyMcaIndustry],
                  ["Full Address", CompanyMasterSummary?.CompanyFullAddress],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {label}
                    </td>
                    <td className="border border-gray-300 p-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 1.2 KYC Information */}
          <div className="my-4">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">
              Company KYC Information
            </h3>
            <table className="w-full border border-gray-300">
              <tbody>
                {[
                  ["State", CompanyMasterSummary?.CompanyRegState],
                  ["City", CompanyMasterSummary?.CompanyRegCity],
                  ["Pincode", CompanyMasterSummary?.CompanyRegPinCode],
                  [
                    "Industry Division",
                    CompanyMasterSummary?.CompanyMcaIndustryDivision,
                  ],
                  [
                    "Industry Group",
                    CompanyMasterSummary?.CompanyMcaIndustryGroup,
                  ],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {label}
                    </td>
                    <td className="border border-gray-300 p-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Ownership Details Table */}
      {OwnershipDetails && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            Ownership Details
          </h2>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 font-bold">
                <th className="border border-gray-300 p-2 text-left font-bold">
                  Shareholder Name
                </th>
                {ownershipYears.map((year) => (
                  <th
                    key={year}
                    className="border border-gray-300 p-2 text-right font-bold"
                  >
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shareholderNames.map((name, rowIndex) => (
                <tr
                  key={name}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2 font-semibold">
                    {name}
                  </td>
                  {ownershipYears.map((year) => {
                    const shareholder = OwnershipDetails[
                      year
                    ]?.Shareholder?.find((s) => s.ShareholderName === name);

                    return (
                      <td
                        key={year}
                        className="border border-gray-300 p-2 text-end"
                      >
                        {shareholder ? (
                          <div className="text-sm">
                            {shareholder.ShareholdingPercentage}%
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Borrowings Table */}
      {Borrowings && (
        <div className="overflow-x-auto my-4 ">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            Borrowings
          </h2>
          <table className="w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="border font-bold border-gray-300 p-2 text-left">
                  Category
                </th>
                {Object.keys(Borrowings)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 font-bold text-end"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                new Set(
                  Object.keys(Borrowings)
                    .filter((key) => key.startsWith("FY"))
                    .flatMap((year) => Object.keys(Borrowings[year] || {}))
                )
              ).map((category, index) => {
                // Check if at least one year has a valid value for this category
                const hasValidData = Object.keys(Borrowings)
                  .filter((key) => key.startsWith("FY"))
                  .some(
                    (year) =>
                      Borrowings[year]?.[category] &&
                      Borrowings[year][category] !== "0.00"
                  );

                return hasValidData ? (
                  <tr
                    key={category}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {category
                        .replace(/([A-Z])/g, " $1") // Add spaces between capital letters
                        .replace(/\bOf\b/g, "of") // Keep "of" in lowercase for better readability
                        .trim()}
                    </td>
                    {Object.keys(Borrowings)
                      .filter((key) => key.startsWith("FY"))
                      .map((year) => (
                        <td
                          key={`${category}-${year}`}
                          className="border border-gray-300 p-2 text-right"
                        >
                          {Borrowings[year]?.[category] &&
                          Borrowings[year][category] !== "0.00"
                            ? Borrowings[year][category]
                            : "-"}
                        </td>
                      ))}
                  </tr>
                ) : null; // Skip row if no valid data exists
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Charges Master Summary Table */}
      {ChargesMasterSummary?.OpenChargesMasterSummary?.Charge && (
        <div className="my-4">
          <h3 className="text-xl font-semibold mb-4 text-blue-950">
            Company Charges
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 ">
              <thead>
                <tr className="bg-gray-200 text-end">
                  <th className="border border-gray-300 p-2 text-start font-bold min-w-fit">
                    Charge Holder
                  </th>
                  <th className="border border-gray-300 p-2 text-start font-bold">
                    Address
                  </th>
                  <th className="border border-gray-300 p-2 font-bold min-w-[8rem]">
                    Charge ID
                  </th>
                  <th className="border border-gray-300 p-2 font-bold min-w-fit">
                    Amount (INR)
                  </th>
                  <th className="border border-gray-300 p-2 font-bold min-w-[8rem]">
                    Creation Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {ChargesMasterSummary.OpenChargesMasterSummary.Charge.map(
                  (charge, index) => (
                    <tr key={index} className="border border-gray-300 text-end">
                      <td className="p-2 text-left">
                        {charge.ChargeHolderName || "N/A"}
                      </td>
                      <td className="p-2 text-start">
                        {charge.ChargeHolderAddress || "N/A"}
                      </td>
                      <td className="p-2">{charge.ChargeID || "N/A"}</td>
                      <td className="p-2">{charge.ChargeAmount || "N/A"}</td>
                      <td className="p-2">
                        {charge.ChargeDateOfCreation || "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Credit Rating Table */}
      {groupedRatings && Object.keys(groupedRatings).length > 0 && (
        <div className="my-4">
          <h3 className="text-xl font-semibold  text-blue-950 mb-4">
            Credit Ratings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 ">
              <thead>
                <tr className="bg-gray-300 font-bold">
                  <th className="border border-gray-300 p-2 font-bold text-start">
                    Year
                  </th>
                  <th className="border border-gray-300 p-2 font-bold text-start">
                    Agency
                  </th>
                  <th className="border border-gray-300 p-2 font-bold text-start">
                    Assigned
                  </th>
                  <th className="border border-gray-300 p-2 font-bold text-start">
                    Instrument
                  </th>
                  <th className="border border-gray-300 p-2 font-bold text-start">
                    Amount
                  </th>
                  <th className="border border-gray-300 p-2 font-bold text-start">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedRatings).map(([year, ratings], idx) => (
                  <tr
                    key={year}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="p-2 font-semibold">{year}</td>
                    <td className="p-2">
                      {ratings.map((rating, index) => (
                        <div key={index}>{rating.RatingAgency || "N/A"}</div>
                      ))}
                    </td>
                    <td className="p-2">
                      {ratings.map((rating, index) => (
                        <div key={index}>{rating.RatingAssigned || "N/A"}</div>
                      ))}
                    </td>
                    <td className="p-2">
                      {ratings.map((rating, index) => (
                        <div key={index}>
                          {rating.RatingInstrumentName || "N/A"}
                        </div>
                      ))}
                    </td>
                    <td className="p-2">
                      {ratings.map((rating, index) => (
                        <div key={index}>
                          {rating.RatingInstrumentWiseAmount || "N/A"}
                        </div>
                      ))}
                    </td>
                    <td className="p-2">
                      {ratings.map((rating, index) => (
                        <div key={index}>
                          {rating.RatingAssignedDate || "N/A"}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {StatementOfProfitAndLoss && (
        <div className="overflow-x-auto ">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {StatementOfProfitAndLoss.SectionHeader}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left font-bold">
                  Element Name
                </th>
                {profitLossYears.map((year) => (
                  <th
                    key={year}
                    className="border border-gray-300 p-2 text-end font-bold"
                  >
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {profitLossCategories.map((header, index) => (
                <tr
                  key={header}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2">
                    {header.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {profitLossYears.map((year) => (
                    <td
                      key={`${header}-${year}`}
                      className="border border-gray-300 p-2 text-right"
                    >
                      {StatementOfProfitAndLoss[year]?.[header] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {BalanceSheet && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            Balance Sheet
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {balanceSheetYears.map((year) => (
                  <th
                    key={year}
                    className="border border-gray-300 p-2 text-end font-bold"
                  >
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {balanceSheetCategories.map((category, index) => (
                <tr
                  key={category}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2 font-semibold">
                    {category}
                  </td>
                  {balanceSheetYears.map((year) => (
                    <td
                      key={`${category}-${year}`}
                      className="border border-gray-300 p-2 text-right"
                    >
                      {BalanceSheet[year]?.[category] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {CashFlowStatement?.CashFlowStatementIndirectMethod && (
        <div className="overflow-x-auto my-4 w-full">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {CashFlowStatement.CashFlowStatementIndirectMethod.SectionHeader}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {cashFlowYears.map((year) => (
                  <th
                    key={year}
                    className="border border-gray-300 p-2 text-end font-bold"
                  >
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(cashFlowMappings).map(
                ([originalKey, displayKey], index) => (
                  <tr
                    key={originalKey}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 p-2 font-semibold">
                      {displayKey}
                    </td>
                    {cashFlowYears.map((year) => (
                      <td
                        key={`${originalKey}-${year}`}
                        className="border border-gray-300 p-2 text-right"
                      >
                        {CashFlowStatement.CashFlowStatementIndirectMethod[
                          year
                        ]?.[originalKey] ?? "N/A"}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {RatioAnalysis && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {RatioAnalysis.SectionHeader}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left font-bold">
                    Element Name
                  </th>
                  {years.map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year.replace("FY", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(ratioCategories).map(([category, keys]) => (
                  <>
                    {/* Category Header Row */}
                    <tr key={category} className="bg-gray-300 font-semibold">
                      <td colSpan={years.length + 1} className="p-2">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </td>
                    </tr>
                    {/* Category Data Rows */}
                    {keys.map((key, index) => {
                      if (!RatioAnalysis[years[0]]?.[key]) return null; // Skip if no data

                      return (
                        <tr
                          key={key}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="border border-gray-300 p-2 font-semibold">
                            {ratioLabels[key] || key}
                          </td>
                          {years.map((year) => (
                            <td
                              key={`${key}-${year}`}
                              className="border border-gray-300 p-2 text-right"
                            >
                              {RatioAnalysis[year]?.[key] &&
                              RatioAnalysis[year][key] !== "0.00"
                                ? RatioAnalysis[year][key]
                                : "-"}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {RevenueFromOperationsSchedule && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {RevenueFromOperationsSchedule.SectionHeader}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(RevenueFromOperationsSchedule)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[
                "DomesticSalesManufacturedGoods",
                "DomesticSalesTradedGoods",
                "DomesticSalesServices",
                "ExportSalesManufacturedGoods",
                "ExportSalesTradedGoods",
                "ExportSalesServices",
                "OtherOperatingRevenues",
                "RevenueFromOperations",
              ].map((category, index) => (
                <tr
                  key={category}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2 font-semibold">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {Object.keys(RevenueFromOperationsSchedule)
                    .filter((key) => key.startsWith("FY"))
                    .map((year) => (
                      <td
                        key={`${category}-${year}`}
                        className="border border-gray-300 p-2 text-right"
                      >
                        {RevenueFromOperationsSchedule[year]?.[category]
                          ? parseFloat(
                              RevenueFromOperationsSchedule[year][category]
                            ).toLocaleString("en-IN")
                          : "N/A"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {FinanceCost && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl mb-4 font-semibold text-blue-950">
            {FinanceCost.SectionHeader}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(FinanceCost)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[
                "InterestExpense",
                "OtherFinanceRelatedCharges",
                "FinanceCosts",
              ].map((category, index) => (
                <tr
                  key={category}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2 font-semibold">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {Object.keys(FinanceCost)
                    .filter((key) => key.startsWith("FY"))
                    .map((year) => (
                      <td
                        key={`${category}-${year}`}
                        className="border border-gray-300 p-2 text-right"
                      >
                        {FinanceCost[year]?.[category]
                          ? parseFloat(
                              FinanceCost[year][category]
                            ).toLocaleString("en-IN")
                          : "N/A"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {OtherExpenseSchedule && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4">
            {OtherExpenseSchedule.SectionHeader}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(OtherExpenseSchedule)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[
                "ManagerialRemuneration",
                "PaymentsToAuditor",
                "Insurance",
                "PowerAndFuel",
                "OtherMisExpenses",
              ].map((category, index) => (
                <tr
                  key={category}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2 font-semibold">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {Object.keys(OtherExpenseSchedule)
                    .filter((key) => key.startsWith("FY"))
                    .map((year) => (
                      <td
                        key={`${category}-${year}`}
                        className="border border-gray-300 p-2 text-right"
                      >
                        {OtherExpenseSchedule[year]?.[category]
                          ? parseFloat(
                              OtherExpenseSchedule[year][category]
                            ).toLocaleString("en-IN")
                          : "N/A"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {ContingentLiabilitiesAndCommitments && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {ContingentLiabilitiesAndCommitments.SectionHeader}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(ContingentLiabilitiesAndCommitments)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[
                "ClaimsAgainstCompanyNotAcknowledgedAsDebt",
                "Guarantees",
                "OtherMoneyForWhichCompanyIsContingentlyLiable",
                "ContingentLiabilities",
                "EstimatedAmountOfContractsRemainingToBeExecutedOnCapitalAccountAndNotProvidedFor",
                "UncalledLiabilityOnSharesAndOtherInvestmentsPartlyPaid",
                "OtherCommitments",
                "Commitments",
                "ContingentLiabilitiesAndCommitments",
              ].map((category, index) => (
                <tr
                  key={category}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 p-2 font-semibold">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {Object.keys(ContingentLiabilitiesAndCommitments)
                    .filter((key) => key.startsWith("FY"))
                    .map((year) => (
                      <td
                        key={`${category}-${year}`}
                        className="border border-gray-300 p-2 text-right"
                      >
                        {ContingentLiabilitiesAndCommitments[year]?.[category]
                          ? parseFloat(
                              ContingentLiabilitiesAndCommitments[year][
                                category
                              ]
                            ).toLocaleString("en-IN")
                          : "N/A"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {LoansAndAdvances && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4">
            {LoansAndAdvances.SectionHeader || "Loans and Advances"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(LoansAndAdvances)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 font-bold text-end"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(loanAdvancesMappings).map(
                ([originalKey, displayKey], rowIndex) => (
                  <tr
                    key={originalKey}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 p-2">{displayKey}</td>
                    {Object.keys(LoansAndAdvances)
                      .filter((year) => year.startsWith("FY"))
                      .map((year) => {
                        const value =
                          LoansAndAdvances[year]?.[originalKey] || "-";
                        return (
                          <td
                            key={`${originalKey}-${year}`}
                            className="border border-gray-300 p-2 text-right"
                          >
                            {value !== "-"
                              ? parseFloat(value).toLocaleString("en-IN")
                              : "-"}
                          </td>
                        );
                      })}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {DebtorsAnalysis && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {DebtorsAnalysis.SectionHeader || "Debtors Analysis"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(DebtorsAnalysis)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {/* Section Heading */}
              <tr>
                <td
                  colSpan={
                    Object.keys(DebtorsAnalysis).filter((y) =>
                      y.startsWith("FY")
                    ).length + 1
                  }
                  className="bg-gray-300 font-bold p-2 text-left"
                >
                  Trade Receivables
                </td>
              </tr>

              {/* Trade Receivables Data */}
              <tr className="bg-white">
                <td className="border border-gray-300 p-2">
                  Total Trade Receivables
                </td>
                {Object.keys(DebtorsAnalysis)
                  .filter((year) => year.startsWith("FY"))
                  .map((year) => (
                    <td
                      key={`TradeReceivables-${year}`}
                      className="border border-gray-300 p-2 text-right"
                    >
                      {parseFloat(
                        DebtorsAnalysis[year]?.TradeReceivables || 0
                      ).toLocaleString("en-IN")}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {EquityShareCapitalReconciliation && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {EquityShareCapitalReconciliation.SectionHeader ||
              "Equity Share Capital - Reconciliation"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Category
                </th>
                {Object.keys(EquityShareCapitalReconciliation)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {/* Section Heading */}
              <tr>
                <td
                  colSpan={
                    Object.keys(EquityShareCapitalReconciliation).filter((y) =>
                      y.startsWith("FY")
                    ).length + 1
                  }
                  className="bg-gray-300 font-bold p-2 text-left"
                >
                  Equity Share Capital
                </td>
              </tr>

              {/* Dynamically filter rows to remove all-zero values */}
              {[
                {
                  key: "EquityAmountOfBonusAndRightIssueDuringPeriod",
                  label: "Bonus & Right Issue During Period",
                },
                {
                  key: "EquityShareCapitalEnd",
                  label: "Equity Share Capital End",
                },
              ].map(({ key, label }, index) => {
                const rowValues = Object.keys(EquityShareCapitalReconciliation)
                  .filter((year) => year.startsWith("FY"))
                  .map((year) =>
                    parseFloat(
                      EquityShareCapitalReconciliation[year]?.[key] || 0
                    )
                  );

                // Show only if at least one value is non-zero
                if (rowValues.some((val) => val !== 0)) {
                  return (
                    <tr
                      key={key}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 p-2">{label}</td>
                      {Object.keys(EquityShareCapitalReconciliation)
                        .filter((year) => year.startsWith("FY"))
                        .map((year) => (
                          <td
                            key={`${key}-${year}`}
                            className="border border-gray-300 p-2 text-right"
                          >
                            {rowValues[
                              Object.keys(EquityShareCapitalReconciliation)
                                .filter((y) => y.startsWith("FY"))
                                .indexOf(year)
                            ].toLocaleString("en-IN")}
                          </td>
                        ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      )}

      {PreferenceShareCapitalReconciliation &&
        (() => {
          const fiscalYears = Object.keys(
            PreferenceShareCapitalReconciliation
          ).filter((key) => key.startsWith("FY"));

          // Check if there is any valid data (not null & not "0.00")
          const hasValidData = fiscalYears.some((year) =>
            Object.values(
              PreferenceShareCapitalReconciliation[year] || {}
            ).some((val) => val !== null && val !== "0.00")
          );

          return (
            <div className="overflow-x-auto my-4">
              <h2 className="text-xl font-semibold mb-4 text-blue-950">
                {PreferenceShareCapitalReconciliation.SectionHeader ||
                  "Preference Share Capital - Reconciliation"}
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 font-bold">
                      Category
                    </th>
                    {fiscalYears.map((year) => (
                      <th
                        key={year}
                        className="border border-gray-300 p-2 text-end font-bold"
                      >
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Section Heading */}
                  <tr>
                    <td
                      colSpan={fiscalYears.length + 1}
                      className="bg-gray-300 font-bold p-2 text-left"
                    >
                      Preference Share Capital
                    </td>
                  </tr>

                  {hasValidData ? (
                    Object.keys(
                      PreferenceShareCapitalReconciliation.FY2024 || {}
                    )
                      .filter((key) =>
                        fiscalYears.some(
                          (year) =>
                            PreferenceShareCapitalReconciliation[year]?.[
                              key
                            ] !== null &&
                            PreferenceShareCapitalReconciliation[year]?.[
                              key
                            ] !== "0.00"
                        )
                      )
                      .map((key, index) => (
                        <tr
                          key={key}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="border border-gray-300 p-2">
                            {key
                              .replace(/Preference/g, "")
                              .replace(/([A-Z])/g, " $1")}
                          </td>
                          {fiscalYears.map((year) => (
                            <td
                              key={`${key}-${year}`}
                              className="border border-gray-300 p-2 text-right"
                            >
                              {PreferenceShareCapitalReconciliation[year]?.[
                                key
                              ] || "--"}
                            </td>
                          ))}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={fiscalYears.length + 1}
                        className="border border-gray-300 p-4 text-center text-gray-500"
                      >
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          );
        })()}

      {DisclosuresRelatedToBalanceSheet &&
        (() => {
          const balanceSheetData = DisclosuresRelatedToBalanceSheet;
          const fiscalYears = Object.keys(balanceSheetData).filter((key) =>
            key.startsWith("FY")
          );

          // Check if there is any valid data (not null)
          const hasValidData = fiscalYears.some((year) =>
            Object.values(balanceSheetData[year] || {}).some(
              (val) => val !== null && val !== "0.00"
            )
          );

          return (
            <div className="overflow-x-auto my-4">
              <h2 className="text-xl font-bold mb-4 text-blue-950">
                {balanceSheetData.SectionHeader ||
                  "Misc. Disclosures Related to Balance Sheet"}
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 font-bold">
                      Category
                    </th>
                    {fiscalYears.map((year) => (
                      <th
                        key={year}
                        className="border border-gray-300 p-2 text-end font-bold"
                      >
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Section Heading */}
                  <tr>
                    <td
                      colSpan={fiscalYears.length + 1}
                      className="bg-gray-300 font-bold p-2 text-left"
                    >
                      Misc. Disclosures
                    </td>
                  </tr>

                  {hasValidData ? (
                    Object.keys(balanceSheetData.FY2024 || {})
                      .filter((key) =>
                        fiscalYears.some(
                          (year) =>
                            balanceSheetData[year]?.[key] !== null &&
                            balanceSheetData[year]?.[key] !== "0.00"
                        )
                      )
                      .map((key, index) => (
                        <tr
                          key={key}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="border border-gray-300 p-2">
                            {key.replace(/([A-Z])/g, " $1")}
                          </td>
                          {fiscalYears.map((year) => (
                            <td
                              key={`${key}-${year}`}
                              className="border border-gray-300 p-2 text-right"
                            >
                              {balanceSheetData[year]?.[key] || "--"}
                            </td>
                          ))}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={fiscalYears.length + 1}
                        className="border border-gray-300 p-4 text-center text-gray-500"
                      >
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          );
        })()}

      {RelatedRartyTransactionDetails &&
      Object.keys(RelatedRartyTransactionDetails)
        .filter((key) => key.startsWith("FY"))
        .some(
          (year) =>
            RelatedRartyTransactionDetails[year]?.RelatedParty?.length > 0
        ) ? (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {RelatedRartyTransactionDetails.SectionHeader ||
              "Related Party Transaction Details"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 font-bold">
                  Related Party
                </th>
                <th className="border border-gray-300 p-2 font-bold">
                  Country
                </th>
                <th className="border border-gray-300 p-2 font-bold">CIN</th>
                <th className="border border-gray-300 p-2 font-bold">PAN</th>
                <th className="border border-gray-300 p-2 font-bold">
                  Nature of Relationship
                </th>
                <th className="border border-gray-300 p-2 font-bold">
                  Nature of Transactions
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(RelatedRartyTransactionDetails)
                .filter((year) => year.startsWith("FY"))
                .map((year) =>
                  RelatedRartyTransactionDetails[year]?.RelatedParty?.map(
                    (party, index) => (
                      <tr
                        key={`${year}-${index}`}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                      >
                        <td className="border border-gray-300 p-2">
                          {party.NameOfRelatedParty || "--"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {party.CountryOfIncorporationOrResidenceOfRelatedParty ||
                            "--"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {party.RelatedPartyCIN || "--"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {party.RelatedPartyPAN || "--"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {party.DescriptionOfNatureOfRelatedPartyRelationship !==
                          "-1"
                            ? party.DescriptionOfNatureOfRelatedPartyRelationship
                            : "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {party.DescriptionOfNatureOfTransactionsWithRelatedParty ||
                            "--"}
                        </td>
                      </tr>
                    )
                  )
                )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {RelatedRartyTransactionDetails.SectionHeader ||
              "Related Party Transaction Details"}
          </h2>
          <p className="text-center text-gray-500">No Data Available</p>
        </div>
      )}

      {AuditorsDetail &&
      Object.keys(AuditorsDetail)
        .filter((key) => key.startsWith("FY"))
        .some((year) =>
          Object.values(AuditorsDetail[year] || {}).some((val) => val !== null)
        ) ? (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-bold mb-4 text-blue-950">
            {AuditorsDetail.SectionHeader || "Auditors Details"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left font-bold">
                  Category
                </th>
                {Object.keys(AuditorsDetail)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-end font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {/* Section Header */}
              <tr>
                <td
                  colSpan={
                    Object.keys(AuditorsDetail).filter((key) =>
                      key.startsWith("FY")
                    ).length + 1
                  }
                  className="bg-gray-300 font-bold p-2 text-left"
                >
                  Auditors Information
                </td>
              </tr>

              {[
                { key: "AuditFirmName", label: "Audit Firm Name" },
                {
                  key: "FirmRegistrationNumber",
                  label: "Firm Registration No.",
                },
                { key: "AuditorsName", label: "Auditor Name" },
                { key: "AuditorMembershipNumber", label: "Membership No." },
                { key: "AuditorAddress", label: "Auditor Address" },
                { key: "PanOfAuditFirm", label: "PAN of Audit Firm" },
              ].map(({ key, label }, index) => {
                const rowValues = Object.keys(AuditorsDetail)
                  .filter((year) => year.startsWith("FY"))
                  .map((year) =>
                    AuditorsDetail[year]?.[key]
                      ? AuditorsDetail[year][key].split("~~").join(", ")
                      : null
                  );

                // Show only if at least one value is non-null
                if (rowValues.some((val) => val !== null)) {
                  return (
                    <tr
                      key={key}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 p-2">{label}</td>
                      {Object.keys(AuditorsDetail)
                        .filter((year) => year.startsWith("FY"))
                        .map((year, idx) => (
                          <td
                            key={`${key}-${year}`}
                            className="border border-gray-300 p-2 text-left"
                          >
                            {rowValues[idx] || "--"}
                          </td>
                        ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {AuditorsDetail.SectionHeader || "Auditors Details"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">
                  Category
                </th>
                {Object.keys(AuditorsDetail)
                  .filter((key) => key.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-300 p-2 text-center"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {/* Section Header */}
              <tr>
                <td
                  colSpan={
                    Object.keys(AuditorsDetail).filter((key) =>
                      key.startsWith("FY")
                    ).length + 1
                  }
                  className="bg-gray-300 font-bold p-2 text-left"
                >
                  Auditors Information
                </td>
              </tr>
              {/* No Data Row */}
              <tr className="bg-white">
                <td
                  colSpan={
                    Object.keys(AuditorsDetail).filter((key) =>
                      key.startsWith("FY")
                    ).length + 1
                  }
                  className="border border-gray-300 p-2 text-center text-gray-500"
                >
                  No Data Available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {AuditorsReport && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-bold mb-4 text-blue-950">
            Auditors Report
          </h2>
          {Object.keys(AuditorsReport)
            .filter((year) => year.startsWith("FY"))
            .map((year, index) => {
              const report = AuditorsReport[year] || {};
              return (
                <table key={year} className="w-full border-collapse mb-4">
                  {/* Header Row */}
                  <thead>
                    <tr className="bg-gray-300">
                      <th className="border border-gray-400 p-2 text-left w-1/2 font-bold">
                        Element Name
                      </th>
                      <th className="border border-gray-400 p-2 text-left w-1/2 font-bold">
                        Element Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Year of Report Row */}
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 p-2 font-bold">
                        Year of Report
                      </td>
                      <td className="border border-gray-400 p-2 font-bold">
                        {report.YearOfReport || "--"}
                      </td>
                    </tr>

                    {/* Qualified Report Row */}
                    <tr className="bg-white">
                      <td className="border border-gray-400 p-2">
                        Auditors Report has been Qualified
                      </td>
                      <td className="border border-gray-400 p-2">
                        {report.WhetherAuditorsReportHasBeenQualifiedOrReservationOrAdverseRemarkOrDisclaimer ||
                          "--"}
                      </td>
                    </tr>

                    {/* Details of Remark */}
                    {report.DetailsOfSuchRemark && (
                      <tr className="bg-white">
                        <td className="border border-gray-400 p-2">
                          Details of Remark
                        </td>
                        <td className="border border-gray-400 p-2">
                          {report.DetailsOfSuchRemark}
                        </td>
                      </tr>
                    )}

                    {/* Directors Comments */}
                    {report.DirectorsCommentsOnSuchRemark && (
                      <tr className="bg-white">
                        <td className="border border-gray-400 p-2">
                          Director's Comments
                        </td>
                        <td className="border border-gray-400 p-2">
                          {report.DirectorsCommentsOnSuchRemark}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              );
            })}
        </div>
      )}

      {AuditorCaro && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            Auditor CARO
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-400 p-2 text-left font-bold">
                  Element Name
                </th>
                {Object.keys(AuditorCaro)
                  .filter((year) => year.startsWith("FY"))
                  .map((year) => (
                    <th
                      key={year}
                      className="border border-gray-400 p-2 text-left font-bold"
                    >
                      {year}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[
                ...new Set(
                  Object.keys(AuditorCaro)
                    .filter((year) => year.startsWith("FY"))
                    .flatMap((year) => Object.keys(AuditorCaro[year] || {}))
                ),
              ].map((category, index) => {
                const isEmptyRow = Object.keys(AuditorCaro)
                  .filter((year) => year.startsWith("FY"))
                  .every((year) => !AuditorCaro[year]?.[category]);

                if (isEmptyRow) return null; // Skip empty rows

                return (
                  <tr
                    key={category}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-400 p-2">
                      {category.replace(/([A-Z])/g, " $1")}
                    </td>
                    {Object.keys(AuditorCaro)
                      .filter((year) => year.startsWith("FY"))
                      .map((year) => (
                        <td key={year} className="border border-gray-400 p-2">
                          {AuditorCaro[year]?.[category] || "-"}
                        </td>
                      ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {DirectorSignatoryMasterSummary?.DirectorCurrentMasterSummary && (
        <div className="overflow-x-auto mt-4 mb-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {DirectorSignatoryMasterSummary.SectionHeader} || "Director Summary"
          </h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-300">
                <th className="border p-2 font-bold">Name</th>
                <th className="border p-2 font-bold">DIN</th>
                <th className="border p-2 font-bold">Designation</th>
                <th className="border p-2 font-bold">Date of Appointment</th>
                <th className="border p-2 font-bold">Email</th>
                <th className="border p-2 font-bold">Current Directorships</th>
                <th className="border p-2 font-bold">Past Directorships</th>
              </tr>
            </thead>
            <tbody>
              {DirectorSignatoryMasterSummary?.DirectorCurrentMasterSummary.Director.map(
                (director, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border p-2">{director.DirectorName}</td>
                    <td className="border p-2">{director.DirectorDin}</td>
                    <td className="border p-2">
                      {director.DirectorDesignation}
                    </td>
                    <td className="border p-2">
                      {director.DirectorDateOfAppnt}
                    </td>
                    <td className="border p-2">
                      {director.DirectorEmail || "N/A"}
                    </td>
                    <td className="border p-2">
                      {director.DirectorCurrentDirectorshipCount}
                    </td>
                    <td className="border p-2">
                      {director.DirectorPastDirectorshipCount}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {DirectorSignatoryMasterSummary?.DirectorPastMasterSummary && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {DirectorSignatoryMasterSummary.SectionHeader ||
              "Director Past Summary"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-300 ">
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  DIN
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Designation
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Date of Appointment
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Date of Cessation
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Permanent Address
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Capitalization
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Past Directorship Count
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {DirectorSignatoryMasterSummary?.DirectorPastMasterSummary.Director.map(
                (director, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorDin}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorDesignation}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorDateOfAppnt}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorDateOfCessation}
                    </td>
                    {/* <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorDateOfBirth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorEmail}
                    </td> */}
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorPermanentAddress}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorCapitalization}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {director.DirectorPastDirectorshipCount}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {EmployeeAndEstablishmentSummary?.EstablishmentMaster && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {EmployeeAndEstablishmentSummary.SectionHeader ||
              "Employee and Establishment Summary"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-300 ">
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Establishment Name
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Establishment ID
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  City
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Primary Business Activity
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {EmployeeAndEstablishmentSummary?.EstablishmentMaster?.Establishment.map(
                (establishment, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {establishment.EstablishmentName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {establishment.EstablishmentId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {establishment.EstablishmentAddress}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {establishment.EstablishmentCity || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {establishment.EstablishmentPrimaryBusinessActivity ||
                        "N/A"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {EmployeeAndEstablishmentSummary?.EmployeeTrend && (
        <div className="overflow-x-auto my-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            {EmployeeAndEstablishmentSummary.SectionHeader ||
              "Employee and Establishment Summary"}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-300 ">
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Wage Month
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  Total Employees
                </th>
                <th className="border border-gray-300 px-4 py-2 font-bold">
                  EPF Amount Paid (₹)
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {EmployeeAndEstablishmentSummary?.EmployeeTrend.EmployeeMonthWise.map(
                (record, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EpfWageMonth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EpfEmployeeCountTotal}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₹{Number(record.EpfAmountPaidTotal).toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {ChargeSearchReport && (
        <>
          {/* Open Charges Bank-wise */}

          <div className="overflow-x-auto my-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-950">
              Open Charges Bank-wise
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="border border-gray-300 px-4 py-2 font-bold">
                    Bank Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 font-bold">
                    Charge Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ChargeSearchReport?.OpenChargesBankWise.ChargeHolder.map(
                  (charge, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {charge.ChargeHolderName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹
                        {Number(
                          charge.OpenChargeTotalInINRBankWise
                        ).toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {ChargesMasterSummary.OpenChargesMasterSummary && (
        <div className="my-4 bg-gray-100 min-h-screen">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            Company Charge Details
          </h2>

          {ChargesMasterSummary.OpenChargesMasterSummary.Charge.map(
            (charge) => (
              <div
                key={charge.ChargeID}
                className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-gray-300"
              >
                {/* Bank Name & Amount Section */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-blue-600 font-bold">
                      {charge.ChargeHolderName}
                    </h3>
                    <p className="text-lg font-semibold">
                      ₹{(charge.ChargeAmount / 100000).toFixed(2)} Lakhs
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Charge ID: {charge.ChargeID}
                  </p>
                </div>

                {/* Table Layout for Details */}
                <div className="mt-3 border border-gray-300">
                  {/* Row 1 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-gray-100 font-semibold">
                      Creation Date:
                    </div>
                    <div className="w-1/2 p-2 bg-white">
                      {charge.ChargeDateOfCreation}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-white font-semibold">
                      Modified:
                    </div>
                    <div className="w-1/2 p-2 bg-gray-100">
                      {charge.ChargeDateOfLastModification ? "True" : "False"}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-gray-100 font-semibold">
                      Consortium Finance:
                    </div>
                    <div className="w-1/2 p-2 bg-white">
                      {charge.ConsortiumFinance === "yes" ? "Yes" : "No"}
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-white font-semibold">
                      Joint Charge:
                    </div>
                    <div className="w-1/2 p-2 bg-gray-100">
                      {charge.JointCharge === "yes" ? "Yes" : "No"}
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-gray-100 font-semibold">
                      Charge On:
                    </div>
                    <div className="w-1/2 p-2 bg-white">
                      {charge.ChargeOn || "Nil"}
                    </div>
                  </div>

                  {/* Row 6 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-white font-semibold">
                      Interest Rate:
                    </div>
                    <div className="w-1/2 p-2 bg-gray-100">
                      {charge.InterestRate || "N/A"}
                    </div>
                  </div>

                  {/* Row 7 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-gray-100 font-semibold">
                      Repayment Terms:
                    </div>
                    <div className="w-1/2 p-2 bg-white">
                      {charge.RepaymentTerms || "N/A"}
                    </div>
                  </div>

                  {/* Row 8 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-white font-semibold">
                      Extent of Charge:
                    </div>
                    <div className="w-1/2 p-2 bg-gray-100">
                      {charge.ExtentOfCharge || "N/A"}
                    </div>
                  </div>

                  {/* Row 9 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-gray-100 font-semibold">
                      Other Terms:
                    </div>
                    <div className="w-1/2 p-2 bg-white">
                      {charge.OthersTerms || "Nil"}
                    </div>
                  </div>

                  {/* Row 10 */}
                  <div className="flex">
                    <div className="w-1/2 p-2 bg-white font-semibold">
                      Modification History:
                    </div>
                    <div className="w-1/2 p-2 bg-gray-100">
                      {charge.ModificationHistory || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Attachments & Download */}
                <div className="mt-3 text-sm">
                  <p>
                    <span className="font-semibold">
                      Attachment Description:
                    </span>{" "}
                    {charge.AttachmentDescription || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">List of Attachments:</span>{" "}
                    {Array.isArray(charge.AttachmentList) &&
                    charge.AttachmentList.length > 0
                      ? charge.AttachmentList.join(", ")
                      : "N/A"}
                  </p>
                  <p className="text-blue-500 underline cursor-pointer">
                    <a href={`#${charge.DownloadLink}`} download>
                      Download Charge Form
                    </a>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ViewDetailedDoc;
