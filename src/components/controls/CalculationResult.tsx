import React from "react";

import styles from "./CalculationResult.module.scss";

interface ICalculationResultProps {
    rawResult?: number;
    getResultText?: (rawResult: number) => string;
}

const CalculationResult: React.FC<ICalculationResultProps> = ({ rawResult, getResultText }) => {
    const resultText = getResultText?.(rawResult) ?? "Cannot be determined";
    return <span className={styles.CalculationResult}>{resultText}</span>;
};

export default CalculationResult;
