import React from "react";
import CalculationResult from "./CalculationResult";
import CalculationsDropdown from "./CalculationsDropdown";

import styles from "./CalculationView.module.scss";

interface ICalculationViewProps {
    getResultText?: (rawResult: number) => string;
}

const CalculationView: React.FC<ICalculationViewProps> = ({ getResultText }) => {
    return (
        <div className={styles.CalculationView}>
            <div className={styles.CalculationResult}>
                <CalculationResult getResultText={getResultText} />
            </div>
            <div className={styles.CalculationsDropdown}>
                <CalculationsDropdown />
            </div>
        </div>
    );
};

export default CalculationView;
