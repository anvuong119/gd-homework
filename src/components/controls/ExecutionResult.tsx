import React from "react";

import styles from "./ExecutionResult.module.scss";

interface IExecutionResultProps {
    rawResult?: string;
    executionErrorMsg?: string;
    getResultText?: (rawResult: string) => string;
}

const ExecutionResult: React.FC<IExecutionResultProps> = ({
    rawResult,
    executionErrorMsg,
    getResultText,
}) => {
    return (
        <span className={styles.ExecutionResult}>
            {rawResult ? getResultText?.(rawResult) : executionErrorMsg}
        </span>
    );
};

export default ExecutionResult;
