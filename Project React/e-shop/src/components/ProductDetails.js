import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css';
import EditPhoto from '../icons/addphoto.png';
import Statics from '../services/Static';

function ProductDetails(props) {

    var props = props.location.productProps;
    var id;

    const [productId, setProductId] = useState();
    const [product, setProduct] = useState();
    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [photo, setPhoto] = useState('');
    const [categorys, setCategorys] = useState([]);

    function onCancel() {
        window.location.reload();
    }

    function checkIfProductIsAvaliable(block) {
        if (product !== null) {
            if (product[0].amount > 0) {
                return block;
            } else {
                return (
                    <h5 id='outOfStock'>Product is out of stock.</h5>
                )
            }
        }
    }
    function showProductAmount() {
        if (product !== null) {
            var elements = [];
            var i = product[0].amount;

            for (; i > 0; i--) {
                elements.push(
                    <option key={i} value={i}>{i}</option>
                );
            }
            return (
                elements
            );
        }
    }

    function onEdit() {
        document.getElementById('tittle').style.display = "none";
        document.getElementById('description').style.display = "none";
        document.getElementById('btnEdit').style.display = "none";
        document.getElementById('img').style.display = "none";
        document.getElementById('price').style.display = "none";
        document.getElementById('orderStockDiv').style.display = "none";
        document.getElementById('categoryDiv').style.display = "none";

        document.getElementById('editTittle').style.display = "initial";
        document.getElementById('editDescription').style.display = "block";
        document.getElementById('btnUpdate').style.display = "initial";
        document.getElementById('btnCancel').style.display = "initial";
        document.getElementById('editImg').style.display = "block";
        document.getElementById('editPriceTxt').style.display = "block";
        document.getElementById('editPrice').style.display = "initial";
        document.getElementById('editAmountTxt').style.display = "initial";
        document.getElementById('editAmount').style.display = "initial";
        document.getElementById('selectCategory').style.display = "initial";

    }

    const onUpdate = async (e) => {
        e.preventDefault();

        var product = {
            'productId': productId,
            'tittle': tittle,
            'description': description,
            'price': price,
            'amount': amount,
            'category': document.getElementById('selectCategory').value,
            'photo': photo
        };

        var link = Statics.getServerLink() + 'api/EditProduct';

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
                product
            )
        }).then(response => response.json()).then(response =>refreshThePage(response));
    }

    function refreshThePage(productId){
        localStorage.setItem('lastProduct', productId);

        window.location.reload();
    }

    function setDefaultValues(response) {
        var product = response;
        if (product !== undefined) {
            setProductId(product[0].productId);
            setTittle(product[0].tittle);
            setDescription(product[0].description);
            setPrice(product[0].price);
            setAmount(product[0].amount);
            setPhoto(product[0].photo);
        }
    }

    function showCategorys() {
        var elements = [];
        for (var category of categorys) {
            elements.push(
                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
            );
        }
        return (
            elements
        );
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
                                        <div>
                                            <button id='btnEdit' className='btn btn-warning' onClick={e => onEdit()}>Edit</button>
                                            <textarea id='editTittle' style={{ display: "none" }} defaultValue={product[0].tittle} onChange={event => setTittle(event.target.value)}></textarea>
                                            <textarea id='editDescription' style={{ display: "none" }} defaultValue={product[0].description} onChange={event => setDescription(event.target.value)}></textarea>
                                            <button id='btnUpdate' style={{ display: "none" }} className='btn btn-primary buttonsEdit' onClick={e => onUpdate(e)}>Update</button>
                                            <button id='btnCancel' style={{ display: "none" }} className='btn btn-warning buttonsEdit' onClick={e => onCancel()}>Cancel</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-sm'>
                            <div>
                                <select defaultValue={product[0].categoryId} id='selectCategory' style={{ display: "none" }} className="form-control placeholder">
                                    {
                                        showCategorys()
                                    }
                                </select>
                                <div id='categoryDiv'>
                                    <h4>Category: </h4><h5>{product[0].categoryName}</h5>
                                </div>
                                <img id='img' src={product[0].photo} alt='Not found' />
                                <h4 id='price'>{product[0].price}$</h4>

                                <div id='orderStockDiv'>
                                    {
                                        checkIfProductIsAvaliable(
                                            <div id='orderDiv'>
                                                <select id='selectAmount' className=" placeholder">
                                                    <option value="">Select amount</option>
                                                    {
                                                        showProductAmount()
                                                    }
                                                </select>
                                                <button id='btnOrder' className='btn btn-sm btn-success'>Order item</button>
                                            </div>
                                        )
                                    }
                                </div>

                                <img id='editImg' style={{ display: "none" }} src={EditPhoto} alt='Not found' onClick={e => openFileDialog()} />
                                <h4 id='editPriceTxt' style={{ display: "none" }} >Price:</h4>
                                <textarea id='editPrice' style={{ display: "none" }} defaultValue={product[0].price} onChange={event => setPrice(event.target.value)}></textarea>
                                <br />
                                <h4 id='editAmountTxt' style={{ display: "none" }} >Amount:</h4>
                                <br />
                                <textarea id='editAmount' style={{ display: "none" }} defaultValue={product[0].amount} onChange={event => setAmount(event.target.value)}></textarea>
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
        fetchCategorys();
    }, [])

    const fetchCategorys = async () => {
        var link = Statics.getServerLink() + 'api/GetCategorys';

        const categoryData = await fetch(link);

        const categorys = await categoryData.json();

        setCategorys(categorys);
    }

    const fetchProduct = async () => {
        var link = Statics.getServerLink() + 'api/GetProduct?ID=' + id;
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