import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css';
import EditPhoto from '../icons/addphoto.png';
import Statics from '../services/Static';

function AddProd(props) {

    var props = props.location.productProps;
    var id;

    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [photo, setPhoto] = useState('');
    const [categorys, setCategorys] = useState([]);

    function onCancel() {
        window.location.reload();
    }


    const onUpdate = async (e) => {
        e.preventDefault();

        var product = {
            'tittle': tittle,
            'description': description,
            'price': price,
            'amount': amount,
            'category': document.getElementById('selectCategory').value,
            'photo': photo
        };

        var link = Statics.getServerLink() + 'api/AddProduct';

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
        }).then(response => response.json()).then(response => refreshThePage(response));
    }

    function refreshThePage(productId) {
        localStorage.setItem('lastProduct', productId);

        window.location.reload();
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

    useEffect(() => {
        fetchCategorys();
    }, [])

    const fetchCategorys = async () => {
        var link = Statics.getServerLink() + 'api/GetCategorys';

        const categoryData = await fetch(link);

        const categorys = await categoryData.json();

        setCategorys(categorys);
    }

    return (
        <div className='container productContainer'>
            <div className='row'>
                <div className='col-sm'>
                    <div>
                        <h4>Tittle:</h4>
                        <textarea id='addTittle' onChange={event => setTittle(event.target.value)}></textarea><br/>
                        <h4>Description:</h4>
                        <textarea id='editDescription' onChange={event => setDescription(event.target.value)}></textarea><br/>
                        <button id='btnUpdate' className='btn btn-info buttonsEdit' >Add</button>
                        <button id='btnCancel' className='btn btn-warning buttonsEdit' >Cancel</button>
                    </div>>
                        </div>
                <div className='col-sm'>
                    <div>
                        <select id='selectCategory' className="form-control placeholder">
                            {
                                showCategorys()
                            }
                        </select>

                        <img id='editImg' src={EditPhoto} alt='Not found' onClick={e => openFileDialog()} />
                        <h4 id='addPriceTxt'  >Price:</h4>
                        <textarea id='addPrice' onChange={event => setPrice(event.target.value)}></textarea>
                        <br />
                        <h4 id='addAmountTxt'  >Amount:</h4>
                        <br />
                        <textarea id='addAmount' onChange={event => setAmount(event.target.value)}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AddProd;