import { ProductCards } from "./ProductCards";

export function FeaturedList({ products, ariaLabel = "Selaa suosikkeja" }) {
	return (
		<div
			className="featured-list"
			tabIndex={0}
			role="region"
			aria-label={ariaLabel}
		>
			<ProductCards products={products} />
		</div>
	);
}
