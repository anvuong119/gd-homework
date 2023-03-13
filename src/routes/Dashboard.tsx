import React, { useState } from "react";
import {
    DateFilter,
    DateFilterOption,
    IDateFilterOptionsByType,
} from "@gooddata/sdk-ui-filters";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { DateFilterGranularity } from "@gooddata/sdk-model";

import * as Md from "../md/full";

const availableGranularities: DateFilterGranularity[] = ["GDC.time.month"];

const defaultDateFilterOptions: IDateFilterOptionsByType = {
    allTime: {
        localIdentifier: "ALL_TIME",
        type: "allTime",
        name: "",
        visible: true,
    },
    absoluteForm: {
        localIdentifier: "ABSOLUTE_FORM",
        type: "absoluteForm",
        from: "2017-01-01",
        to: "2017-12-31",
        name: "",
        visible: true,
    },
    absolutePreset: [
        {
            from: "2015-01-01",
            to: "2015-12-31",
            name: "Year 2015",
            localIdentifier: "year2015",
            visible: true,
            type: "absolutePreset",
        },
        {
            from: "2016-01-01",
            to: "2016-12-31",
            name: "Year 2016",
            localIdentifier: "year2016",
            visible: true,
            type: "absolutePreset",
        },
        {
            from: "2017-01-01",
            to: "2017-12-31",
            name: "Year 2017",
            localIdentifier: "year2017",
            visible: true,
            type: "absolutePreset",
        },
    ],
    relativeForm: {
        localIdentifier: "RELATIVE_FORM",
        type: "relativeForm",
        granularity: "GDC.time.year",
        from: -2,
        to: -2,
        name: "",
        visible: true,
    },
    relativePreset: {
        "GDC.time.year": [
            {
                from: -2,
                to: -2,
                granularity: "GDC.time.year",
                localIdentifier: "twoYearsAgo",
                type: "relativePreset",
                visible: true,
                name: "2 years ago",
            },
            {
                from: -3,
                to: -3,
                granularity: "GDC.time.year",
                localIdentifier: "threeYearsAgo",
                type: "relativePreset",
                visible: true,
                name: "3 years ago",
            },
            {
                from: -4,
                to: -4,
                granularity: "GDC.time.year",
                localIdentifier: "fourYearsAgo",
                type: "relativePreset",
                visible: true,
                name: "4 years ago",
            },
        ],
    },
};

const CustomComponent: React.FC = ({ children, ...restProps }) => (
    <CalculationSelector {...restProps}>
        <title>Calculation Selector</title>
    </CalculationSelector>
);

const CalculationSelector: React.FC = ({ children, ...restProps }) => (
    <>
        {children}
        <div {...restProps}></div>
    </>
);

interface IDateFilterComponentExampleState {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}

const dateFilterContainerStyle = { width: 200 };
const lineChartContainerStyle = { height: 300, width: 1248 };

export const Dashboard: React.FC = () => {
    const [state, setState] = useState<IDateFilterComponentExampleState>({
        selectedFilterOption: defaultDateFilterOptions.allTime!,
        excludeCurrentPeriod: false,
    });

    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        setState({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    return (
        <div>
            <h1>My Dashboard </h1>
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

            <>
                <div style={lineChartContainerStyle}>
                    <LineChart
                        measures={[Md.PercentRevenuePerProduct]}
                        trendBy={Md.DateDatasets.Date.Month.Short}
                        segmentBy={Md.Product.Default}
                    />
                </div>
                <div>
                    
                    <CustomComponent />

                </div>
            </>
        </div>
    );
};