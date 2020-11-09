import React, { useState, useEffect } from 'react';
import ProductIndexPreview from '../components/ProductIndexPreview';
import '../style/Home.css';
import Static from '../services/Static';
import Statics from '../services/Static';
import { Link } from 'react-router-dom';


function Home() {

    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);



    useEffect(() => {
        fetchProducts();
        fetchCategorys();
        Static.setInputFilter(document.getElementById('priceFrom'), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });

        Static.setInputFilter(document.getElementById('priceTo'), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });
    }, [])

    const fetchProducts = async () => {
        var categoryId = document.getElementById('selectCategory').value;
        if (categoryId.length === 0)
            categoryId = -1;

        var priceFrom = document.getElementById('priceFrom').value;
        if (priceFrom.length === 0)
            priceFrom = -1;

        var priceTo = document.getElementById('priceTo').value;
        if (priceTo.length === 0)
            priceTo = -1;

        var search = document.getElementById('search').value;
        if (search.length === 0)
            search = '';

        var amount = document.getElementById('amount').value;
        if (amount.length === 0)
            amount = -1;

        var link = Static.getServerLink() + 'api/GetAllProducts';

        link += '?categoryId=' + categoryId
            + '&priceFrom=' + priceFrom
            + '&priceTo=' + priceTo
            + '&name=' + search
            + '&amount=' + amount;



        const data = await fetch(link);

        const products = await data.json();

        setProducts(products);
    }

    const fetchProductsByName = async (searchContent) => {

        var link = Static.getServerLink() + 'api/GetProductWithName';

        if (searchContent.length === 0)
            searchContent = '';

        link += '?name=' + searchContent;

        await fetch(link).then(response => response.json()).then(
            response => setProducts(response) & showProducts()
        );
    }

    const fetchCategorys = async () => {
        var link = Static.getServerLink() + 'api/GetCategorys';

        const categoryData = await fetch(link);

        const categorys = await categoryData.json();

        setCategorys(categorys);
    }

    function showProducts() {
        var elements = [];
        var i = 0;
        if (products.length > 0) {
            for (var product of products) {
                elements.push(
                    <ProductIndexPreview key={product.id}
                    tittle={product.tittle}
                    photo={product.photo}
                    price={product.price}
                    id={product.id}
                    amount={product.amount}
                    />
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
    function showNews() {

    }

    function refreshWithFilters() {
        return showProducts();
    }

    return (
        <div>
            <div className='containerStyle container'>
                <div className='row'>
                    <div className='col-sm-2 columnStyle'>
                        <div>
                            <h3 id='filtersTittle'> Search filters</h3>
                            <div id='priceFilter'>
                                <br />
                                <div className='filtersStyle'>
                                    <div className='filterDiv'>
                                        <h5>From $ - To $</h5>
                                        <input id='priceFrom' className='filterInput' type='text'></input>
                                    </div>
                                -
                                    <div className='filterDiv'>
                                        <input id='priceTo' className='filterInput' type='text'></input>
                                    </div>
                                </div>
                                <div className='filterDiv'>
                                    <h5>Amount</h5>
                                    <input id='amount' className='filterInput' type='text'></input>
                                </div>
                            </div>

                            <select id='selectCategory' className="form-control placeholder">
                                <option value="">Select category</option>
                                {
                                    showCategorys()
                                }
                            </select>
                            <button id='refreshBtn' className='btn btn-success' onClick={e => fetchProducts()}>Refresh</button>
                        </div>
                    </div>
                    <div className='col-sm-8'>
                        <div>
                            <input id='search' type="text" name="search" placeholder="Search.." onChange={e => fetchProductsByName(e.target.value)} /><br />
                            {
                                Static.checkPermision(
                                    "AddNewProduct",
                                    <Link className='btn btn-primary' as={Link} to="/components/AddProd">Add new product</Link>
                                )
                            }

                            <div id='ProductContainer' className='container'>
                                {
                                    showProducts()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
