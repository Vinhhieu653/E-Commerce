import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon_for_sortby from '../Components/Assets/dropdown_icon_for_sortby.png'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {

    const { all_product } = useContext(ShopContext);

    return (
        <div className='shop-category'>
            <img className='shop-category-banner' src={props.banner} alt='Banner' />
            <div className='shop-category-indexSort'>
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className='shop-category-sort'>
                    Sort by <img src={dropdown_icon_for_sortby} alt='drop down icon' />
                </div>
            </div>
            <div className='shop-category-products'>
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price} />
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className='shop-category-load-more'>
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory