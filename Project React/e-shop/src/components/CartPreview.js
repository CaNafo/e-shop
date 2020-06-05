import React, { useState, useEffect } from 'react';
import '../style/UserManagment.css';
import Static from '../services/Static'

function CartPreview() {

    var [products, setProducts] = useState([]);

    useEffect(() => {
        fetchMyProducts();
    }, [])

    const deleteProduct = async (id,e) => {
        e.preventDefault();
        var reservation = {
            'ID': id
        };

        var link = Static.getServerLink() + 'api/DeleteReservation';

        await fetch(link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:57703/',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(
                reservation
            )
        }).then(fetchMyProductsAfterDelete() );
    }

    const fetchMyProducts = async () => {

        var user = {
            'ID': Static.getUser().id
        };

        var link = Static.getServerLink() + 'api/GetMyProducts';

        await fetch(link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:57703/',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(
                user
            )
        }).then(response => response.json()).then(response => setProducts(response));
    }
    
    const fetchMyProductsAfterDelete = async () => {
        
        var user = {
            'ID': Static.getUser().id
        };

        var link = Static.getServerLink() + 'api/GetMyProducts';

        await fetch(link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:57703/',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(
                user
            )
        }).then(response => response.json()).then(response => setProducts(response) & window.location.reload());
    }

    function showMyProducts() {
        var elements = [];
        if (products.length > 0) {
            for (var product of products) {
                elements.push(
                    <div className='productDiv' key={product.reservedID}>
                        <div>
                            <h5 id='productTittle'> {product.tittle}</h5>
                            <img className='CartProdImg' src={product.photo}></img>
                            <br/>
                            <h5>{product.price}$</h5>
                            <h6>{product.amount} in cart</h6>
                            <button value={product.reservedID} className='btn btn-sm btn-danger UserManagmentBtn'
                                onClick={e => deleteProduct(e.target.value, e)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            }
            return (
                <div id='productRow' className='row' >
                    {
                        elements
                    }
                </div>
            );
        }
    }

    return (
        <div className='UserManagmentContainer'>
            <div>
                <h2>Cart</h2>
                {
                    showMyProducts()
                }
            </div>
        </div>
    );
}

export default CartPreview;
