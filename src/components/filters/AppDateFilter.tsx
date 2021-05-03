import React, { useState } from "react";
import {
    DateFilter,
    DateFilterHelpers,
    DateFilterOption,
    defaultDateFilterOptions,
} from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-backend-spi";
import { IDateFilter } from "@gooddata/sdk-model";
import { DateDatasets } from "../../ldm/full";

import styles from "./AppDateFilter.module.scss";

interface IAppDateFilterProps {
    onDateFilterSelected?: (dateFilter: IDateFilter) => void;
}

interface IAppDateFilterState {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}

const availableGranularities: DateFilterGranularity[] = ["GDC.time.year"];

const AppDateFilter: React.FC<IAppDateFilterProps> = ({ onDateFilterSelected }) => {
    const [state, setState] = useState<IAppDateFilterState>({
        selectedFilterOption: defaultDateFilterOptions.allTime!,
        excludeCurrentPeriod: false,
    });

    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        setState({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
        onDateFilterSelected?.(
            DateFilterHelpers.mapOptionToAfm(
                selectedFilterOption,
                DateDatasets.Date.ref,
                excludeCurrentPeriod,
            ),
        );
    };

    return (
        <div className={styles.AppDateFilter}>
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
    );
};

export default AppDateFilter;
