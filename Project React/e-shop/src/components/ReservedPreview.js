import React, { useState, useEffect } from 'react';
import '../style/UserManagment.css';
import Static from '../services/Static'
import { faHome, faShoppingBag, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ReservedPreview() {

    var [products, setProducts] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])


    const fetchOrders = async () => {
        var link = Static.getServerLink() + 'api/GetAllReserved';
        const data = await fetch(link);
        
        const products = await data.json();

        setProducts(products);
    }

    function showMyProducts() {
        var elements = [];
        var elementsHistory = [];
        if (products.length > 0) {
            for (var product of products) {
                elements.push(
                    <tr>
                        <td>{product.user}</td>
                        <td>{product.userEmail}</td>
                        <td>{product.tittle}</td>
                        <td>{product.price}$</td>                        
                    </tr>
                    /*<div className='productDiv' key={product.orderID}>
                        {
                        <div>
                            <h5 id='productTittle'> {product.tittle}</h5>
                            <img className='CartProdImg' src={product.photo}></img>
                            <br />
                            <h5>Total: {product.price}$</h5>
                        </div>
                        }
                    </div>*/
                );               
            }
            return (
                <div id='productRow' className='row' >
                    <div className='col-sm-6 '>
                        <h3  className='in_cart_tittle'>Reservations</h3>
                        <div className='in_cart_elements'>   
                        <table id='ordersTable'>
                            <tr>
                                <th>Reserved by</th>
                                <th>User e-mail</th>
                                <th>Product tittle</th>
                                <th>Total cost</th>
                            </tr>
                            {
                                elements
                            }
                        </table> 
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='UserManagmentContainer'>
            <div>
            <FontAwesomeIcon icon={faShoppingBasket}  size='4x' color='thistle' className='cart_icon'/>
                <div id='productsDiv'>
                    {
                        showMyProducts()
                    }
                </div>

            </div>
        </div>
    );
}

export default ReservedPreview;
