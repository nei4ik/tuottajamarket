import { createBrowserRouter } from "react-router";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { InstructionsPage } from "../pages/InstructionsPage";
import { ProductPage } from "../pages/ProductPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{ index: true, Component: HomePage },
			{ path: "ohjeet", Component: InstructionsPage },
			{ path: "product/:id", Component: ProductPage },
			{ path: "*", Component: NotFoundPage },
		],
	},
]);
