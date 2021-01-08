import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css';
import EditPhoto from '../icons/addphoto.png';
import Statics from '../services/Static';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Route, useHistory } from 'react-router-dom';

function AddProd(props) {

    var props = props.location.productProps;
    var id;
    let history = useHistory();

    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [photo, setPhoto] = useState('');
    const [categorys, setCategorys] = useState([]);
    const [categoryName, setategoryName] = useState([]);

    function onCancel() {
        window.location.reload();
    }

    const onAddCategory = async () => {
        var category = {
            'categoryName': categoryName
        };

        var link = Statics.getServerLink() + 'api/AddCategory';

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
                category
            )
        }).then(window.location.reload());
    }

    const onUpdate = async (e) => {
        e.preventDefault();

        if (tittle.length > 0 && description.length > 0 && price.length > 0 && amount.length > 0) {
            var product = {
                'tittle': tittle,
                'description': description,
                'price': price,
                'amount': amount,
                'category': document.getElementById('selectCategoryAdd').value,
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
            }).then(response => response.json()).then(response => 
                Swal.fire({
                    icon: 'success',
                    title: 'Well done',
                    text: 'Successfully added a product!',
                    showCancelButton: true,
                    confirmButtonText: `Go back`,
                    cancelButtonText: `Add more`,
    
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push('/components/home');
                    }else{
                        window.location.reload()
                    }
                  })
                );
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields!',
              })

              
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

    useEffect(() => {
        fetchCategorys();
        Statics.setInputFilter(document.getElementById('addPrice'), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });

        Statics.setInputFilter(document.getElementById('addAmount'), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });

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
                        <textarea id='addTittle' onChange={event => setTittle(event.target.value)}></textarea>
                        <select id='selectCategoryAdd' className="form-control placeholder">
                            {
                                showCategorys()
                            }
                        </select>
                        <label id='newCategoryLabel' className='newCategory'>Add new category:</label>
                        <input type='text' className='newCategory' onChange={event => setategoryName(event.target.value)}></input>
                        <button className='btn btn-sm btn-warning' onClick={e => onAddCategory()}>Add</button>
                        <h4>Description:</h4>
                        <textarea id='editDescription' onChange={event => setDescription(event.target.value)}></textarea><br />
                        <button id='btnUpdate' className='btn btn-info buttonsEdit' onClick={e => onUpdate(e)} >Add</button>
                        <button id='btnCancel' className='btn btn-warning buttonsEdit' onClick={e => onCancel()} >Cancel</button>
                    </div>
                        </div>
                <div className='col-sm'>
                    <div>


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