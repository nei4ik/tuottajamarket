import { Link } from "react-router";
import { Button } from "./Button";
import { ProductPixelArt } from "./ProductPixelArt";

export const ProductCard = ({ id, name, price, description, category, addToCart }) => {
	const categoryLabel = category && category !== "food" ? category : "Elintarvikkeet";

	return (
		<article className="product-card">
			<div className="product-card__header">
				<p className="product-category">{categoryLabel}</p>
				<span className="product-origin-tag">Kotimainen</span>
			</div>
			<Link className="product-card__media-link" to={`/product/${id}`} tabIndex={-1} aria-hidden="true">
				<ProductPixelArt title={name} category={category} size={72} className="product-card__media" />
			</Link>
			<h2>
				<Link className="product-card__title-link" to={`/product/${id}`}>
					{name}
				</Link>
			</h2>
			<p className="product-description">{description}</p>
			<div className="product-card__bottom">
				<div className="product-price-block">
					<p className="product-price">
						<span className="sr-only">Hinta: </span>
						{Number(price).toFixed(2)}
						<span className="currency"> €</span>
					</p>
					<span className="product-unit">sis. alv</span>
				</div>
				<Button aria-label={`Osta ${name}`} onClick={addToCart}>Osta</Button>
			</div>
		</article>
	);
};
