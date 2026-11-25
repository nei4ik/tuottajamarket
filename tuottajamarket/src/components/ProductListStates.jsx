import SearchIcon from "@mui/icons-material/Search";

export function ProductsLoading() {
	return (
		<div className="featured-list" aria-busy="true" aria-label="Ladataan tuotteita">
			{Array.from({ length: 8 }, (_, index) => (
				<div key={index} className="product-card skeleton-card" aria-hidden="true">
					<span />
					<span />
					<span />
				</div>
			))}
		</div>
	);
}

export function ProductsError() {
	return (
		<div className="empty-state" role="alert">
			<h2>Tuotteita ei voitu ladata</h2>
			<p>Tarkista, että palvelin on käynnissä, ja päivitä sivu.</p>
		</div>
	);
}

export function ProductsEmpty({ isSearching, onClearSearch }) {
	const title = isSearching ? "Ei hakutuloksia" : "Ei vielä suosikkeja";
	const description = isSearching
		? "Kokeile toista hakusanaa tai selaa suosikkeja."
		: "Suosikkituotteet näkyvät tässä.";

	return (
		<div className="empty-state">
			<SearchIcon aria-hidden="true" />
			<h2>{title}</h2>
			<p>{description}</p>
			{isSearching && (
				<button type="button" className="text-button" onClick={onClearSearch}>
					Tyhjennä haku
				</button>
			)}
		</div>
	);
}
