import React, { Component } from 'react';
import Static from '../services/Static'
import '../style/Home.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class ProductIndexPreview extends Component {

    render() {

        return (
            <div className='product productcol-sm-4'>
                <div >
                    <h4>{this.props.tittle}</h4>
                    <br />
                    <img src={this.props.photo} alt="Not found" className='photoStyle'></img>
                    <br />
                    <h5>Price: {this.props.price}$</h5>
                    <Link to={{
                        pathname:'/components/ProductDetails',
                        props:{
                            name:'Ovo je ID elementa'
                        }
                    }                    
                    } className='btn btn-sm btn-success btnDetails' value={this.props.id}>Details</Link>
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


