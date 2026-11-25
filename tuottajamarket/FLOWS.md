# Frontend regression checks

## Current baseline before visual polish
- Local app: http://localhost:5173/; API: http://localhost:3000/products.
- FeaturedList displays products with featured=true (13 of 54 at inspection).
- Header has a working menu drawer and controlled search input, but filtering was not wired.
- Product titles, descriptions and string prices render; Osta has no checkout handler.
- Cards form a long horizontal strip with strong shadows and gradient buttons.
- Public folder is empty; database image paths do not resolve to image files.

## Requested visual polish
- Preserve Manrope, green identity, Finnish UI, API and featured selection.
- Restrained header, bounded content width, aligned responsive card grid, solid buttons and readable price hierarchy.
- No invented photos, product claims, database changes or checkout implementation.

## Reusable page layout
- App nests SearchBar directly inside Header. Header shows Tuottajamarket; entering text in its search field filters the catalog as before.
- Skip link targets the main catalog. Footer appears below the catalog with the shop name.

## Component refactor
- ProductsList selects the current catalog state. FeaturedList only renders the scrolling row.
- Confirm the same order, layout, euro prices, search results, loading/error states and menu behavior after the split.

## Product loading
- Requested correction: Suosikit is a single horizontally scrollable row at desktop and mobile widths.
- Muut tuotteet appears below as a responsive grid with all non-featured products, without duplicates.
- Reload with API running; all products appear once across these two sections.
- Search temporarily replaces both sections with one results grid; clearing restores both.
- All title, description and two-decimal numeric prices match the API.
- Show loading and API-error states without confusing them with an empty search.

## Search
- Type Mansikka in Hae tuotteita; only matching products appear.
- Search considers all products, not only featured items.
- Type a nonexistent term; see Ei hakutuloksia and Tyhjennä haku.
- Clear search; featured view returns.

## Menu
- Click Avaa valikko; drawer shows Valikko and Sulje.
- Click Sulje or press Escape; drawer closes, products remain.

## Cart modal
- On reload the modal is closed; choose Ostoskori in the header to open it.
- Sulje, Escape and clicking the backdrop each close it; the same button opens it again.
- At 375px wide the modal and its close button fit inside the viewport.

## Header spacing
- Header content spans the available width with side padding; the catalog stays centered.
- On mobile, search still wraps under the shop name without causing page overflow.

## Responsive and accessibility
- Inspect desktop and 375px widths: no document overflow, cards align, header/search/menu usable.
- Check keyboard focus and 200% scale equivalent.
- No new browser runtime errors; production build and lint complete.
