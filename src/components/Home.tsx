import React, { useCallback, useState } from "react";
import { IDateFilter } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";

import DashboardTitle from "../components/DashboardTitle";
import AppDateFilter from "../components/filters/AppDateFilter";
import CalculationView from "./controls/CalculationView";

import { Product, Revenue } from "../ldm/full";
import { useWorkspaceList } from "../contexts/WorkspaceList";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
    const [dateFilter, setDateFilter] = useState<IDateFilter>(undefined);
    const [dateFilterTitle, setDateFilterTitle] = useState<string>(undefined);

    const dateFilterSelected = useCallback((dateFilter: IDateFilter, dateFilterTitle: string): void => {
        setDateFilter(dateFilter);
        setDateFilterTitle(dateFilterTitle);
    }, []);

    const { firstWorkspace: workspaceId } = useWorkspaceList();

    const getRevenueText = (rawResult: number): string => {
        if (typeof rawResult === "number") {
            return `\$ ${rawResult}`;
        }
        return rawResult;
    };

    return (
        <div>
            <div className={styles.DashboardTitle}>
                <DashboardTitle title={dateFilterTitle} />
            </div>
            <div className={styles.DateFilter}>
                <AppDateFilter onDateFilterSelected={dateFilterSelected} />
            </div>
            {workspaceId && (
                <div className={styles.ChartCalculation}>
                    <div className={styles.Chart}>
                        <LineChart
                            workspace={workspaceId}
                            measures={[Revenue]}
                            trendBy={Product.Default}
                            filters={dateFilter ? [dateFilter] : []}
                        />
                    </div>
                    <div className={styles.Calculation}>
                        <CalculationView getResultText={getRevenueText} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
