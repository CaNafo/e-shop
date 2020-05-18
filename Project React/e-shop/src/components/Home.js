import React, { useState, useEffect } from 'react';
import ProductIndexPreview from '../components/ProductIndexPreview'
import '../style/Home.css';
import Static from '../services/Static'

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        var link = Static.getServerLink()+'api/GetAllProducts';

        const data = await fetch(link);

        const products = await data.json();

        setProducts(products);
    }

    function showProducts() {
        var elements = [];
        for (var product of products) {
            elements.push(
                <ProductIndexPreview key={product.id}
                    tittle={product.tittle}
                    photo={product.photo}
                    price={product.price}
                    id = {product.id}
                />
            );
        }
        return (
            elements
        );
    }

    return (
        <div>
            <div className='containerStyle container'>
                <div className='row'>
                    <div className='col-sm-2 columnStyle'>
                        <div className='filtersStyle'>
                            <p>Nesto</p>
                            <p>Nesto</p>
                            <p>Nesto</p>
                            <p>Nesto</p>
                        </div>
                    </div>
                    <div className='col-sm-10'>
                        <div>
                            <input id='search' type="text" name="search" placeholder="Search.." /><br />
                            {
                                Static.checkPermision(
                                    "AddNewProduct",
                                    <button className='btn btn-primary'>Add new product</button>
                                )
                            }
                            <div id='ProductContainer' className='container'>
                                <div id='productRow' className='row' >
                                    {
                                        showProducts()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
