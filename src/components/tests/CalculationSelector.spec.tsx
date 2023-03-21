// import * as sdkUI from "@gooddata/sdk-ui";
import { shallow } from "enzyme";

import CalculationSelector from "../CalculationSelector";

//mock function for useExecutionDataView hook
// const useExecutionDataViewMock = jest.fn();
jest.mock("@gooddata/sdk-ui", () => ({
    ...jest.requireActual("@gooddata/sdk-ui"),
    useExecutionDataView: () => jest.fn()
}));

describe("CalculationSelector component", () => {
    it("should render correctly", () => {
        const wrapper = shallow(<CalculationSelector />);
        expect(wrapper.text().includes('Revenue')).toBe(true);
    });
});
