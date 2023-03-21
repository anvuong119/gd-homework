import { shallow } from "enzyme";

import { Dashboard } from "../Dashboard";
import CalculationSelector from "../CalculationSelector";
import { DateFilter } from "@gooddata/sdk-ui-filters";

describe("Dashboard component", () => {
    it("should render DateFilter", () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find(DateFilter).length).toBe(1);
    });

    it("should render CalculationSelector", () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find(CalculationSelector).length).toBe(1);
    });
});
