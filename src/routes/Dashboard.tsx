import React, { useState } from "react";
import {
    DateFilter,
    DateFilterHelpers,
    DateFilterOption,
    defaultDateFilterOptions,
} from "@gooddata/sdk-ui-filters";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { DateFilterGranularity } from "@gooddata/sdk-model";

import * as Md from "../md/full";

import CalculationSelector from "./CalculationSelector";
import Page from "../components/Page";

const availableGranularities: DateFilterGranularity[] = ["GDC.time.month"];
interface IDateFilterComponentState {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}

const dateFilterContainerStyle = { width: 200 };
const lineChartContainerStyle = { height: 300, width: "80%" };
const calculationSelectorContainerStyle = { height: 300, margin: "0 0 0 10px", width: "15%" };

export const Dashboard: React.FC = () => {
    const [state, setState] = useState<IDateFilterComponentState>({
        selectedFilterOption: defaultDateFilterOptions.allTime!,
        excludeCurrentPeriod: false,
    });

    const [timeTitle, setTimeTitle] = useState(DateFilterHelpers.getDateFilterRepresentation(state.selectedFilterOption, 'en-US'));

    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        setState({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
        setTimeTitle(DateFilterHelpers.getDateFilterRepresentation(selectedFilterOption, 'en-US'));
    };

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        state.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        state.excludeCurrentPeriod,
    );

    return (
        <Page>
            <h1>My Dashboard {timeTitle}</h1>
            <div style={dateFilterContainerStyle}>
                <DateFilter
                    excludeCurrentPeriod={state.excludeCurrentPeriod}
                    selectedFilterOption={state.selectedFilterOption}
                    filterOptions={defaultDateFilterOptions}
                    availableGranularities={availableGranularities}
                    customFilterName="Selected date range"
                    dateFilterMode="active"
                    onApply={onApply}
                />
            </div>
            <div>
                <div style={lineChartContainerStyle} className="inline">
                    <LineChart
                        measures={[Md.Revenue]}
                        trendBy={Md.DateDatasets.Date.Month.Short}
                        segmentBy={Md.Product.Default}
                        filters={dateFilter ? [dateFilter] : []}
                    />
                </div>
                <div style={calculationSelectorContainerStyle} className="inline">
                    <CalculationSelector filters={dateFilter}/>
                </div>
            </div>
        </Page>
    );
};