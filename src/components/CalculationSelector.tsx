import { useEffect, useState } from "react";
import { LoadingComponent, ErrorComponent, useExecutionDataView } from "@gooddata/sdk-ui";
import { modifyAttribute } from "@gooddata/sdk-model";
import * as Md from "../md/full";
import { findMaxValue, findMinValue } from "../utils/helpers";
// import cx from "classnames";
import styles from "./CalculationSelector.module.scss";

const CalculationSelector: React.FC = (): JSX.Element => {
    const [selectedCalculation, setSelectedCalculation] = useState('maximum');
    const [resultCalculation, setResultCalculation] = useState('0');

    const measure = Md.Revenue;
    const seriesBy = [measure];

    const monthDate = modifyAttribute(
        Md.DateDatasets.Date.Month.Short, (a) => a.alias("Month"),
    );
    const slicesBy = [monthDate];

    const { result, error, status } = useExecutionDataView({ 
        execution: { seriesBy, slicesBy } //todo implement with dateFilter
    });

    const measureSeries = result?.data().series().firstForMeasure(measure);

    useEffect(() => {
        calculateData('maximum');
    }, [measureSeries]);

    //because currently measure is Md.PercentRevenuePerProduct, that mean total percent each month always 100%, so min and max is the same value
    //if replace with other measure like RevenuePerProduct, then we can get the min and max value of each month differently
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCalculation(event.target.value);
        calculateData(event.target.value);       
    }

    const calculateData = (value: string) => {
        if (measureSeries?.dataPoints().length === 0) {
            setResultCalculation('N/A');
        } else {
            let resultCalculation = 0;
            let measureSeriesFormatted = measureSeries?.dataPoints().map((dp) => dp.formattedValue());
            if (value === 'maximum') {
                resultCalculation = findMaxValue(measureSeriesFormatted);
            } else if (value === 'minimum') {
                resultCalculation = findMinValue(measureSeriesFormatted);
            }
            
            setResultCalculation('$' + resultCalculation.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
        }
    }

    const calculateSelection = (
        <>
            <label>
                <select
                value={selectedCalculation}
                onChange={handleSelectChange}
                >
                    <option value="maximum">Maximum Revenue</option>
                    <option value="minimum">Minimum Revenue</option>
                </select>
            </label>
        </>
    );

    return (
        <div>
            {status === "error" ? (
                <div>
                    {calculateSelection}
                    <ErrorComponent
                        message="There was an error getting your execution"
                        description={JSON.stringify(error, null, 2)}
                    />
                </div>
            ) : null}
            {status === "loading" ? (
                <div>
                    <div className="gd-message progress">
                        <div className="gd-message-text">Loading…</div>
                    </div>
                    <LoadingComponent />
                </div>
            ) : null}
            {status === "success" ? (
                <div>
                    <p className={styles.resultCalculation}>{resultCalculation}</p>
                    <hr />
                    {calculateSelection}
                </div>
            ) : null}
        </div>
    );
};

export default CalculationSelector;