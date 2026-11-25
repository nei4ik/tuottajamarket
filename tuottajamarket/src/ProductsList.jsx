import { useContext } from "react";
import { AppContext } from "./providers/AppProvider";
import { FeaturedList } from "./components/FeaturedList";
import { OtherProducts } from "./components/OtherProducts";
import { ProductCards } from "./components/ProductCards";
import { ProductsLoading, ProductsError, ProductsEmpty } from "./components/ProductListStates";

function matchesSearch(product, query) {
	const fields = [product.title, product.description, product.category];
	return fields.some((value) =>
		String(value ?? "").toLocaleLowerCase("fi").includes(query)
	);
}

export function ProductsList({ search = "", onClearSearch }) {
	const { products, loading, error } = useContext(AppContext);
	const searchText = search.trim();
	const query = searchText.toLocaleLowerCase("fi");
	const isSearching = query.length > 0;
	const visibleProducts = isSearching
		? products.filter((product) => matchesSearch(product, query))
		: products.filter((product) => product.featured);

	const title = isSearching ? "Hakutulokset" : "Suosikit";
	const description = isSearching
		? `Tulokset haulle ”${searchText}”`
		: "Löydä suosikkisi arjen ruokahetkiin ja viikonlopun herkutteluun.";
	const count = visibleProducts.length;
	const showOtherProducts = !isSearching && !loading && !error;

	// Выбираем одно состояние списка, чтобы не вкладывать условия в JSX.
	let listContent;
	if (loading) {
		listContent = <ProductsLoading />;
	} else if (error) {
		listContent = <ProductsError />;
	} else if (count === 0) {
		listContent = <ProductsEmpty isSearching={isSearching} onClearSearch={onClearSearch} />;
	} else if (isSearching) {
		listContent = (
			<div className="product-grid">
				<ProductCards products={visibleProducts} />
			</div>
		);
	} else {
		listContent = <FeaturedList products={visibleProducts} />;
	}

	return (
		<div className="catalog-wrapper">
			{!isSearching && (
				<section className="hero-banner" aria-label="Tervetuloa Tuottajamarkettiin">
					<div className="hero-banner__content">
						<span className="hero-banner__pill">Suoraan pientuottajilta</span>
						<h2 className="hero-banner__title">
							Tervetuloa ostoksille kotimaiseen ruoan verkkokauppaan!
						</h2>
						<p className="hero-banner__text">
							Löydät meiltä lähitilojen tuoreet sadot, artesaanituotteet ja arjen
							suosikit edullisesti — suoraan tekijöiltä ruokapöytääsi.
						</p>
						<div className="hero-banner__actions">
							<a className="hero-cta" href="#products-title">
								Tutustu suosikkeihin
							</a>
							<a className="hero-secondary-cta" href="#other-products-title">
								Kaikki tuotteet
							</a>
						</div>
					</div>
					<div className="hero-banner__art" aria-hidden="true">
						<div className="hero-crate">
							<div className="hero-item hero-item--milk" />
							<div className="hero-item hero-item--jar" />
							<div className="hero-item hero-item--leaf" />
							<div className="hero-crate__box">
								<span className="hero-crate__logo">T</span>
								<span className="hero-crate__label">Tuottajamarket</span>
							</div>
						</div>
					</div>
				</section>
			)}

			{!isSearching && (
				<section className="promo-highlights" aria-label="Ajankohtaista">
					<div className="promo-card promo-card--mint">
						<span className="promo-badge">Sesonki</span>
						<h3>Satokauden tuoreimmat vihannekset ja juurekset</h3>
						<p>Poimittu lähellä, toimitus jopa samana päivänä.</p>
					</div>
					<div className="promo-card promo-card--forest">
						<span className="promo-badge">Pientuottajat</span>
						<h3>100 % kotimainen alkuperä ja reilu korvaus tiloille</h3>
						<p>Jokainen ostos tukee suomalaista ruokakulttuuria.</p>
					</div>
					<div className="promo-card promo-card--soft">
						<span className="promo-badge">Toimitus</span>
						<h3>Noutopisteet ja kotiinkuljetus ympäri Suomen</h3>
						<p>Kylmäketju säilyy katkeamattomana kotiovelle asti.</p>
					</div>
				</section>
			)}

			<section className="featured-section" aria-labelledby="products-title">
				<div className="section-heading">
					<div>
						<p className="eyebrow">TUOTTAJAMARKET / VALIKOIMA</p>
						<h1 id="products-title">{title}</h1>
						<p className="section-description">{description}</p>
					</div>
					{!loading && !error && (
						<span className="product-count" role="status">
							{count} {count === 1 ? "tuote" : "tuotetta"}
						</span>
					)}
				</div>

				{listContent}

				{showOtherProducts && (
					<OtherProducts products={products.filter((product) => !product.featured)} />
				)}
			</section>
		</div>
	);
}
