import React, { Component } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",

        },

        goback: false,
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    goBack = () => {
        // this.props.history.goBack("/");
        this.setState({ ...this.state, goback: true })

    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }
    submitHandler = () => {
        this.setState({ isLoading: true });
        const Order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-builder-334ec-default-rtdb.europe-west1.firebasedatabase.app/orders.json", Order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order placed Successfuly",
                    });
                    this.props.resetIngredients();

                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something went wrong! Order Again!",
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something went wrong! Order Again!",
                })
            })

    }
    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
            }}>Payment:{this.props.totalPrice} BDT</h4>
            <form style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className='form-control' placeholder='Your Address' onChange={(e) => this.inputChangeHandler(e)}></textarea>
                <br />
                <input name="phone" className='form-control' value={this.state.values.phone} placeholder='Your Phone Number' onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <select name="paymentType" className='form-control' value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandler(e)}>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bank Card">Bank Card</option>
                </select>
                <br />

                <Button style={{ backgroundColor: "#D70F64", marginRight: '5px' }} className='mr-auto' onClick={this.submitHandler} disabled={!this.props.purchasable} >Place Order</Button>
                <Button color='secondary' className='ml-1' onClick={this.goBack}>Cancel</Button>

            </form>

        </div>)
        return (
            <div>
                {this.state.goback && <Navigate to="/" />}
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
