import { useState } from "react";
import pressButtonSound from "../../assets/audio/press-button.mp3";
import "./KeyPad.css";

interface KeyPadProps {
  onComplete: (pin: string) => void;
  onCancel?: () => void;
  maxLength?: number;
}

const playSound = () => {
  const audio = new Audio(pressButtonSound);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

export function KeyPad({ onComplete, onCancel, maxLength = 4 }: KeyPadProps) {
  const [pin, setPin] = useState("");

  const handleNumberClick = (num: string) => {
    playSound();
    if (pin.length < maxLength) {
      const newPin = pin + num;
      setPin(newPin);
    }
  };

  const handleCancel = () => {
    playSound();
    setPin("");
    if (onCancel) {
      onCancel();
    }
  };

  const handleCorrect = () => {
    playSound();
    setPin(pin.slice(0, -1));
  };

  const handleContinue = () => {
    if (pin.length === maxLength) {
      playSound();
      onComplete(pin);
    }
  };

  return (
    <div className="keypad">
      <div className="keypad__header">
        <p className="keypad__subtitle">Clave genérica: 1234</p>
      </div>

      <div className="keypad__display">
        <div className="keypad__display-content">
          {Array(maxLength)
            .fill(0)
            .map((_, index) => (
              <span key={index} className="keypad__char">
                {index < pin.length ? "X" : ""}
              </span>
            ))}
        </div>
      </div>

      <div className="keypad__container">
        <div className="keypad__grid">
          {/* Row 1 */}
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("1")}
          >
            1
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("2")}
          >
            2
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("3")}
          >
            3
          </button>

          {/* Row 2 */}
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>

          {/* Row 3 */}
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>

          {/* Row 4 */}
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("#")}
          >
            #
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button
            className="keypad__button"
            onClick={() => handleNumberClick("*")}
          >
            *
          </button>
        </div>

        <div className="keypad__actions">
          <button
            className="keypad__action keypad__action--cancel"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="keypad__action keypad__action--correct"
            onClick={handleCorrect}
          >
            Corregir
          </button>
          <button
            className="keypad__action keypad__action--continue"
            onClick={handleContinue}
            disabled={pin.length !== maxLength}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
