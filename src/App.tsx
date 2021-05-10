import React from "react";
import { BackendProvider } from "@gooddata/sdk-ui";

import { useAuth } from "./contexts/Auth";
import { WorkspaceListProvider } from "./contexts/WorkspaceList";
import { LocalizedIntlProvider } from "./components/LocalizedIntlProvider";
import Home from "./components/Home";

import { DEFAULT_LANGUAGE } from "./utils/translations";

function App() {
    const { backend } = useAuth();

    return (
        <BackendProvider backend={backend}>
            <WorkspaceListProvider>
                <LocalizedIntlProvider locale={DEFAULT_LANGUAGE}>
                    <Home />
                </LocalizedIntlProvider>
            </WorkspaceListProvider>
        </BackendProvider>
    );
}

export default App;
