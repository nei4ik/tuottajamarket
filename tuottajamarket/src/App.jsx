import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Footer } from "./components/Footer";
import { MenuDrawer } from "./components/MenuDrawer";
import { PageLayout } from "./components/PageLayout";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { Cart } from "./components/Cart";
import "./App.css";

export default function App() {
	const [search, setSearch] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	function handleSearchChange(value) {
		setSearch(value);
		if (value.trim() && location.pathname !== "/") {
			navigate("/");
		}
	}

	const header = (
		<Header title="Tuottajamarket" onMenuClick={() => setMenuOpen(true)}>
			<SearchBar value={search} onChange={handleSearchChange} />
			<Cart
				open={cartOpen}
				onOpen={() => setCartOpen(true)}
				onClose={() => setCartOpen(false)}
			/>
		</Header>
	);

	return (
		<>
			<PageLayout header={header} footer={<Footer>Tuottajamarket</Footer>} mainId="products">
				<Outlet context={{ search, onClearSearch: () => setSearch("") }} />
			</PageLayout>
			<MenuDrawer title="Tuottajamarket" open={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	);
}
