import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css'

function ProductDetails(props) {

    var props = props.location.productProps;
    var id;

    const [product, setProduct] = useState();

    function showProduct() {
        if (product !== undefined)
            return (
                <>
                    <div className='row'>
                        <div className='col-sm'>
                            <div>
                                <h1>{product[0].tittle} </h1>
                                <p>{product[0].description}</p>
                            </div>
                        </div>
                        <div className='col-sm-2'>
                            <div>
                                <img src={product[0].photo} alt='Not found' />
                                <h4>{product[0].price}$</h4>
                                <button className='btn btn-sm btn-success'>Order item</button>
                            </div>
                        </div>
                    </div>
                </>
            )
    }

    useEffect(() => {
        if (props !== undefined) {
            id = props.id;
            localStorage.setItem('lastProduct', id);
        } else {
            id = localStorage.getItem('lastProduct');
        }
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        const data = await fetch('http://localhost:57703/api/GetProduct?ID=' + id).then(response => response.json())
            .then(
                response => setProduct(response)
            );
    }

    return (
        <div className='container productContainer'>
            {
                showProduct()
            }
        </div>
    );
}


export default ProductDetails;