import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function InstructionsPage() {
	return (
		<section className="info-page" aria-labelledby="instructions-title">
			<Link className="back-link" to="/">
				<ArrowBackIcon fontSize="small" aria-hidden="true" />
				<span>Takaisin valikoimaan</span>
			</Link>

			<div className="info-card">
				<p className="eyebrow">TUOTTAJAMARKET / OHJEET</p>
				<h1 id="instructions-title">Käyttöohjeet</h1>
				<p className="section-description">
					Näin teet ostoksia helposti kotimaisilta pientuottajilta.
				</p>

				<ol className="instructions-steps">
					<li>
						<strong>1. Selaa tai hae tuotteita</strong>
						<p>
							Etusivulta löydät suosikkituotteet sekä koko muun valikoiman. Yläpalkin
							hakukentällä voit suodattaa tuotteita nimen, kuvauksen tai kategorian mukaan.
						</p>
					</li>
					<li>
						<strong>2. Lisää tuotteita ostoskoriin</strong>
						<p>
							Paina tuotteen kortissa <em>Osta</em>-painiketta. Voit myös avata tuotteen
							oman sivun klikkaamalla tuotteen nimeä.
						</p>
					</li>
					<li>
						<strong>3. Hallitse ostoskoria</strong>
						<p>
							Avaa ostoskori oikean yläkulman painikkeesta. Korissa voit muuttaa
							tuotteiden määriä (<code>-</code> / <code>+</code>), poistaa yksittäisiä
							tuotteita tai tyhjentää koko korin.
						</p>
					</li>
				</ol>
			</div>
		</section>
	);
}
