import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthContext } from "../../context/AuthContext";
import { ReportLoader } from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import view_icon from "../../assets/view_icon.png";
import refresh_button from "../../assets/refresh-button.png";

const InstaFinancialDetails = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [historyData, setHistoryData] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      cin_number: "",
      insta_api_key: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/financial/detailed/order`,
          {
            cin_number: values.cin_number,
            insta_api_key: values.insta_api_key,
          },
          { withCredentials: true }
        );

        toast.success("Verification successful!");
        setLoading(false);
        setActiveTab("history");
        fetchHistory();
        formik.resetForm();
      } catch (error) {
        setLoading(false);
        toast.error(
          error.response?.data?.message ||
            "Error during verification. Please try again."
        );
      }
    },
  });

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/financial/detailed/history`,
        { withCredentials: true }
      );
      toast.success("History fetched successfully.");
      setHistoryData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch history.");
    }
  };

  const handleStatusCheck = async (companyCIN, orderid, insta_api_key) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/financial/detailed/status`,
        {
          companyCIN,
          orderid,
          insta_api_key,
        },
        { withCredentials: true }
      );
      // console.log(response.data);
      fetchHistory();
      toast.success("Order status updated successfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching order status.");
    }
  };

  const handleDownloadReport = async (cin_number, orderid, orderApiKey) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/financial/detailed/download-report`,
        {
          cin_number,
          orderid,
          insta_api_key: orderApiKey,
        },
        { withCredentials: true }
      );

      if (!response.data.success) {
        toast.error("Error while fetching report");
      } else {
        toast.success("Report fetched successfully");
        navigate("/financial/detailed/view-document-report", {
          state: {
            response: response?.data?.data,
          },
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <ReportLoader />}

      <div className="w-full flex flex-col items-center">
        {/* Tabs */}
        <div className="flex w-full max-w-lg justify-between border-b-2 mb-4">
          <button
            className={`w-1/2 p-3 text-center ${
              activeTab === "form"
                ? "border-b-4 border-[rgb(5,13,45)] font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("form")}
          >
            Input Fields
          </button>
          <button
            className={`w-1/2 p-3 text-center ${
              activeTab === "history"
                ? "border-b-4 border-[rgb(5,13,45)] font-bold"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("history");
              fetchHistory();
            }}
          >
            History
          </button>
        </div>

        {/* Form Tab */}
        {activeTab === "form" && (
          <Card className="w-full max-w-lg px-6 py-8 md:px-10 border-none">
            <CardHeader>
              <CardTitle className="text-center mt-2 tracking-wide text-lg">
                Enter Details Here
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center">
              <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col items-center"
              >
                {/* CIN/PAN Number Input */}
                <div className="w-full text-sm max-w-sm mb-4">
                  <Input
                    id="cin_number"
                    name="cin_number"
                    type="text"
                    placeholder="Enter CIN Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cin_number}
                    className="w-full border rounded-md p-3 px-6 text-start text-base"
                  />
                  {formik.touched.number && formik.errors.number ? (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors.number}
                    </div>
                  ) : null}
                </div>

                {/* Insta API Key Input */}
                <div className="w-full text-sm max-w-sm mb-4">
                  <Input
                    id="insta_api_key"
                    name="insta_api_key"
                    type="text"
                    placeholder="Enter Secure Key"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.insta_api_key}
                    className="w-full border rounded-md p-3 px-6 text-start text-base"
                  />
                  {formik.touched.insta_api_key &&
                  formik.errors.insta_api_key ? (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors.insta_api_key}
                    </div>
                  ) : null}
                </div>

                {/* Type Selection
                <div className="w-full text-sm max-w-sm mb-4">
                  <select
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                    className="w-full border rounded-md p-3 px-6 text-start text-base"
                  >
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                  </select>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors.type}
                    </div>
                  ) : null}
                </div> */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full max-w-sm bg-white-700 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                  style={{ backgroundColor: "#15274F" }}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <Card className="w-full max-w-7xl px-6 py-0 border-none rounded-xl">
            <CardHeader className="flex justify-between items-center  pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">
                📜 Submission History
              </CardTitle>
            </CardHeader>

            <CardContent className="">
              {historyData?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="border-b border-violet-300 text-sm text-gray-700">
                        <th className="p-4 text-left">CIN</th>
                        <th className="p-4 text-left">Order ID</th>
                        <th className="p-4 text-left">Product</th>
                        <th className="p-4 text-left">Order Date</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Remark</th>
                        <th className="p-4 text-left">Refresh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.map((company) =>
                        company.Orders && company.Orders.length > 0 ? (
                          company.Orders.map((order) => {
                            const extractedOrderID =
                              order.OrderID.split("-")[0]; // Extract OrderID before '-'
                            return (
                              <tr
                                key={extractedOrderID}
                                className="border-b border-violet-300"
                              >
                                <td className="p-4 font-medium text-blue-600">
                                  {company.CompanyCIN}
                                </td>
                                <td className="p-4 text-gray-700">
                                  {extractedOrderID}
                                </td>
                                <td className="p-4 font-semibold text-indigo-700">
                                  {order.Product}
                                </td>
                                <td className="p-4 text-gray-600">
                                  {new Date(order.OrderedOn).toLocaleString()}
                                </td>
                                <td className="p-4">
                                  <span
                                    className={`px-3 py-1 text-xs font-semibold border rounded-lg ${
                                      order.OrderStatus === `Order Completed`
                                        ? "text-green-700 border-green-500"
                                        : order.OrderStatus === "Pending"
                                        ? "text-yellow-700 border-yellow-500"
                                        : "text-red-700 border-red-500"
                                    }`}
                                  >
                                    {order.OrderStatus === "Order Completed"
                                      ? "Success"
                                      : order.OrderStatus === "Order Cancelled"
                                      ? "Order Cancelled"
                                      : "Pending"}
                                  </span>
                                </td>
                                <td className="p-4 text-gray-700">
                                  {order.OrderRemark}
                                </td>
                                <td className="p-4">
                                  {order.OrderStatus === "Order Completed" ? (
                                    <button
                                      onClick={() =>
                                        handleDownloadReport(
                                          company.CompanyCIN,
                                          extractedOrderID,
                                          order.OrderInstaApiKey
                                        )
                                      }
                                      className="p-2  border-gray-400 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                    >
                                      <img
                                        src={view_icon}
                                        className="m-auto  h-[30px]"
                                        alt="download"
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleStatusCheck(
                                          company.CompanyCIN,
                                          extractedOrderID,
                                          order.OrderInstaApiKey
                                        )
                                      }
                                      className="p-2 border-gray-400 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                    >
                                      <img
                                        src={refresh_button}
                                        className="m-auto h-[30px]"
                                        alt="download"
                                      />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr key={company.CompanyCIN}>
                            <td
                              colSpan="7"
                              className="p-4 text-center text-gray-500"
                            >
                              No orders found for CIN: {company.CompanyCIN}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-4">
                  No history available.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default InstaFinancialDetails;
