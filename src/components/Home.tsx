import React, { useCallback, useState } from "react";
import { IDateFilter } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";

import DashboardTitle from "../components/DashboardTitle";
import AppDateFilter from "../components/filters/AppDateFilter";
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

    return (
        <div>
            <div className={styles.DashboardTitle}>
                <DashboardTitle title={dateFilterTitle} />
            </div>
            <div className={styles.DateFilter}>
                <AppDateFilter onDateFilterSelected={dateFilterSelected} />
            </div>
            {workspaceId && (
                <LineChart
                    workspace={workspaceId}
                    measures={[Revenue]}
                    trendBy={Product.Default}
                    filters={dateFilter ? [dateFilter] : []}
                />
            )}
        </div>
    );
};

export default Home;
