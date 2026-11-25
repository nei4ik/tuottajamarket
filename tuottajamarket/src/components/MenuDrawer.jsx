import { Link } from "react-router";
import Drawer from "@mui/material/Drawer";

export function MenuDrawer({ open, onClose, title }) {
	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			slotProps={{
				paper: { sx: { width: 280, maxWidth: "90vw", fontFamily: "Manrope, sans-serif" } },
			}}
		>
			<div className="menu-content">
				<Link className="brand-link" to="/" onClick={onClose}>
					<span className="brand-emblem" aria-hidden="true">T</span>
					<span className="wordmark">
						{title}<span className="brand-dot">.</span>
					</span>
				</Link>
				<div className="sidebar-article">
					<h3 className="sidebar-title">Ohjeet</h3>
					<Link className="sidebar-link" to="/ohjeet" onClick={onClose}>
						Käyttöohjeet
					</Link>
				</div>
				<div className="section-heading">
					<button type="button" className="text-button" onClick={onClose}>
						Sulje
					</button>
				</div>
			</div>
		</Drawer>
	);
}
