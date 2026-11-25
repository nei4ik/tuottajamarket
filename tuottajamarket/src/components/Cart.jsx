import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import { ProductPixelArt } from "./ProductPixelArt";

const modalStyle = {
	position: "absolute",
	top: "50%",
	right: { xs: 8, sm: 20 },
	transform: "translateY(-50%)",
	width: "min(480px, calc(100% - 16px))",
	maxHeight: "calc(100vh - 32px)",
	display: "flex",
	flexDirection: "column",
	bgcolor: "var(--color-surface)",
	boxShadow: "0 24px 60px rgba(8, 61, 37, 0.22)",
	borderRadius: "20px",
	border: "1px solid var(--color-border)",
	overflow: "hidden",
	outline: "none",
	fontFamily: "var(--font-body)",
};

export function Cart({ open, onOpen, onClose }) {
	const { cart, setCart, addToCart } = useContext(AppContext);

	const groupedItems = Object.values(
		cart.reduce((acc, product) => {
			if (!product) return acc;
			if (!acc[product.id]) {
				acc[product.id] = { product, quantity: 0 };
			}
			acc[product.id].quantity += 1;
			return acc;
		}, {})
	);

	const totalItems = cart.filter(Boolean).length;
	const totalPrice = cart.reduce((sum, product) => sum + Number(product?.price ?? 0), 0);

	function removeOne(id) {
		setCart((prevCart) => {
			const index = prevCart.findIndex((item) => item && item.id === id);
			if (index === -1) return prevCart;
			return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
		});
	}

	function removeAllOfProduct(id) {
		setCart((prevCart) => prevCart.filter((item) => item && item.id !== id));
	}

	function clearCart() {
		setCart([]);
	}

	return (
		<>
			<button
				type="button"
				className="cart-trigger"
				aria-label={`Ostoskori, ${totalItems} ${totalItems === 1 ? "tuote" : "tuotetta"}`}
				aria-haspopup="dialog"
				onClick={onOpen}
			>
				<span className="cart-trigger__icon">
					<ShoppingCartOutlinedIcon fontSize="small" />
					{totalItems > 0 && (
						<span className="cart-trigger__badge" aria-hidden="true">
							{totalItems}
						</span>
					)}
				</span>
				<span className="cart-trigger__total">
					{totalItems > 0 ? `${totalPrice.toFixed(2)} €` : "Ostoskori"}
				</span>
			</button>

			<Modal open={open} onClose={onClose}>
				<Box
					sx={modalStyle}
					className="cart-modal"
					role="dialog"
					aria-modal="true"
					aria-labelledby="cart-title"
					aria-describedby="cart-description"
				>
					<div className="cart-header">
						<div className="cart-header__title-group">
							<h2 id="cart-title">Ostoskori</h2>
							<span className="cart-count-pill">
								{totalItems} {totalItems === 1 ? "tuote" : "tuotetta"}
							</span>
						</div>
						<button type="button" className="text-button" onClick={onClose}>
							Sulje
						</button>
					</div>

					<p id="cart-description" className="sr-only">
						Ostoskorin tuotteet ja yhteishinta
					</p>

					{groupedItems.length > 0 ? (
						<>
							<ul className="cart-list">
								{groupedItems.map(({ product, quantity }) => {
									const categoryLabel =
										product.category && product.category !== "food"
											? product.category
											: "Elintarvikkeet";
									const lineTotal = Number(product.price) * quantity;

									return (
										<li key={product.id} className="cart-item">
											<div className="cart-item__main">
												<div className="cart-item__top">
													<span className="cart-item__category">{categoryLabel}</span>
													<button
														type="button"
														className="cart-item__remove"
														aria-label={`Poista ${product.title} ostoskorista`}
														onClick={() => removeAllOfProduct(product.id)}
													>
														<DeleteOutlineIcon fontSize="small" />
													</button>
												</div>
												<div className="cart-item__intro">
													<ProductPixelArt
														title={product.title}
														category={product.category}
														size={40}
														className="cart-item__thumb"
													/>
													<div>
														<h3 className="cart-item__title">{product.title}</h3>
														{product.description && (
															<p className="cart-item__description">{product.description}</p>
														)}
													</div>
												</div>
											</div>

											<div className="cart-item__footer">
												<div className="cart-stepper" aria-label={`Määrä tuotteelle ${product.title}`}>
													<button
														type="button"
														className="cart-stepper__btn"
														aria-label={`Vähennä tuotetta ${product.title}`}
														onClick={() => removeOne(product.id)}
													>
														<RemoveIcon fontSize="inherit" />
													</button>
													<span className="cart-stepper__qty">{quantity} kpl</span>
													<button
														type="button"
														className="cart-stepper__btn cart-stepper__btn--add"
														aria-label={`Lisää tuotetta ${product.title}`}
														onClick={() => addToCart(product.id)}
													>
														<AddIcon fontSize="inherit" />
													</button>
												</div>

												<div className="cart-item__prices">
													<span className="cart-item__price">{lineTotal.toFixed(2)} €</span>
													{quantity > 1 && (
														<span className="cart-item__unit-price">
															{Number(product.price).toFixed(2)} € / kpl
														</span>
													)}
												</div>
											</div>
										</li>
									);
								})}
							</ul>

							<div className="cart-footer">
								<div className="cart-summary">
									<span className="cart-summary__label">Yhteensä</span>
									<strong className="cart-summary__total">{totalPrice.toFixed(2)} €</strong>
								</div>
								<div className="cart-footer__actions">
									<button type="button" className="cart-clear-btn" onClick={clearCart}>
										Tyhjennä
									</button>
									<button type="button" className="cart-checkout-btn" onClick={onClose}>
										Jatka tilaukseen
									</button>
								</div>
							</div>
						</>
					) : (
						<div className="cart-empty">
							<div className="cart-empty__icon" aria-hidden="true">
								<ShoppingCartOutlinedIcon fontSize="large" />
							</div>
							<h3>Ostoskori on tyhjä</h3>
							<p>Lisää tuotteita valikoimasta nähdäksesi ne täällä.</p>
							<button type="button" className="cart-checkout-btn" onClick={onClose}>
								Selaa tuotteita
							</button>
						</div>
					)}
				</Box>
			</Modal>
		</>
	);
}
