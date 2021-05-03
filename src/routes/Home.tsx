import React, { useState } from "react";
import { IDateFilter } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";

import AppDateFilter from "../components/filters/AppDateFilter";
import { Product, Revenue } from "../ldm/full";
import { useWorkspaceList } from "../contexts/WorkspaceList";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
    const [dateFilter, setDateFilter] = useState<IDateFilter>(undefined);

    const dateFilterSelected = (dateFilter: IDateFilter): void => {
        setDateFilter(dateFilter);
    };

    const { firstWorkspace: workspaceId } = useWorkspaceList();

    return (
        <div>
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
