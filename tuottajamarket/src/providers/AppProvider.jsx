import { createContext, useState, useEffect } from "react";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [theme, setTheme] = useState("light");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [cart, setCart] = useState([])

	useEffect(() => {
		const controller = new AbortController();
		const apiBaseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

		async function loadProducts() {
			try {
				const response = await fetch(`${apiBaseUrl}/products`, { signal: controller.signal });
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				const data = await response.json();
				if (!Array.isArray(data)) throw new Error("Expected a products array from the API");
				if (!controller.signal.aborted) {
					setProducts(data);
					setLoading(false);
				}
			} catch (error) {
				if (!controller.signal.aborted) {
					console.error("Error fetching products:", error);
					setError("Tuotteita ei voitu ladata");
					setLoading(false);
				}
			}
		}
		loadProducts();
		return () => controller.abort();
	}, []);

	function addToCart(id) {
		const product = products.find((item) => item.id === id);
		if (!product) return;
		setCart((prevCart) => [...prevCart, product]);
	}

	return (
		<AppContext.Provider value={{ theme, setTheme, products, loading, error, cart, setCart, addToCart }}>
			{children}
		</AppContext.Provider>
	);
};
