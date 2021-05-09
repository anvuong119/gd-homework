import React from "react";
import { IntlProvider } from "react-intl";

import { getIntlOptions } from "../utils/translations";

export const LocalizedIntlProvider: React.FC<{ locale: string }> = ({ locale, children }) => {
    return <IntlProvider {...getIntlOptions(locale)}>{children}</IntlProvider>;
};
