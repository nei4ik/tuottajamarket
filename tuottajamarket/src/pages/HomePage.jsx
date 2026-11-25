import { useOutletContext } from "react-router";
import { ProductsList } from "../ProductsList";

export function HomePage() {
	const { search, onClearSearch } = useOutletContext();

	return <ProductsList search={search} onClearSearch={onClearSearch} />;
}
