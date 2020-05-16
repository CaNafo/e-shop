import React, { Component } from 'react';
import '../style/Home.css'

export default class ProductDetails extends Component {

    render() {
        var test = this.props.location.props;
        console.log(test.name);
        return (
            <div className='col-sm-4'>
                <div >
                    <h1>{}</h1>
                    <br />
                    <img src={this.props.photo} alt="Not found" className='photoStyle'></img>
                    <br />
                    <h5>Price: {this.props.price}$</h5>
                    <p>{this.props.details}</p>
                </div>
            </div>
        );
    }
}


