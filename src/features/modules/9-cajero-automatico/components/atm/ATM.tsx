import btnRightATM from "../../assets/images/btn-right-atm.png";
import btnLeftATM from "../../assets/images/btn-left-atm.png";
import fmmHeader from "../../assets/images/fmm-header.png";
import pressButtonSound from "../../assets/audio/press-button.mp3";
import { Link } from "react-router";
import type { ReactNode } from "react";
import "./ATM.css";

interface ATMConfig {
  title?: string;
  left: {
    number: number;
    label: string;
    href?: string | null;
    onClick?: () => void;
  }[];
  right: {
    number: number;
    label: string;
    href?: string | null;
    onClick?: () => void;
  }[];
  screen?: ReactNode;
}

interface ATMProps {
  config: ATMConfig;
}

const NUM_BUTTONS_PER_COL = 4;

const playSound = () => {
  const audio = new Audio(pressButtonSound);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

export function ATM({ config }: ATMProps) {
  return (
    <div className="atm bg-default">
      <div className="atm__header"></div>

      <div className="atm__main">
        <div className="atm__sidebar atm__sidebar--left">
          <div className="atm__buttons">
            {Array(NUM_BUTTONS_PER_COL)
              .fill(0)
              .map((_, index) => {
                const option = config.left.find(
                  (option) => option.number === index + 1
                );

                if (!option || (!option.href && !option.onClick)) {
                  return (
                    <button
                      key={index}
                      className="atm__button atm__button--disabled"
                    >
                      <img
                        src={btnLeftATM}
                        alt={`Left button ${index + 1}`}
                        className="atm__button-img"
                      />
                    </button>
                  );
                }

                // If onClick is provided, use a button instead of Link
                if (option.onClick) {
                  return (
                    <button
                      key={index}
                      className="atm__button"
                      onClick={() => {
                        playSound();
                        option.onClick?.();
                      }}
                    >
                      <img
                        src={btnLeftATM}
                        alt={`Left button ${index + 1}`}
                        className="atm__button-img"
                      />
                    </button>
                  );
                }

                // Otherwise use Link for navigation
                return (
                  <Link
                    to={option.href!}
                    key={index}
                    className="atm__button"
                    onClick={playSound}
                  >
                    <img
                      src={btnLeftATM}
                      alt={`Left button ${index + 1}`}
                      className="atm__button-img"
                    />
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="atm__screen">
          <div className="atm__screen-header">
            <img src={fmmHeader} alt="FMM Header" className="atm__logo" />
            {config.title && <h2 className="atm__title">{config.title}</h2>}
          </div>

          {config.screen && (
            <div className="atm__screen-content">{config.screen}</div>
          )}

          <div className="atm__menu">
            <div className="atm__menu-column atm__menu-column--left">
              {Array(NUM_BUTTONS_PER_COL)
                .fill(0)
                .map((_, index) => {
                  const option = config.left.find(
                    (option) => option.number === index + 1
                  );

                  if (!option) {
                    return <div key={index} className="atm__menu-option" />;
                  }

                  return (
                    <div
                      key={index}
                      className={`atm__menu-option ${
                        !option.href && !option.onClick ? "opacity-70" : ""
                      }`}
                    >
                      {option.label}
                    </div>
                  );
                })}
            </div>
            <div className="atm__menu-column atm__menu-column--right">
              {Array(NUM_BUTTONS_PER_COL)
                .fill(0)
                .map((_, index) => {
                  const option = config.right.find(
                    (option) => option?.number === index + 1
                  );

                  if (!option) {
                    return <div key={index} className="atm__menu-option" />;
                  }

                  return (
                    <div
                      key={index}
                      className={`atm__menu-option ${
                        !option.href && !option.onClick ? "opacity-70" : ""
                      }`}
                    >
                      {option.label}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="atm__sidebar atm__sidebar--right">
          <div className="atm__buttons">
            {Array(NUM_BUTTONS_PER_COL)
              .fill(0)
              .map((_, index) => {
                const option = config.right.find(
                  (option) => option.number === index + 1
                );

                if (!option || (!option.href && !option.onClick)) {
                  return (
                    <button
                      key={index}
                      className="atm__button atm__button--disabled"
                    >
                      <img
                        src={btnRightATM}
                        alt={`Right button ${index + 1}`}
                        className="atm__button-img"
                      />
                    </button>
                  );
                }

                // If onClick is provided, use a button instead of Link
                if (option.onClick) {
                  return (
                    <button
                      key={index}
                      className="atm__button"
                      onClick={() => {
                        playSound();
                        option.onClick?.();
                      }}
                    >
                      <img
                        src={btnRightATM}
                        alt={`Right button ${index + 1}`}
                        className="atm__button-img"
                      />
                    </button>
                  );
                }

                // Otherwise use Link for navigation
                return (
                  <Link
                    to={option.href!}
                    key={index}
                    className="atm__button"
                    onClick={playSound}
                  >
                    <img
                      src={btnRightATM}
                      alt={`Right button ${index + 1}`}
                      className="atm__button-img"
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      <div className="atm__footer"></div>
    </div>
  );
}
