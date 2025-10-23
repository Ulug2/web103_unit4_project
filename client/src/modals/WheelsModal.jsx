import { useState } from "react";
import "./WheelsModal.css";
import data from "../customization_data/data.js";

export default function useWheelsModal(open) {
  const wheelsData = data.wheelsData;
  const [choice, setChoice] = useState(null);

  const resetChoice = () => setChoice(null);

  if (!open) {
    return {
      WheelsModal: () => null,
      choice,
      resetChoice,
    };
  }

  const format = (n) => `$${Number(n).toLocaleString()}`;

  const WheelsModal = () => (
    <div className="exterior-modal">
      <div className="available-options">
        {wheelsData.map((datum) => {
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
              onClick={() => setChoice(datum)}
              onKeyDown={(e) => e.key === "Enter" && setChoice(datum)}
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

  return { WheelsModal, choice, resetChoice };
}