import React, { useState, useEffect } from 'react';
import '../style/UserManagment.css';
import Static from '../services/Static'
import { faHome, faShoppingBag, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function OrdersPreview() {

    var [products, setProducts] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])


    const fetchOrders = async () => {
        var link = Static.getServerLink() + 'api/GetAllOrders';
        const data = await fetch(link);
        
        const products = await data.json();

        setProducts(products);
    }

    function showDetails(id){
        var tittle = document.getElementById(id).getAttribute('tittle');
        var img = document.getElementById(id).getAttribute('photo');
        var adress = document.getElementById(id).getAttribute('adress');
        var phone = document.getElementById(id).getAttribute('phone');
        var email = document.getElementById(id).getAttribute('email');
        Swal.fire({
            title: tittle,
            html: 
                '<img src="'+img+'"></img><br/><br/>'+
                '<label>Order adress:</label><br/>'+
                '<h5>'+adress+'</h5>'+
                '<label>Phone number:</label><br/>'+
                '<h5>'+phone+'</h5>'+
                '<label>E-mail:</label>'+
                '<h5>'+email+'</h5><br/>',
          })
    }

    function formatDate(date){
        var dt = new Date(date);
        return (dt.toString().split('GMT')[0]);
    }

    function showMyProducts() {
        var elements = [];
        var elementsHistory = [];
        if (products.length > 0) {
            for (var product of products) {
                elements.push(
                    <tr>
                        <td>{product.tittle}</td>
                        <td>{product.price}$</td>
                        <td>{formatDate(product.orderDate)}</td>
                        <td>
                            <button className='btn btn-sm btn-primary UserManagmentBtn' 
                            id={product.orderID+"ID"}
                            tittle={product.tittle} 
                            photo={product.photo} 
                            adress={product.adress} 
                            phone={product.phone} 
                            email={product.email}
                            value={product.orderID+"ID"}
                            onClick={e =>showDetails(e.target.value)}>
                                Details
                            </button>
                        </td>
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
                        <h3  className='in_cart_tittle'>Orders</h3>
                        <div className='in_cart_elements'>   
                        <table id='ordersTable'>
                            <tr>
                                <th>Product tittle</th>
                                <th>Total cost</th>
                                <th>Order date</th>
                                <th></th>
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

export default OrdersPreview;
