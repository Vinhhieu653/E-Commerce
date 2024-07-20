import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='description-box'>
            <div className='description-box-navigator'>
                <div className='description-box-nav-box'>Description</div>
                <div className='description-box-nav-box fade'>Review (122)</div>
            </div>
            <div className='description-box-description'>
                <p>Our product is a cutting-edge solution for modern businesses.
                    It offers a wide range of features designed to streamline operations,
                    increase efficiency, and promote growth. With our intuitive interface
                    and robust functionality, you will be able to manage your business with
                    ease and confidence. Try it out today and experience the difference for
                    yourself!
                </p>

                <p>Our product is a powerful and user-friendly tool designed to help businesses
                    of all sizes manage their operations more efficiently. With its intuitive
                    interface and robust functionality, you will be able to streamline your
                    workflow, increase productivity, and make data-driven decisions with confidence.
                    Try it out today and see the difference it can make for your business!</p>
            </div>
        </div>
    )
}

export default DescriptionBox