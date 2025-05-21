import React, { useState } from "react";
import "./Iot.css"

const Iot = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="h-screen bg-gray-900 bg-gradient-to-r from-gray-900 to-black-800 text-white p-8 overflow-hidden">
      {/* Green Glows */}
      <div className="absolute bottom-5 left-60 w-40 h-56 rounded-full bg-green-700 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-green-500/80 opacity-81 blur-3xl"></div>

      {/* Temperature Section */}
      <div
        style={{
          marginTop: "-1rem",
          marginLeft: "2rem",
          marginRight: "2rem",
          backgroundColor: "rgba(233, 234, 230, 0.17)",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "0.3rem",
                height: "0.5",
                backgroundColor: "#ef4444",
                borderRadius: "9999px",
              }}
            ></div>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              Temperature
            </h2>
          </div>
          <button
            style={{
              backgroundColor: "#FCA103",
              color: "#000000",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              fontWeight: 500,
              marginTop: "-1rem",
              marginRight: "15rem",
            }}
            onClick={() => setShowPopup(true)}
          >
            Safety Warnings
          </button>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              width: "60%",
              height: "1rem",
              backgroundColor: "#D9D9D9",
              borderRadius: "9999px",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(to right, #4621AB, #F21C1C)",
                borderRadius: "9999px",
                width: "50%",
              }}
            ></div>
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginTop: "1rem",
            }}
          >
            32°C
          </div>
          <div
            style={{
              marginTop: "1rem",
              width: "35%",
              height: "50%",
              backgroundColor: "#FCA103",
              color: "#000000",
              padding: "0.25rem 1rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Moderate Temperature: Monitor Conditions Closely
          </div>
        </div>
      </div>

      {/* Gas Levels Section */}
      <div
        style={{
          marginTop: "1rem",
          marginLeft: "2rem",
          marginRight: "2rem",
          backgroundColor: "rgba(233, 234, 230, 0.17)",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2
              style={{
                marginTop: '-6rem',
                color: "#ffffff",
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              Gas Levels
            </h2>
          </div>
          <div>
            <h5
              style={{
                marginTop: '2rem',
                marginLeft: '-75rem',
                color: "#ffffff",
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
            >
              <ul>
                <li>Methane: 1.5 ppm</li>
                <li>CO2: 0.9 ppm</li>
              </ul>
            </h5>
          </div>
        </div>
        <div
          style={{
            marginTop: "2rem",
            width: "30%",
            height: "50%",
            backgroundColor: "#FCA103",
            color: "#000000",
            padding: "0.25rem 1rem",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          Caution: Gas levels rising, monitor closely
        </div>
      </div>

      {/* Sensor Health Section */}
      <div
        style={{
          marginTop: "1rem",
          marginLeft: "2rem",
          marginRight: "2rem",
          backgroundColor: "rgba(233, 234, 230, 0.17)",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div className="sensor-health-header">
            <h1>Sensor Health</h1>
          </div>
          <div className="sensor-health-stats">
            <div className="sensor-stat-row">
              <div className="label">Total Sensors</div>
              <div className="label green">Active</div>
              <div className="label red">Inactive</div>
            </div>
            <div className="sensor-stat-row">
              <div className="value">42</div>
              <div className="value green">39</div>
              <div className="value red">2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "#D4D4D1",
              borderRadius: "10px",
              width: "500px",
              padding: "20px",
              position: "relative",
              color: "#000000",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "10px",
              }}
            >
              Safety Warnings
            </h2>
            <ul style={{ lineHeight: "1.5" }}>
              <li>
              <b style={{ color: "darkred" }}>Low Temperature (&lt;20°C):</b> Increased humidity risks slippery surfaces. Ensure proper ventilation.
                slippery surfaces. Ensure proper ventilation.
              </li>
              <br />
              <li>
                <b style={{ color: "darkred" }}>Moderate Temperature (20–35°C):</b> Normal, but monitor
                conditions closely. Prolonged exposure may cause heat stress.
              </li>
              <br />
              <li>
                <b style={{ color: "darkred" }}>High Temperature (&gt;35°C):</b> Risk of spontaneous coal
                combustion. Ensure immediate evacuation and improve ventilation.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Iot;
