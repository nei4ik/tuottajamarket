import AddIcon from "@mui/icons-material/Add";

export const Button = ({ children, ...props }) => (
	<button type="button" className="button" {...props}>
		<AddIcon fontSize="small" aria-hidden="true" />
		{children}
	</button>
);
