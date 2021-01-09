import React, { useState, useEffect } from 'react';
import '../style/UserManagment.css';
import Static from '../services/Static'
import { faHome, faShoppingBag, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function CartPreview() {

    var [products, setProducts] = useState([]);

    useEffect(() => {
        fetchMyProducts();
    }, [])

    const deleteProduct = async (id, e) => {
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
        }).then(fetchMyProductsAfterDelete());
    }

    function orderProduct(reservationID){
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
          }).queue([
            {
              title: 'Adress',
              text: 'Enter your home adress'
            },
            {
              title: 'Contact',
              text: 'Enter your phone number'
            },
            {
              title: 'E-mail',
              text: 'Enter your e-mail adress'
            },
          ]).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'All done!',
                    confirmButtonText: 'Go back'
                  }).then(()=>{
                    placeAorder(reservationID, result.value[0],  result.value[1], result.value[2])
                  });
            }
          })
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
        }).then(response => response.json()).then(response => setProducts(response) & reloadProducts());
    }

    function reloadProducts(){
        window.location.reload(false);
    }

    const placeAorder = async(reservedID, adress, phone, e_mail)=>{
        var link = Static.getServerLink() + 'api/AddToOrders?reservedID=' + reservedID + '&adress=' + adress + '&phone=' + phone + '&e_mail=' + e_mail;

        if(adress.length >0 && phone.length>0 && e_mail.length>0){
            await fetch(link).then(
                window.location.reload()
            );
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all information and try again!',
              })
        }
    }

    function checkIfOrdered(product, elements, elementsHistory) {
        if (product.ordered == false) {
            elements.push(
                <div className='productDiv' key={product.reservedID}>
                    {
                    <div>
                        <h5 id='productTittle'> {product.tittle}</h5>
                        <img className='CartProdImg' src={product.photo}></img>
                        <br />
                        <h5>{product.price}$</h5>
                        <h6>{product.amount} in cart</h6>
                        <button value={product.reservedID} className='btn btn-sm btn-warning UserManagmentBtn'
                        onClick={e => orderProduct(product.reservedID)}>
                            Order
                                </button>
                        <button value={product.reservedID} className='btn btn-sm btn-danger UserManagmentBtn'
                            onClick={e => deleteProduct(e.target.value, e)}>
                            Delete
                        </button>
    
                    </div>
                    }
                </div>
            );
        } else {
            elementsHistory.push(
                <div className='productDiv' key={product.reservedID}>
                    {
                    <div>
                        <h5 id='productTittle'> {product.tittle}</h5>
                        <img className='CartProdImg' src={product.photo}></img>
                        <br />
                        <h5>{product.price}$</h5>
                        <h6>{product.amount} items are ordered</h6>
                        <h6>Total price is {product.price*product.amount} $</h6>
    
                    </div>
                    }
                </div>
            );
        }
    }

    function showMyProducts() {
        var elements = [];
        var elementsHistory = [];
        if (products.length > 0) {
            for (var product of products) {
                checkIfOrdered(product, elements, elementsHistory)
               
            }
            return (
                <div id='productRow' className='row' >
                    <div className='col-sm-6 '>
                        <h3  className='in_cart_tittle'>Ready to order</h3>
                        <div className='in_cart_elements'>    
                            {
                                elements
                            }
                        </div>
                    </div>
                    <div className='col-sm-6 '>
                        <h3 className='in_cart_tittle'>Orders history</h3>
                        <div className='in_cart_elements'>    
                            {
                                elementsHistory
                            }
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

export default CartPreview;
