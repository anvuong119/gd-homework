import React from "react";
import { useIntl } from "react-intl";

import styles from "./DashboardTitle.module.scss";

interface IDashboardTitleProps {
    title?: string;
}

const DashboardTitle: React.FC<IDashboardTitleProps> = ({ title }) => {
    const intl = useIntl();
    const prefix = intl.formatMessage({
        id: "dashboard.prefix",
    });
    return <span className={styles.DashboardTitle}>{title ? `${prefix} - ${title}` : prefix}</span>;
};

export default DashboardTitle;
