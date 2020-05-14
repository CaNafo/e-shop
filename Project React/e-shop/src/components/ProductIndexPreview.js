import React, {Component} from 'react';
import piano from '../icons/piano.jpg'
export default class ProductIndexPreview extends Component {

    render(){
        return (
            <div>
                <h4>{this.props.tittle}</h4>
                <br />
                <img src={piano} alt="Piano" height="256" width="256"></img>
                <br/>
                <button>More..</button>
                <h5>Price: {this.props.price}</h5>
            </div>
        );
    }
}


