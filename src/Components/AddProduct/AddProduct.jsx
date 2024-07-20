import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        old_price: "",
        new_price: "",

    });
    const addProduct = async () => {
        console.log(productDetails)
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,

        }).then((res) => res.json()).then((data) => {
            responseData = data
        });


        if (responseData.success) {
            product.image = responseData.image_url;

            console.log(product);

            await fetch('http://localhost:4000/add-product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then(res => res.json()).then((data) => {
                data.success ? alert("Add Product Successfully!") : alert("Fail to Add Product!")
            })
        }

    }

    const changeHandle = (e) => {
        setProductDetails({
            ...productDetails, [e.target.name]: e.target.value
        });
    }

    const imageHandle = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className="add-product">
            <div className='add-product-item-field'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandle} type='text' name='name' placeholder='Enter product title...' />
            </div>

            <div className='add-product-price'>
                <div className='add-product-item-field'>
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandle} type='text' name='old_price' placeholder='Enter old price...' />
                </div>

                <div className='add-product-item-field'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandle} type='text' name='new_price' placeholder='Enter new price...' />
                </div>

            </div>

            <div className='add-product-item-field'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandle} className='add-product-selector' name='category'>
                    <option value="" hidden>Choose category</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>

            </div>

            <div className='add-product-item-field'>
                <label htmlFor='file-input'>
                    <img className='add-product-thumbnail-img' src={image ? URL.createObjectURL(image) : upload_area} alt='Upload Area' />
                </label>

                <input onChange={imageHandle} hidden type='file' name='image' id='file-input' />
            </div>
            <button onClick={addProduct} className='add-product-btn'>Add Product</button>
        </div>
    )
}

export default AddProduct