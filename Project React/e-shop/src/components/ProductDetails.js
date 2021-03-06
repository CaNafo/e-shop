import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css';
import EditPhoto from '../icons/addphoto.png';
import Statics from '../services/Static';
import '../style/Spinner.css';
import ProfileImg from '../icons/profile.png';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

    var [comments, setComments] = useState([]);


    function onCancel() {
        window.location.reload();
    }


    function hideLoader(){
        try{
            document.getElementById('newsLoader').style.display = 'none';
        }catch (e){
            
        }
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

        Statics.setInputFilter(document.getElementById('editPrice'), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });

        Statics.setInputFilter(document.getElementById('editAmount'), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });

    }

    const onUpdate = async (e) => {
        e.preventDefault();

        var product = {
            'productId': productId,
            'tittle': tittle,
            'description': description,
            'price': price,
            'amount': parseInt(amount),
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
        }).then(response => response.json()).then(response => refreshThePage(response));
    }

    function refreshThePage(productId) {
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

    const addToCart = async () => {
        
        if (document.getElementById('selectAmount').selectedIndex !== 0) {
            var link = Statics.getServerLink() + 'api/AddToCart?ID=' + Statics.getUser().id + '&prodID=' + productId + '&amount=' + parseInt(document.getElementById('selectAmount').value);

            Swal.fire({
                icon: 'info',
                title: 'Confirmation',
                text: 'Do you want to add to cart a choosen amount of this product?',
                showCancelButton: true,
                confirmButtonText: `Add to cart`,
                cancelButtonText: `Don\'t add`,

              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Successfully added!', '', 'success').then(()=>{
                        addProduct(link);
                    })
                }
              })
            /*
            await fetch(link).then(
                window.location.reload()
            );*/
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please choose amount you want to order!',
              })
        }
    }
  const addProduct = async(link) => {
        await fetch(link).then(
                window.location.reload()
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

    function getComments(){
        if(comments != undefined){
            var elements = [];
            for (var comment of comments) {
                if(sessionStorage.getItem('guest') == 'null' && comment.userID == Statics.getUser().id){
                    elements.push(
                        <>                        
                        <div className="comment_container darker">
                            <img src={ProfileImg} alt="Avatar" className="right" style={{width:100+"%"}}/>
                            <p className='comment_name_right'>{comment.user}</p>
                            <p className="right">{comment.text}</p>
                        </div>
                        </>
                    );
                }else{
                    elements.push(
                        <>
                        <div className="comment_container">
                            <img src={ProfileImg} alt="Avatar" style={{width:100+"%"}}/>
                            <p className='comment_name_left'>{comment.user}</p>
                            <p className='left'>{comment.text}</p>
                        </div>
                        </>
                    );
                }
            }
            return (
                elements
            );
        }
    }

    function showProduct() {
        if (product !== undefined) {
            hideLoader();
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
                                        Statics.checkPermision(
                                            'AddToCart',
                                            checkIfProductIsAvaliable(
                                                <div id='orderDiv' >
                                                    <select id='selectAmount' className=" placeholder">
                                                        <option value="">Select amount</option>
                                                        {
                                                            showProductAmount()
                                                        }
                                                    </select>
                                                    <button id='btnOrder' className='btn btn-sm btn-success' onClick={e => addToCart(product[0].id)}>Add to cart</button>
                                                </div>
                                            )

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
        fetchComments();

    }, [])

    const fetchComments = async()=>{
        var link = Statics.getServerLink() + 'api/GetCommentsOfProduct?productID=' + id;
        const data = await fetch(link).then(response => response.json())
            .then(
                response => setComments(response)
            );
    }

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

    function showComments(){
        document.getElementById('divProduct').style.display = 'none';
        document.getElementById('divComments').style.display = 'block';

        document.getElementById('btnProduct').classList.add('btnProductNotActive');
        document.getElementById('btnProduct').classList.remove('btnProduct');
        document.getElementById('btnComment').classList.add('btnCommentActive');
        document.getElementById('btnComment').classList.remove('btnComment');
    }

    function hideComments(){
        document.getElementById('divProduct').style.display = 'block';
        document.getElementById('divComments').style.display = 'none';
        document.getElementById('btnProduct').classList.remove('btnProductNotActive');
        document.getElementById('btnProduct').classList.add('btnProduct');
        document.getElementById('btnComment').classList.remove('btnCommentActive');
        document.getElementById('btnComment').classList.add('btnComment');
    }

    const addComment = async()=>{
        let commentText = document.getElementById('styled').value + "";
        let commentsBody = document.getElementById('commentsBody');
        if(commentText.length > 0){
            var link = Statics.getServerLink() + 'api/AddComment?userID='+(Statics.getUser().id)+"&productID="+product[0].productId+"&text="+commentText;
            const data = await fetch(link);
            commentsBody.innerHTML+='<div class="comment_container darker">'+
            '<img src=\''+ProfileImg+'\'alt="Avatar" class="right" style={{width:100+"%"}}/>'+
            '<p class=\'comment_name_right\'>'+Statics.getUser().firstName+' '+Statics.getUser().lastName+'</p>'+
            '<p class="right">'+commentText+'</p>'+
            '</div>';
            
            document.getElementById('styled').value = "";
            Swal.fire('Comment is successfully added!', '', 'success');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Comment field can\'t be ampty!',
              })
        }
    }

    function showCommentInputField(){
        if(sessionStorage.getItem('guest') == 'null'){
            return(                
            <div>
                <textarea name="styled-textarea" placeholder='Enter your comment here...' id="styled" onfocus="this.value=''; setbg('#e5fff3');" onblur="setbg('white')"></textarea>
                <button className='btn btn-primary btn_post_comment' onClick={e => addComment()}>Post</button> 
            </div>
            );
        }
    }
    
    return (
        <div>    
            <div className='tabDiv'>
                <button className='btn btnProduct' id='btnProduct' onClick={e=>hideComments()}>Product</button>
                <button className='btn btnComment' id='btnComment' onClick={e=>showComments()}>Comments</button>
            </div>
            <div className='container productContainer' id='divProduct'>
                {
                    showProduct()
                }
                <div className="loader" id='newsLoader'>Loading...</div>
            </div>
            <div className='container commentsContainer' id='divComments'>
                <div className='comments_body' id='commentsBody'>
                    
                    {
                        getComments()
                    }
                    
                </div>          
                {
                    showCommentInputField()
                }      
            </div>
        </div>
    );
}


export default ProductDetails;