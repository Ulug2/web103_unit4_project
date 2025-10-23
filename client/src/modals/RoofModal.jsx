import { useState } from "react";
import "./RoofModal.css";
import data from "../customization_data/data.js";

export default function useRoofModal(open, isConvertible) {
  const roofData = data.roofData;
  const [choice, setChoice] = useState(null);

  const resetChoice = () => setChoice(null);

  if (!open) {
    return {
      RoofModal: () => null,
      choice,
      resetChoice,
    };
  }

  const format = (n) => `$${Number(n).toLocaleString()}`;

  const handleRoofSelection = (datum) => {
    // Check if user selected convertible car but non-convertible roof
    if (isConvertible && !datum.convertible) {
      alert("❌ You cannot choose this roof because you set your car to be convertible, but this roof is not convertible.");
      return;
    }
    
    // Check if user selected non-convertible car but convertible roof
    if (!isConvertible && datum.convertible) {
      alert("❌ You cannot choose this roof because you set your car to be non-convertible, but this roof is convertible.");
      return;
    }

    // Valid selection
    setChoice(datum);
  };

  const RoofModal = () => (
    <div className="exterior-modal">
      <div className="available-options">
        {roofData.map((datum) => {
          const isSelected = choice?.id === datum.id;
          const classNames = `option-card ${
            choice ? (isSelected ? "selected" : "unselected") : ""
          }`;

          return (
            <div
              key={datum.id}
              className={classNames}
              role="button"
              tabIndex={0}
              aria-label={`Select ${datum.name}`}
              style={{ backgroundImage: `url(${datum.img})` }}
              onClick={() => handleRoofSelection(datum)}
              onKeyDown={(e) => e.key === "Enter" && handleRoofSelection(datum)}
            >
              <div className="option-overlay">
                <span className="option-name">{datum.name}</span>
                <span className="option-cost">{format(datum.cost)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return { RoofModal, choice, resetChoice };
}