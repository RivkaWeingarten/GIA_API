export const REPORT_QUERY = `
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
`;