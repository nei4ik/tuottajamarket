import { useId } from "react";

export function PageLayout({ header, footer, children, mainId }) {
	const generatedId = useId();
	const contentId = mainId ?? generatedId;

	return (
		<>
			<a className="skip-link" href={`#${contentId}`}>Siirry sisältöön</a>
			{header}
			<main className="page-shell" id={contentId}>
				{children}
			</main>
			{footer}
		</>
	);
}
