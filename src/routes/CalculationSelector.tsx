import { useEffect, useState } from "react";
import { LoadingComponent, ErrorComponent, useExecutionDataView } from "@gooddata/sdk-ui";
import { modifyAttribute } from "@gooddata/sdk-model";
import * as Md from "../md/full";

interface IProps {
    filters: any;
}

const CalculationSelector: React.FC<IProps> = ({filters}): JSX.Element => {
    const [selectedCalculation, setSelectedCalculation] = useState('maximum');
    const [resultCalculation, setResultCalculation] = useState('0');

    const measure = Md.PercentRevenuePerProduct;
    const seriesBy = [measure];

    const monthDate = modifyAttribute(
        Md.DateDatasets.Date.Month.Short, (a) => a.alias("Month"),
    );
    const slicesBy = [monthDate];
    const dateFilter = filters;
    console.log('filters', dateFilter);

    const { result, error, status } = useExecutionDataView({ 
        execution: { seriesBy, slicesBy } //todo implement with dateFilter
    });

    const measureSeries = result?.data().series().firstForMeasure(measure);
    // const measureResult = measureSeries?.dataPoints()[0].formattedValue() ?? 'N/A';

    useEffect(() => {
        calculateData('maximum');
    }, [measureSeries]);

    //because currently measure is Md.PercentRevenuePerProduct, that mean total percent each month always 100%, so min and max is the same value
    //if replace with other measure like RevenuePerProduct, then we can get the min and max value of each month differently
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCalculation(event.target.value);
        calculateData(event.target.value);       
    }

    const findMax = (arr: ((string | null)[] | undefined)) => {
        let max = 0;
        if (arr) {
            for (let i = 0; i < arr?.length; i++) {
                let value = arr[i] ?? '0';
                if (parseFloat(value) > max) {
                    max = parseFloat(value);
                }
            }
        }
        return max;
    }

    const findMin = (arr: ((string | null)[] | undefined)) => {
        let min = 100;
        if (arr) {
            for (let i = 0; i < arr?.length; i++) {
                let value = arr[i] ?? '0';
                if (parseFloat(value) < min) {
                    min = parseFloat(value);
                }
            }
        }
        return min;
    }

    const calculateData = (value: string) => {
        if (measureSeries?.dataPoints().length === 0) {
            setResultCalculation('N/A');
        } else {
            let resultCalculation = 0;
            let measureSeriesFormatted = measureSeries?.dataPoints().map((dp) => dp.formattedValue());
            if (value === 'maximum') {
                resultCalculation = findMax(measureSeriesFormatted);
            } else if (value === 'minimum') {
                resultCalculation = findMin(measureSeriesFormatted);
            }
            
            setResultCalculation(resultCalculation+'%');
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
                    <style>
                        {`
                            .kpi {
                                height: 60px;
                                margin: 10px 0;
                                font-size: 50px;
                                line-height: 60px;
                                white-space: nowrap;
                                vertical-align: bottom;
                                font-weight: 700;
                            }
                        `}
                    </style>
                    <p className="kpi s-execute-kpi">{resultCalculation}</p>
                    <hr />
                    {calculateSelection}
                </div>
            ) : null}
        </div>
    );
};

export default CalculationSelector;