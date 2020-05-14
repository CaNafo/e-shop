import React from 'react';
import ProductIndexPreview from '../components/ProductIndexPreview'
import '../style/Home.css';
import { Container, Row, Col, FormGroup } from 'react-bootstrap';

function Home() {
    let state = {
        postArray: [
            { tittle: "Naslov", price: "500$" },
            { tittle: "Naslov", price: "500$" }
        ]
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
                        <form>
                            <input type="text" name="search" placeholder="Search.." /><br />
                            <div id='ProductContainer'>
                                {
                                    state.postArray.map((post, index) => {
                                        return (
                                            <ProductIndexPreview
                                                tittle={post.tittle}
                                                price={post.price}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
