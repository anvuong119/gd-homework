import React, { useCallback, useMemo, useState } from "react";
import { DataValue } from "@gooddata/sdk-backend-spi";
import { newMeasureSort } from "@gooddata/sdk-model";
import { DataViewFacade, GoodDataSdkError } from "@gooddata/sdk-ui";
import ExecutionResult from "./ExecutionResult";
import ExecutionsDropdown, { IExecutionInfo } from "./ExecutionsDropdown";

import { Product, Revenue } from "../../ldm/full";

import styles from "./RevenueExecution.module.scss";
import CustomLoading from "../CustomLoading";

const RevenueExecution: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [revenueResult, setRevenueResult] = useState<string>(undefined);
    const [executionErrorMsg, setExecutionErrorMsg] = useState<string>(undefined);
    const getRevenueText = useCallback((revenue: string): string => `$ ${revenue}`, []);

    const onExecutionStatusChanged = (
        result: DataViewFacade,
        error: GoodDataSdkError,
        status: string,
        postExecution: (result: DataViewFacade) => string,
    ): void => {
        if (status === "loading") {
            if (!isLoading) {
                setTimeout(() => setIsLoading(true));
            }
        } else if (isLoading) {
            setTimeout(() => setIsLoading(false));
        }
        if (status === "success") {
            setTimeout(() => {
                setRevenueResult(postExecution(result));
                setExecutionErrorMsg(undefined);
            });
        } else if (status === "error") {
            setTimeout(() => {
                setRevenueResult(undefined);
                setExecutionErrorMsg((error ? error.getMessage() : undefined) || "Unknown error");
            });
        }
    };

    const executionInfos: IExecutionInfo[] = useMemo(
        () => [
            {
                executionId: "executions.revenue.max",
                buildExecutionConfig: () => ({
                    seriesBy: [Revenue],
                    slicesBy: [Product.Default],
                    sortBy: [newMeasureSort(Revenue, "desc")],
                }),
                postExecution: (result: DataViewFacade): string => result.dataView.data[0].toString(),
            },
            {
                executionId: "executions.revenue.min",
                buildExecutionConfig: () => ({
                    seriesBy: [Revenue],
                    slicesBy: [Product.Default],
                    sortBy: [newMeasureSort(Revenue, "asc")],
                }),
                postExecution: (result: DataViewFacade): string => result.dataView.data[0].toString(),
            },
            {
                executionId: "executions.revenue.median",
                buildExecutionConfig: () => ({
                    seriesBy: [Revenue],
                    slicesBy: [Product.Default],
                    sortBy: [newMeasureSort(Revenue)],
                }),
                postExecution: (result: DataViewFacade): string => {
                    let median;
                    const revenues = (result.dataView.data as DataValue[]).map((value: DataValue) =>
                        parseFloat(value.toString()),
                    );
                    const revenuesLength = revenues.length;
                    if (revenuesLength % 2 === 0) {
                        // array with even number elements
                        median = (revenues[revenuesLength / 2] + revenues[revenuesLength / 2 - 1]) / 2;
                    } else {
                        // array with odd number elements
                        median = revenues[(revenuesLength - 1) / 2];
                    }
                    return `${median}`;
                },
            },
        ],
        [],
    );

    return (
        <div className={styles.RevenueExecution}>
            <div className={styles.ExecutionResult}>
                {isLoading ? (
                    <CustomLoading width="30px" />
                ) : (
                    <ExecutionResult
                        rawResult={revenueResult}
                        executionErrorMsg={executionErrorMsg}
                        getResultText={getRevenueText}
                    />
                )}
            </div>
            <div className={styles.ExecutionsDropdown}>
                <ExecutionsDropdown
                    executionInfos={executionInfos}
                    onExecutionStatusChanged={onExecutionStatusChanged}
                />
            </div>
        </div>
    );
};

export default RevenueExecution;
