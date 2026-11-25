import { useContext } from "react";
import { Link, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppContext } from "../providers/AppProvider";
import { Button } from "../components/Button";
import { FeaturedList } from "../components/FeaturedList";
import { ProductPixelArt } from "../components/ProductPixelArt";
import { ProductsError, ProductsLoading } from "../components/ProductListStates";

export function ProductPage() {
	const { id } = useParams();
	const { products, loading, error, addToCart } = useContext(AppContext);

	if (loading) {
		return <ProductsLoading />;
	}

	if (error) {
		return <ProductsError />;
	}

	const product = products.find((item) => String(item.id) === id);

	if (!product) {
		return (
			<div className="empty-state">
				<h2>Tuotetta ei löytynyt</h2>
				<p>Etsimääsi tuotetta ei ole valikoimassa tai se on poistettu.</p>
				<Link className="hero-cta" to="/" style={{ marginTop: "1rem" }}>
					Takaisin etusivulle
				</Link>
			</div>
		);
	}

	const categoryLabel =
		product.category && product.category !== "food" ? product.category : "Elintarvikkeet";

	const relatedProducts = products.filter(
		(item) => item.id !== product.id && item.category === product.category
	);

	return (
		<>
			<section className="info-page" aria-labelledby="product-detail-title">
				<Link className="back-link" to="/">
					<ArrowBackIcon fontSize="small" aria-hidden="true" />
					<span>Takaisin valikoimaan</span>
				</Link>

				<article className="product-detail-card">
					<div className="product-detail-layout">
						<ProductPixelArt
							title={product.title}
							category={product.category}
							size={128}
							className="product-detail-media"
						/>
						<div className="product-detail-info">
							<div className="product-card__header">
								<span className="product-category">{categoryLabel}</span>
								<span className="product-origin-tag">Kotimainen</span>
							</div>
							<h1 id="product-detail-title">{product.title}</h1>
							<p className="product-detail-description">{product.description}</p>

							<div className="product-detail-bottom">
								<div className="product-price-block">
									<p className="product-price">
										<span className="sr-only">Hinta: </span>
										{Number(product.price).toFixed(2)}
										<span className="currency"> €</span>
									</p>
									<span className="product-unit">sis. alv</span>
								</div>
								<Button onClick={() => addToCart(product.id)}>Osta</Button>
							</div>
						</div>
					</div>
				</article>
			</section>

			{relatedProducts.length > 0 && (
				<section className="catalog-section" aria-labelledby="related-products-title">
					<div className="section-heading">
						<div>
							<p className="eyebrow">SAMASTA KATEGORIASTA</p>
							<h2 className="catalog-title" id="related-products-title">
								Lisää kategoriasta {categoryLabel}
							</h2>
						</div>
						<span className="product-count">
							{relatedProducts.length} {relatedProducts.length === 1 ? "tuote" : "tuotetta"}
						</span>
					</div>
					<FeaturedList
						products={relatedProducts}
						ariaLabel={`Lisää kategoriasta ${categoryLabel}`}
					/>
				</section>
			)}
		</>
	);
}
