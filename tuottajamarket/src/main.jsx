import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { AppProvider } from "./providers/AppProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</StrictMode>
);
