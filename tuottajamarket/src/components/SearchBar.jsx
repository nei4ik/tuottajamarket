import SearchIcon from "@mui/icons-material/Search";

export function SearchBar({ value, onChange }) {
	return (
		<div className="search-field">
			<SearchIcon aria-hidden="true" />
			<input
				type="search"
				aria-label="Hae tuotteita"
				placeholder="Hae tuotteita..."
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}
