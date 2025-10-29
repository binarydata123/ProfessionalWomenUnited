'use client';
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/navigation';
import './style.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// State abbreviations mapping
const stateAbbreviations: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

// Coordinates for state labels (approximate centers)
const stateLabelPositions: Record<string, [number, number]> = {
  California: [-119.5, 37.2],
  Texas: [-99.4, 31.5],
  Florida: [-81.7, 27.8],
  "New York": [-75.5, 42.8],
  Illinois: [-89.0, 40.0],
  Pennsylvania: [-77.6, 40.9],
  Ohio: [-82.8, 40.3],
  Michigan: [-85.4, 44.3],
  Georgia: [-83.5, 32.7],
  "North Carolina": [-79.0, 35.5],
  Virginia: [-78.7, 37.5],
  Washington: [-120.5, 47.4],
  Arizona: [-111.6, 34.2],
  Massachusetts: [-71.8, 42.0],
  Indiana: [-86.3, 39.9],
  Tennessee: [-86.6, 35.8],
  Missouri: [-92.5, 38.4],
  Maryland: [-76.8, 39.0],
  Wisconsin: [-89.6, 44.6],
  Minnesota: [-94.3, 46.3],
  Colorado: [-105.5, 38.9],
  Alabama: [-86.8, 32.8],
  "South Carolina": [-80.9, 33.9],
  Louisiana: [-92.4, 31.1],
  Kentucky: [-85.3, 37.5],
  Oregon: [-120.6, 43.9],
  Oklahoma: [-97.5, 35.5],
  Connecticut: [-72.7, 41.6],
  Iowa: [-93.4, 42.0],
  Mississippi: [-89.7, 32.7],
  Arkansas: [-92.4, 34.9],
  Kansas: [-98.4, 38.5],
  Utah: [-111.7, 39.3],
  Nevada: [-116.9, 39.3],
  "New Mexico": [-106.1, 34.4],
  "West Virginia": [-80.7, 38.6],
  Nebraska: [-99.7, 41.5],
  Idaho: [-114.5, 44.3],
  Maine: [-69.2, 45.4],
  "New Hampshire": [-71.6, 43.7],
  Hawaii: [-157.5, 20.8],
  "Rhode Island": [-71.6, 41.7],
  Montana: [-109.6, 46.9],
  Delaware: [-75.5, 39.0],
  "South Dakota": [-100.2, 44.4],
  "North Dakota": [-100.5, 47.5],
  Alaska: [-152.3, 64.0],
  Vermont: [-72.7, 44.0],
  Wyoming: [-107.5, 43.0],
};

interface MapChartProps {
  onStateClick?: (stateName: string) => void;
}

export const MapChart = ({ onStateClick }: MapChartProps) => {
  const router = useRouter();

  const handleStateClick = (stateName: string) => {
    const stateAbbr = stateAbbreviations[stateName];
    if (stateAbbr) {
      if (onStateClick) {
        onStateClick(stateName);
      } else {
        // Navigate to the us-states page with the state parameter
        router.push(`/us-states?state=${stateAbbr}`);
      }
    }
  };
  // const handleStateClick = (stateName: string) => {
  //   if (stateAbbreviations[stateName]) {
  //     if (onStateClick) {
  //       onStateClick(stateName);
  //     } else {
  //       router.push(`/us-states?state=${encodeURIComponent(stateName)}`);
  //     }
  //   }
  // };



  return (
    <div className="container">
      <h3 className="text-center no-global-h2 responsive-heading">
        We recognize and connect you with <span className="highlight" style={{ color: '#BE8363' }}>award-winning women experts across the U.S.</span>
      </h3>

      <div className="border-0 rounded-4 mt-3">
        <div className="rounded p-2 position-relative">
          <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  const fillColor = "#02142d"; // Your default color

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: fillColor,
                          outline: "none",
                          cursor: "pointer",
                          stroke: "#ddd",
                          strokeWidth: 0.5
                        },
                        hover: {
                          fill: "#c49073",
                          outline: "none",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: "#c49073",
                          outline: "none",
                          cursor: "pointer"
                        },
                      }}
                      data-tooltip-id="state-tooltip"
                      data-tooltip-content={`${stateName} (${stateAbbreviations[stateName]})`}
                      onClick={() => handleStateClick(stateName)}
                    />
                  );
                })
              }
            </Geographies>

            {/* Add state labels */}
            {Object.entries(stateLabelPositions).map(([state, coordinates]) => {
              const textColor = "#fff";

              return (
                <Annotation
                  key={state}
                  subject={coordinates}
                  dx={0}
                  dy={0}
                  connectorProps={{}}
                >
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{
                      fontFamily: "system-ui",
                      fill: textColor,
                      fontSize: state.length > 10 ? "6px" : "7px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleStateClick(state)}
                  >
                    {stateAbbreviations[state]}
                  </text>
                </Annotation>
              );
            })}
          </ComposableMap>
        </div>
        <Tooltip id="state-tooltip" />
      </div>
    </div>
  );
};