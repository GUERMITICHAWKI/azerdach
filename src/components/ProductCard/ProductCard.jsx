import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const data =  JSON.parse(localStorage.getItem('data'))
  console.log("data product 1" , data.Nom_boutique)
  const handelClick = () => {
    router(`/${data.Nom_boutique}/product`, { state: { productId: productItem._id } });
  };

  const handelAdd = (productToAdd) => {
    const data = {
      id_produit : productToAdd?._id, 
      Nom_produit : productToAdd?.Nom_produit , 
      Prix : productToAdd?.Prix , 
      image_url : productToAdd?.image_url , 
      quantity :  1 , 
      Description : productToAdd?.Description
    }
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    console.log(existingProducts)
    const existingProductIndex = existingProducts.findIndex(product => product.id_produit === productToAdd._id);
    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex].quantity += 1;
    } else {
      existingProducts.push(data);
    }
      localStorage.setItem('products', JSON.stringify(existingProducts));
      toast.success("Product has been added to cart!");

  };


  
  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {/* {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null} */}
      <img
        loading="lazy"
        onClick={() => {
          handelClick()}}
        src={"http://localhost:2000/product/" + productItem.image_url[0]}
        alt="image-produit"
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.Nom_produit}</h3>
        <div className="price">
          <h4>TND-{productItem.Prix}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
