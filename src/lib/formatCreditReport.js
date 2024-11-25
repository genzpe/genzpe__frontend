// Function to format the HTML content of the credit report
export const formatCreditReport = (htmlReport) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlReport, "text/html");

  // Example: Remove unwanted elements
  doc.querySelectorAll("h1, .remove-this-class").forEach((el) => el.remove());

  // Additional transformations (if needed)
  // Example: Add a custom class to tables
  doc.querySelectorAll("table").forEach((table) => {
    table.classList.add("formatted-table");
  });

  return doc.body.innerHTML;
};

// Function to handle printing of the content
export const handlePrint = (printRef) => {
  if (printRef.current) {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Credit Report</title>
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
