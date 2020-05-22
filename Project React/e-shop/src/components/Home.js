import React, { useState, useEffect } from 'react';
import ProductIndexPreview from '../components/ProductIndexPreview'
import '../style/Home.css';
import Static from '../services/Static'

function Home() {

    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchCategorys();
    }, [])

    const fetchProducts = async () => {
        var categoryId = sessionStorage.getItem('categoryId');
        var link = Static.getServerLink() + 'api/GetAllProducts';
        
        if(categoryId !== null)
            link += '?categoryId=' + categoryId;

        sessionStorage.removeItem('categoryId');

        const data = await fetch(link);

        const products = await data.json();

        setProducts(products);
    }

    const fetchCategorys = async () => {
        var link = Static.getServerLink() + 'api/GetCategorys';

        const categoryData = await fetch(link);

        const categorys = await categoryData.json();

        setCategorys(categorys);
    }

    function showProducts() {
        var elements = [];
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

    function refreshWithFilters() {
        sessionStorage.setItem('categoryId', document.getElementById('selectCategory').value);
        window.location.reload();
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
                                        <input className='filterInput' type='text'></input>
                                    </div>
                                -
                                    <div className='filterDiv'>
                                        <input className='filterInput' type='text'></input>
                                    </div>
                                </div>
                            </div>
                            <select id='selectCategory' className="form-control placeholder">
                                <option value="">Select category</option>
                                {
                                    showCategorys()
                                }
                            </select>
                            <button id='refreshBtn' className='btn btn-success' onClick={e => refreshWithFilters()}>Refresh</button>
                        </div>
                    </div>
                    <div className='col-sm-8'>
                        <div>
                            <input id='search' type="text" name="search" placeholder="Search.." /><br />
                            {
                                Static.checkPermision(
                                    "AddNewProduct",
                                    <button className='btn btn-primary'>Add new product</button>
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
