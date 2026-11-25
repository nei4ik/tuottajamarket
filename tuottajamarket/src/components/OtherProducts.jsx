import { ProductCards } from "./ProductCards";

export function OtherProducts({ products }) {
	if (products.length === 0) return null;

	return (
		<section className="catalog-section" aria-labelledby="other-products-title">
			<div className="section-heading">
				<div>
					<h2 className="catalog-title" id="other-products-title">Muut tuotteet</h2>
					<p className="section-description">Selaa valikoiman muita tuotteita.</p>
				</div>
				<span className="product-count">
					{products.length} {products.length === 1 ? "tuote" : "tuotetta"}
				</span>
			</div>
			<div className="product-grid">
				<ProductCards products={products} />
			</div>
		</section>
	);
}
