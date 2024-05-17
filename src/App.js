import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        query: `
          query ReportQuery($ReportNumber: String!) {
            report1: getReport(report_number: $ReportNumber) {
              ...resultFields
              report_number
            }
            quota: getQuota {
              remaining
            }
          }
          fragment resultFields on GradingReport {
            report_date
            report_date_iso
            report_number
            report_type
            report_type_code
            is_digital
            info_message
            results {
              __typename
              ... on IdentificationReportResults {
                weight
                measurements
                shape
                cutting_style
                cutting_style_crown
                cutting_style_pavilion
                transparency
                color
                phenomenon
                item_description
                species
                variety
                geographic_origin
                treatment
                report_comments
              }
              ... on DiamondGradingReportResults {
                shape_and_cutting_style
                measurements
                carat_weight
                color_grade
                color_origin
                color_distribution
                clarity_grade
                cut_grade
                polish
                symmetry
                fluorescence
                country_of_origin
                clarity_characteristics
                key_to_symbols {
                  order
                  characteristic
                  location
                  image
                }
                inscriptions
                report_comments
                proportions {
                  table_pct
                  depth_pct
                  crown_angle
                  crown_height
                  pavilion_angle
                  pavilion_depth
                  star_length
                  lower_half
                  girdle
                  culet
                }
                data {
                  shape {
                    shape_category
                    shape_code
                    shape_group
                    shape_group_code
                  }
                  measurements {
                    ... on FancyMeasurements {
                      length
                      width
                      depth
                    }
                    ... on RoundMeasurements {
                      min_diam
                      max_diam
                      depth
                    }
                  }
                  weight {
                    weight
                    weight_unit
                  }
                  color {
                    color_grade_code
                    color_modifier
                  }
                  clarity
                  cut
                  polish
                  symmetry
                  fluorescence {
                    fluorescence_color
                    fluorescence_intensity
                  }
                  girdle {
                    girdle_condition
                    girdle_pct
                    girdle_size
                  }
                  inscription_graphics {
                    description
                    image
                  }
                }
              }
              ... on LabGrownDiamondGradingReportResults {
                identification
                shape_and_cutting_style
                measurements
                carat_weight
                color_grade
                color_origin
                color_distribution
                clarity_grade
                cut_grade
                polish
                symmetry
                fluorescence
                key_to_symbols {
                  order
                  characteristic
                  image
                  location
                }
                inscriptions
                report_comments
              }
              ... on PearlIdentReportResults {
                report_title
                item_description
                weight
                measurements
                shape
                bodycolor
                overtone
                identification
                environment
                mollusk
                treatment
                report_comments
              }
              ... on NarrativeReportResults {
                report_title
                description
                conclusion
                report_comments
                inscriptions
              }
              ... on MeleeServiceResults {
                packages {
                  service_results_number
                  issue_date
                  melee_shape
                  diameter
                  total_carat_weight
                  color_range
                  number_of_items
                  material_test_results
                  comments
                }
              }
            }
            links {
              pdf
              ideal_report_pdf
              proportions_diagram
              plotting_diagram
              image
              rough_image
              rough_video
              polished_image
              polished_video
            }
          }
        `,
        variables: { ReportNumber: reportNumber }
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Request successful');
        const responseData = response.data;
        setReportData(responseData);
        setError(null);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setReportData(null);
      setError(error.message);
    }
  };
  return (
    <div className="container">
    <div className="row">
      <div className="col-6">
        <h1 className="title">Download Certs</h1>
      </div>
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
        <div className="btn btn-warning btn-lg">
          <button>GO!</button>
        </div>
        {reportData && (
          <div>
            <h2>Report Data</h2>
            {reportData.links.pdf ? (
              <a href={reportData.links.pdf}>View PDF</a>
            ) : (
              <p>PDF is not available.</p>
            )}
          </div>
        )}
        <div className="btn btn-warning btn-lg">
          <button>AGS PDF</button>
        </div>
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
);
}

export default App;
