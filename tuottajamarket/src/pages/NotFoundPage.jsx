import { Link } from "react-router";

export function NotFoundPage() {
	return (
		<div className="empty-state">
			<h1>404 — Sivua ei löytynyt</h1>
			<p>Tarkista osoite tai palaa takaisin Tuottajamarketin etusivulle.</p>
			<Link className="hero-cta" to="/" style={{ marginTop: "1.25rem" }}>
				Etusivulle
			</Link>
		</div>
	);
}
