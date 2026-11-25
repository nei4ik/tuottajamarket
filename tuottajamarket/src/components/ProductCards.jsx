import { AppContext } from "../providers/AppProvider";
import { ProductCard } from "./ProductCard";
import { useContext } from "react";

export function ProductCards({ products }) {
	const { addToCart } = useContext(AppContext);
	return products.map((product) => (
		<ProductCard
			key={product.id}
			id={product.id}
			name={product.title}
			price={product.price}
			description={product.description}
			category={product.category}
			addToCart={() => addToCart(product.id)}
		/>
	));
}
