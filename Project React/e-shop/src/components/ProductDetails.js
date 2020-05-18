import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css';
import EditPhoto from '../icons/addphoto.png';
import Statics from '../services/Static';
import { Link } from 'react-router-dom';

function ProductDetails(props) {

    var props = props.location.productProps;
    var id;

    const [product, setProduct] = useState();
    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState('');

    function onCancel() {
        window.location.reload();
    }

    function onEdit() {
        document.getElementById('tittle').style.display = "none";
        document.getElementById('description').style.display = "none";
        document.getElementById('btnEdit').style.display = "none";
        document.getElementById('img').style.display = "none";
        document.getElementById('price').style.display = "none";
        document.getElementById('btnOrder').style.display = "none";

        document.getElementById('editTittle').style.display = "initial";
        document.getElementById('editDescription').style.display = "block";
        document.getElementById('btnUpdate').style.display = "initial";
        document.getElementById('btnCancel').style.display = "initial";
        document.getElementById('editImg').style.display = "block";
        document.getElementById('editPriceTxt').style.display = "block";
        document.getElementById('editPrice').style.display = "initial";

    }

    function onUpdate() {
        var product = {};
        product['tittle'] = tittle;
        product['description'] = description;
        product['price'] = price;
        product['photo'] = photo;

        console.log(JSON.stringify(product));
    }

    function setDefaultValues(response) {
        var product = response;
        if (product !== undefined) {
            setTittle(product[0].tittle);
            setDescription(product[0].description);
            setPrice(product[0].price);
            setPhoto(product[0].photo);
        }
    }

    function openFileDialog(accept, callback) {

        var inputElement;
        // Create an input element
        inputElement = document.createElement("input");

        // Set its type to file
        inputElement.type = "file";

        // Set accept to the file types you want the user to select. 
        inputElement.accept = ".jpg, .png";

        // set onchange event to call callback when user has selected file
        inputElement.addEventListener("change", callback)

        // dispatch a click event to open the file dialog
        inputElement.dispatchEvent(new MouseEvent("click"));

        //On image loaded set image in <img> tag and convert image to base64
        inputElement.onchange = function (event) {
            if (this.files && this.files[0]) {

                var FR = new FileReader();

                FR.addEventListener("load", function (e) {
                    document.getElementById("editImg").src = e.target.result;
                    setPhoto(e.target.result);
                });

                FR.readAsDataURL(this.files[0]);
            }
        }
    }

    function showProduct() {
        if (product !== undefined) {
            return (
                <>
                    <div className='row'>
                        <div className='col-sm'>
                            <div>
                                <h1 id='tittle'>{product[0].tittle} </h1>
                                <p id='description'>{product[0].description}</p>
                                {
                                    Statics.checkPermision(
                                        'EditProduct',
                                        <button id='btnEdit' className='btn btn-warning' onClick={e => onEdit()}>Edit</button>
                                    )
                                }
                                <textarea id='editTittle' style={{ display: "none" }} defaultValue={product[0].tittle} onChange={event => setTittle(event.target.value)}></textarea>
                                <textarea id='editDescription' style={{ display: "none" }} defaultValue={product[0].description} onChange={event => setDescription(event.target.value)}></textarea>
                                <button id='btnUpdate' style={{ display: "none" }} className='btn btn-primary buttonsEdit' onClick={e => onUpdate()}>Update</button>
                                <button id='btnCancel' style={{ display: "none" }} className='btn btn-warning buttonsEdit' onClick={e => onCancel()}>Cancel</button>
                            </div>
                        </div>
                        <div className='col-sm'>
                            <div>
                                <img id='img' src={product[0].photo} alt='Not found' />
                                <h4 id='price'>{product[0].price}$</h4>
                                <button id='btnOrder' className='btn btn-sm btn-success'>Order item</button>

                                <img id='editImg' style={{ display: "none" }} src={EditPhoto} alt='Not found' onClick={e => openFileDialog()} />
                                <h4 id='editPriceTxt' style={{ display: "none" }} >Price:</h4>
                                <textarea id='editPrice' style={{ display: "none" }} defaultValue={product[0].price} onChange={event => setPrice(event.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
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
        var link = Statics.getServerLink()+'api/GetProduct?ID=' + id;
        const data = await fetch(link).then(response => response.json())
            .then(
                response => setProduct(response) & setDefaultValues(response)
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