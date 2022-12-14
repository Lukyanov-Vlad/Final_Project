import { Link, useNavigate } from "react-router-dom";
import cartStore from "../../../../../stores/CartStore/CartStore";

export const CatalogItem = ({ product }) => {

    const navigate = useNavigate();
    const { addToCart } = cartStore;
    const { id, title, price, image } = product;

    const clickForAddedToCart = () => {
        addToCart(product);
    }
    return (
        <div className="catalog_item">
            <Link to={`./${id}`} className="catalog_item_img">
                <img src={image} alt={title} />
            </Link>
            <div className="catalog_item_options">
                <div className="catalog_item_options_price">
                    {price} $
                </div>
                <button className="catalog_item_options_btn" onClick={clickForAddedToCart}>В корзину</button>
            </div>
        </div>
    )
}