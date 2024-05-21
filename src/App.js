import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { REPORT_QUERY } from "./queries";
import axios from "axios";

function App() {
  const [reportNumber, setReportNumber] = useState("");
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    setReportNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/graphql", {
        query: REPORT_QUERY,
        variables: { ReportNumber: reportNumber },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Request successful");
        const data = response.data;
        console.log(`data is: ${data}`)

        if (data.errors && data.errors.length > 0) {
          // If there are errors in the response, set the error message
          setErrorMessage(data.errors[0].message);
          setReportData(null);
        } else {
          // If no errors, set the report data and clear any error message
          setReportData(data.data.report1);
          setErrorMessage(null);
        }
        setError(null);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setReportData(null);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="title">Download Certs</h1>

          <div className="col-6 search-cert">
            <div className="card">
              <div className="card-header">Enter GIA Number</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={reportNumber}
                    onChange={handleInputChange}
                    placeholder="Enter GIA Number"
                  />
                  <button type="submit">Submit</button>
                </form>
                {error && <p>Error: {error}</p>}
                {errorMessage && <p>Error: {errorMessage}</p>}
              </div>
            </div>

            {reportData && (
              <div>
                <h2>Report Data</h2>
                {reportData.links.pdf ? (
                  <a
                    href={reportData?.links?.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    View PDF{" "}
                  </a>
                ) : (
                  <div>
                    <p> PDF is not available. </p>
                  </div>
                )}
                <br></br>

                {reportData.links.ideal_report_pdf ? (
                  <a
                    href={reportData?.links?.ideal_report_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {" "}
                    VIEW AGS{" "}
                  </a>
                ) : (
                  <p> AGS is not available. </p>
                )}
              </div>
            )}
          </div>
          {reportData && (
            <div className="details">
              {reportData.results && reportData.results.shape_and_cutting_style}{" "}
              {reportData.results && reportData.results.carat_weight}{" "}
              {reportData.results && reportData.results.color_grade}{" "}
              {reportData.results && reportData.results.clarity_grade}{" "}
              {reportData.results && reportData.results.fluorescence}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
