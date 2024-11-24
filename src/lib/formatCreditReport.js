export const formatCreditReport = (htmlReport) => {
  // Parse the received HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlReport, "text/html");

  // Helper function to extract sections and their content
  const extractSection = (headerText) => {
    const header = Array.from(doc.querySelectorAll("strong")).find((el) =>
      el.textContent.includes(headerText)
    );
    return (
      header?.nextElementSibling?.outerHTML || `<p>No ${headerText} found</p>`
    );
  };

  // Extract necessary sections
  const inquiryPurpose = extractSection("InquiryPurpose");
  const consumerAddress = extractSection("Consumer Address");
  const equifaxScores = extractSection("Equifax Score(s)");
  const retailAccounts = extractSection("Retail Accounts");
  const enquiries = extractSection("Enquiries");

  // Construct cleaned and formatted HTML
  return `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="text-align: center; color: #41d0bc;">Equifax Credit Report</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #41d0bc; color: white;">
            <th style="padding: 10px; text-align: left;">Section</th>
            <th style="padding: 10px; text-align: left;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">Inquiry Purpose</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${inquiryPurpose}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">Consumer Address</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${consumerAddress}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">Equifax Scores</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${equifaxScores}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">Retail Accounts</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${retailAccounts}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">Enquiries</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${enquiries}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

export const handlePrint = (printRef) => {
  if (printRef.current) {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Credit Report</title>
          <style>
            /* General Reset for Print */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #41d0bc;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            tr:nth-child(odd) {
              background-color: #fff;
            }
            /* Hide unwanted elements for print */
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
};
