import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {

    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)

    return (
        <div className='cart-items'>
            <div className='cart-items-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {all_product.map((product) => {
                const quantity = cartItems[product.id];
                if (quantity > 0) {
                    return (
                        <div key={product.id}>
                            <div className='cart-items-format cart-items-format-main'>
                                <img src={product.image} alt='cart-item' className='cart-items-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <button className='cart-items-quantity'>{quantity}</button>
                                <p>${product.new_price * quantity}</p>
                                <img className='cart-items-remove-icon' onClick={() => { removeFromCart(product.id) }} src={remove_icon} alt='remove' />

                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            <div className='cart-items-down'>
                <div className='cart-items-total'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cart-items-total-item'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-items-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cart-items-total-item'>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>

                    </div>
                    <button>Proceed To Checkout</button>
                </div>
                <div className='cart-items-promo-code'>
                    <p>If you have a promo code, Enter here</p>
                    <div className='cart-items-promo-box'>
                        <input type='text' placeholder='Enter Promo Code'></input>
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems