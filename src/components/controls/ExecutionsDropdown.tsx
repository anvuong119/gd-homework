import React, { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import {
    DataViewFacade,
    GoodDataSdkError,
    IExecutionConfiguration,
    useExecutionDataView,
} from "@gooddata/sdk-ui";
import Dropdown, { DropdownBody, DropdownButton } from "@gooddata/goodstrap/lib/Dropdown/Dropdown";
import { useWorkspaceList } from "../../contexts/WorkspaceList";

export interface IExecutionInfo {
    executionId: string;
    buildExecutionConfig: () => IExecutionConfiguration;
    postExecution: (result: DataViewFacade) => string;
}

export interface IExecutionsDropdownProps {
    executionInfos: IExecutionInfo[];
    onExecutionStatusChanged?: (
        result: DataViewFacade,
        error: GoodDataSdkError,
        status: string,
        postExecution: (result: DataViewFacade) => string,
    ) => void;
    initiallySelectedExecutionId?: string;
}

interface IDropdownItem {
    id: string;
    title: string;
}

interface ISelectedExecutionState {
    id: string;
    executionConfig?: IExecutionConfiguration;
    postExecution: (result: DataViewFacade) => string;
}

export const ExecutionsDropdown: React.FC<IExecutionsDropdownProps> = ({
    executionInfos,
    onExecutionStatusChanged,
    initiallySelectedExecutionId,
}) => {
    const findSelectedExecutionInfo = useCallback(
        (executionId: string): IExecutionInfo =>
            executionInfos.find(info => info.executionId === executionId),
        [executionInfos],
    );

    const initialExecutionId = initiallySelectedExecutionId ?? executionInfos[0].executionId;
    const initialExecutionInfo = findSelectedExecutionInfo(initialExecutionId);
    const [selectedExecution, setSelectedExecution] = useState<ISelectedExecutionState>({
        id: initialExecutionId,
        executionConfig: initialExecutionInfo.buildExecutionConfig(),
        postExecution: initialExecutionInfo.postExecution,
    });

    const intl = useIntl();
    const dropdownItems = useMemo(() => {
        return executionInfos.map(
            (info): IDropdownItem => {
                const { executionId } = info;
                return {
                    id: executionId,
                    title: intl.formatMessage({
                        id: executionId,
                    }),
                };
            },
        );
    }, [executionInfos, intl]);

    const onExecutionSelected = useCallback(
        (dropdownItem: IDropdownItem): void => {
            const executionId = dropdownItem.id;
            const executionInfo = findSelectedExecutionInfo(executionId);
            setSelectedExecution({
                id: executionId,
                executionConfig: executionInfo.buildExecutionConfig(),
                postExecution: executionInfo.postExecution,
            });
        },
        [findSelectedExecutionInfo],
    );

    const { firstWorkspace: workspaceId } = useWorkspaceList();
    const { result, error, status } = useExecutionDataView({
        execution: selectedExecution.executionConfig,
        workspace: workspaceId,
    });
    onExecutionStatusChanged?.(result, error, status, selectedExecution.postExecution);

    const selectedDropdownItem = dropdownItems.find(dropdownItem => dropdownItem.id === selectedExecution.id);

    return (
        <Dropdown
            alignPoints={[
                {
                    align: "bl tl",
                },
                {
                    align: "tl bl",
                },
            ]}
            className="calculations-dropdown s-calculations-dropdown"
            button={<DropdownButton isSmall={false} value={selectedDropdownItem.title} />}
            body={
                <DropdownBody
                    className="gd-dropdown-body"
                    width={200}
                    items={dropdownItems}
                    selection={selectedDropdownItem}
                    onSelect={onExecutionSelected}
                />
            }
            overlayPositionType="sameAsTarget"
            overlayZIndex={5001}
        />
    );
};

export default ExecutionsDropdown;
