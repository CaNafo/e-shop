import React, { Component } from 'react';
import Static from '../services/Static'
import '../style/Home.css'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Home from '../components/Home'

export default class ProductIndexPreview extends Component {

    render() {

        const deleteProduct = async (e, id) => {
            var link = Static.getServerLink() + 'api/DeleteProduct?ID=' + id;
            
            Swal.fire({
                title: 'Do you want to delete this product?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Delete`,
                denyButtonText: `Don't delete`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                deleteConfirmed(link);
                Swal.fire('Deleted!', '', 'success')
                setTimeout(() => {e.preventDefault();
                    window.location.reload();
                 }, 1500);
                } else if (result.isDenied) {
                  Swal.fire('Product is not deleted', '', 'info')
                }
              })

        }

        const deleteConfirmed = async(link)=>{
            await fetch(link);
        }

        function deleteProductAlert(){
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
              })
        }

        function redirectToDetails(id) {
            document.getElementById(id).click();
        }

        function checkIfProductIsAvaliable(amount,block) {
            if (amount > 0) {
                return block;
            } else {
                return (
                    <h5 id='outOfStockPreview'>Out of stock</h5>
                );
            }
        }

        return (
                <div className='product productcol-sm-4'>
                    <div >
                        <h6>{this.props.tittle}</h6>
                        <img src={this.props.photo} alt="Not found" className='photoStyle' onClick={e => redirectToDetails(this.props.id)}></img>
                        <br />
                        {
                            checkIfProductIsAvaliable(
                                this.props.amount,
                                <h5 id='productPrice'>{this.props.price}$</h5>
                            )
                        }
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


