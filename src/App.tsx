import React from "react";
import { BackendProvider } from "@gooddata/sdk-ui";

import { useAuth } from "./contexts/Auth";
import { WorkspaceListProvider } from "./contexts/WorkspaceList";
import Home from "./routes/Home";

function App() {
    const { backend } = useAuth();

    return (
        <BackendProvider backend={backend}>
            <WorkspaceListProvider>
                <Home />
            </WorkspaceListProvider>
        </BackendProvider>
    );
}

export default App;
