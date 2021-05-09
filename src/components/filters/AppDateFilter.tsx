import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
    DateFilter,
    DateFilterHelpers,
    DateFilterOption,
    defaultDateFilterOptions,
} from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-backend-spi";
import { IDateFilter } from "@gooddata/sdk-model";
import { ILocale } from "@gooddata/sdk-ui";

import { DateDatasets } from "../../ldm/full";

import styles from "./AppDateFilter.module.scss";

interface IAppDateFilterProps {
    onDateFilterSelected?: (dateFilter: IDateFilter, dateFilterTitle: string) => void;
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
    const intl = useIntl();

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
            DateFilterHelpers.getDateFilterTitle(selectedFilterOption, intl.locale as ILocale),
        );
    };

    useEffect(() => {
        const selectedFilterOption = defaultDateFilterOptions.allTime!;
        onDateFilterSelected?.(
            DateFilterHelpers.mapOptionToAfm(selectedFilterOption, DateDatasets.Date.ref, false),
            DateFilterHelpers.getDateFilterTitle(selectedFilterOption, intl.locale as ILocale),
        );
    }, [onDateFilterSelected, intl.locale]);

    return (
        <div className={styles.AppDateFilter}>
            <DateFilter
                excludeCurrentPeriod={state.excludeCurrentPeriod}
                selectedFilterOption={state.selectedFilterOption}
                filterOptions={defaultDateFilterOptions}
                availableGranularities={availableGranularities}
                customFilterName={intl.formatMessage({
                    id: "datefilter.name",
                })}
                dateFilterMode="active"
                onApply={onApply}
            />
        </div>
    );
};

export default AppDateFilter;
