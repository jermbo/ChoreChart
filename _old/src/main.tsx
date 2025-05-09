import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ChoreProvider from "./context/ChoreContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ChoreProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChoreProvider>
);
