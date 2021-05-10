import React from "react";
import Dropdown, { DropdownBody, DropdownButton } from "@gooddata/goodstrap/lib/Dropdown/Dropdown";
import { injectIntl, WrappedComponentProps } from "react-intl";

interface IDropdownItem {
    id: string;
    title: string;
}

interface ICalculationsDropdownOwnProps {
    selectedCalculation?: string;
    onCalculationSelected?: (calculation: string) => void;
}

interface ICalculationsDropdownState {
    selectedCalculation: string;
}

type ICalculationsDropdownProps = ICalculationsDropdownOwnProps & WrappedComponentProps;

const CALCULATIONS = [
    "calculations.revenue.max",
    "calculations.revenue.min",
    "calculations.quantiles.median",
];

const DEFAULT_DROPDOWN_ALIGN_POINTS = [
    {
        align: "bl tl",
    },
    {
        align: "tl bl",
    },
];
const DEFAULT_DROPDOWN_ZINDEX = 5001;
const DEFAULT_DROPDOWN_WIDTH = 199;

class CalculationsDropdown extends React.PureComponent<
    ICalculationsDropdownProps,
    ICalculationsDropdownState
> {
    constructor(props: ICalculationsDropdownProps) {
        super(props);

        this.state = {
            selectedCalculation: CALCULATIONS.includes(props.selectedCalculation)
                ? props.selectedCalculation
                : CALCULATIONS[0],
        };
    }

    componentDidMount() {
        this.props.onCalculationSelected?.(this.state.selectedCalculation);
    }

    private isCalculationSelected = (item: IDropdownItem): boolean => {
        return item.id === (this.state.selectedCalculation || this.props.selectedCalculation);
    };

    private getCalculationItem = (calculationId: string): IDropdownItem => {
        return {
            id: calculationId,
            title: this.props.intl.formatMessage({
                id: calculationId,
            }),
        };
    };

    private getCalculationItems = (): IDropdownItem[] => {
        return CALCULATIONS.map(this.getCalculationItem);
    };

    private onCalculationSelected = (item: IDropdownItem) => {
        this.setState({
            selectedCalculation: item.id,
        });
        this.props.onCalculationSelected?.(item.id);
    };

    public render() {
        const calculationItems = this.getCalculationItems();
        const selectedCalculationItem = calculationItems.find(this.isCalculationSelected);

        return (
            <Dropdown
                alignPoints={DEFAULT_DROPDOWN_ALIGN_POINTS}
                className="calculations-dropdown s-calculations-dropdown"
                button={<DropdownButton isSmall={false} value={selectedCalculationItem.title} />}
                body={
                    <DropdownBody
                        className="gd-dropdown-body"
                        width={DEFAULT_DROPDOWN_WIDTH}
                        items={calculationItems}
                        selection={selectedCalculationItem}
                        onSelect={this.onCalculationSelected}
                    />
                }
                overlayPositionType="sameAsTarget"
                overlayZIndex={DEFAULT_DROPDOWN_ZINDEX}
            />
        );
    }
}

export default injectIntl(CalculationsDropdown);
