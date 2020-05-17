import React, { Component } from 'react';
import Static from '../services/Static'
import '../style/Home.css'
import { Link } from 'react-router-dom';

export default class ProductIndexPreview extends Component {

    render() {

        return (
            <div className='product productcol-sm-4'>
                <div >
                    <h6>{this.props.tittle}</h6>
                    <img src={this.props.photo} alt="Not found" className='photoStyle'></img>
                    <br />
                    <h5>{this.props.price}$</h5>
                    <Link to={{
                        pathname:'/components/ProductDetails',
                        productProps:{
                            id:this.props.id
                        }
                    }                    
                    } className='btn btn-sm btn-success btnDetails'>Details</Link>
                    {
                        Static.checkPermision(
                            "DeleteProduct",
                            <button className='btn btn-sm btn-danger' value={this.props.id}>Delete</button>
                            )
                    }
                </div>
            </div>
        );
    }
}


