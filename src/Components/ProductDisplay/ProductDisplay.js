import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {

    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='product-display'>
            <div className='product-display-left'>
                <div className='product-display-img-list'>
                    <img src={product.image} alt='product img' />
                    <img src={product.image} alt='product img' />
                    <img src={product.image} alt='product img' />
                    <img src={product.image} alt='product img' />

                </div>
                <div className='product-display-image'>
                    <img className='product-display-main-img' src={product.image} alt='product img' />
                </div>
            </div>

            <div className='product-display-right'>
                <h1>{product.name}</h1>
                <div className='product-display-right-star'>
                    <img src={star_icon} alt='stars' />
                    <img src={star_icon} alt='stars' />
                    <img src={star_icon} alt='stars' />
                    <img src={star_icon} alt='stars' />
                    <img src={star_dull_icon} alt='stars-dull' />
                    <p>(122)</p>
                </div>
                <div className='product-display-right-prices'>
                    <div className='product-display-right-prices-old'>
                        ${product.old_price}
                    </div>

                    <div className='product-display-right-prices-new'>
                        ${product.new_price}
                    </div>
                </div>
                <div className='product-display-right-description'>
                    <p>This is a high-quality product that is perfect for anyone looking for a reliable and durable solution. With its sleek design and advanced features, this product is sure to exceed your expectations.</p>
                </div>
                <div className='product-display-right-size'>
                    <h1>Select Size</h1>
                    <div className='product-display-right-sizes'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>

                <button onClick={() => { addToCart(product.id) }}>Add to cart</button>
                <p className='product-display-right-category'>
                    <span>Category: </span> Women, T-Shirt, Crop Top
                </p>
                <p className='product-display-right-category'>
                    <span>Tags: </span> Modern, Latest
                </p>
            </div>

        </div>
    )
}

export default ProductDisplay