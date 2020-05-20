import React, { Component } from 'react';
import Static from '../services/Static'
import '../style/Home.css'
import { Link } from 'react-router-dom';

export default class ProductIndexPreview extends Component {

    render() {

        const deleteProduct = async (e, id) => {
            var link = Static.getServerLink() + 'api/DeleteProduct?ID=' + id;
            await fetch(link);

            e.preventDefault();
            window.location.reload();
        }

        function redirectToDetails(id){
            document.getElementById(id).click();
        }

        return (
            <div className='product productcol-sm-4'>
                <div >
                    <h6>{this.props.tittle}</h6>
                    <img src={this.props.photo} alt="Not found" className='photoStyle' onClick={e => redirectToDetails(this.props.id)}></img>
                    <br />
                    <h5 id='productPrice'>{this.props.price}$</h5>
                    <Link id={this.props.id} to={{
                        pathname: '/components/ProductDetails',
                        productProps: {
                            id: this.props.id
                        }
                    }
                    } className='btn btn-sm btn-success btnDetails'>Details</Link>
                    {
                        Static.checkPermision(
                            "DeleteProduct",
                            <button className='btn btn-sm btn-danger' onClick={e => deleteProduct(e, this.props.id)}>Delete</button>
                        )
                    }
                </div>
            </div>
        );
    }
}


