'use client';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/navigation';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// States to highlight
const stateMembers: Record<string, number> = {
  Texas: 2,
  Oregon: 1,
  California: 2,
  Florida: 2,
  "New York": 1,
  "North Carolina": 1,
  "South Carolina": 1,
  Georgia: 1,
  Illinois: 1,
  Ohio: 1,
  Michigan: 1,
  Minnesota: 1,
  Pennsylvania: 1,
  Virginia: 1,
  Washington: 1,
  Arizona: 1,
  Colorado: 1,
  Massachusetts: 1,
};

// Function to return color by members
const getColor = (count: number) => {
  if (count === 2) return "#3a388e"; // dark highlight
  if (count === 1) return "#908fc7"; // light highlight
  return "#f8f9fa"; // no highlight
};

interface MapChartProps {
  onStateClick?: (stateName: string) => void;
}

export const MapChart = ({ onStateClick }: MapChartProps) => {

  const router = useRouter();

  const handleStateClick = (stateName: string) => {
    if (onStateClick) {
      onStateClick(stateName);
    } else {
      // Default behavior: navigate to find-a-professional with state parameter
      router.push(`/find-a-professional?state=${encodeURIComponent(stateName)}`);
    }
  };


  return (
    <div className="container mt-1">
      <h3 className="card-title fw-bold text-dark text-center">
        We recognize and connect you with award-winning women experts across the U.S.
      </h3>

      {/* Bootstrap Card */}
      {/* <div className="card shadow-lg border-0 rounded-4 map-card blink-hover mt-5"> */}
      <div >
        <div className="card-body">
          <div className="rounded p-2">
            <ComposableMap projection="geoAlbersUsa">
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;
                    const count = stateMembers[stateName] ?? 0;
                    const fillColor = getColor(count);

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: fillColor, outline: "none", cursor: "pointer" },
                          hover: { fill: "#F53", outline: "none", cursor: "pointer" },
                          pressed: { fill: "#E42", outline: "none", cursor: "pointer" },
                        }}
                        data-tooltip-id="state-tooltip"
                        data-tooltip-content={stateName}
                        onClick={() => handleStateClick(stateName)}

                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
          <Tooltip id="state-tooltip" />
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .map-card {
          transition: all 0.3s ease-in-out;
        }
        .map-card:hover {
          animation: blink 1s infinite alternate;
        }
        @keyframes blink {
          from {
            box-shadow: 0 0 10px rgba(58, 56, 142, 0.4);
          }
          to {
            box-shadow: 0 0 25px rgba(58, 56, 142, 0.9);
          }
        }
      `}</style>
    </div>
  );
};
