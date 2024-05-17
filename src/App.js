import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { REPORT_QUERY } from './queries';
import axios from 'axios';

function App() {
  const [reportNumber, setReportNumber] = useState('');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setReportNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/graphql', {
        query: REPORT_QUERY
          
        ,
        variables: { ReportNumber: reportNumber }
      });

      // Extracting the relevant data from the response
      const responseData = response.data.data;
      setReportData(responseData.report1); // Set the report1 data to state
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <input type="text" value={reportNumber} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
            {error && <p>Error: {error.message}</p>}
          </div>
        </div>
     
        {reportData && (
          <div>
            <h2>Report Data</h2>
            {reportData.links.pdf ? (
              <a href={reportData?.links?.pdf} target="_blank" rel="noopener noreferrer" download>View PDF </a>
            ) : (
              <div>
              <p> PDF is not available. </p>
              </div>
            )}
            <br></br>

{reportData.links.ideal_report_pdf ? (

              <a href={reportData?.links?.ideal_report_pdf}target="_blank" rel="noopener noreferrer" download> VIEW AGS </a>
             
            ) : (
             
              <p>  AGS is not available. </p>
              
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
