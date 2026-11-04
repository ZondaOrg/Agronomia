import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./core/store";
import { onSessionExpired } from "./core/server/services/session/session-expired";
import { sessionEnded } from "./core/auth/store/auth.slice";

onSessionExpired(() => store.dispatch(sessionEnded()));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
