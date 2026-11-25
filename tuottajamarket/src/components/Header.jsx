import { Link } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

export function Header({ title, onMenuClick, children }) {
	return (
		<header className="site-header">
			<div className="top-notice" role="note">
				<span className="top-notice__badge">Uutta</span>
				<span>Tuoretta sadonkorjuuta ja lähiruokaa suoraan suomalaisilta tiloilta</span>
			</div>
			<div className="header-inner">
				<div className="header-left">
					{onMenuClick && (
						<button
							className="icon-button menu-button"
							type="button"
							aria-label="Avaa valikko"
							onClick={onMenuClick}
						>
							<MenuIcon />
						</button>
					)}
					<Link className="brand-link" to="/">
						<span className="brand-emblem" aria-hidden="true">T</span>
						<span className="wordmark">
							{title}<span className="brand-dot">.</span>
						</span>
					</Link>
					<Link className="nav-chip" to="/">
						<StorefrontOutlinedIcon fontSize="small" aria-hidden="true" />
						<span>Tuotteet</span>
					</Link>
				</div>

				<Link className="delivery-pill" to="/">
					<span className="delivery-pill__dot" aria-hidden="true">
						<LocalShippingOutlinedIcon fontSize="inherit" />
					</span>
					<span className="delivery-pill__text">
						<strong>Lähitoimitus</strong>
						<small>Valitse nouto tai kotiinkuljetus</small>
					</span>
				</Link>

				<div className="header-controls">
					{children}
				</div>
			</div>
		</header>
	);
}
