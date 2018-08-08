import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions';

class Cart extends React.Component{
  componentDidMount(){
    this.props.getCart();
  }
  onDelete(_id){
    // Create a copy of the current array of books
    const currentItemToDelete = this.props.cart;
    // Determine at which index in books array is the book to be deleted
    const indexToDelete = currentItemToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    //use slice to remove the book at the specified index
    let cartAfterDelete = [...currentItemToDelete.slice(0, indexToDelete), ...currentItemToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete);
  }
  onIncrement(_id){
    this.props.updateCart(_id, 1, this.props.cart);
  }
  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1, this.props.cart);
    }
  }
  constructor(){
    super();
    this.state = {
      showModal:false
    }
  }
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal:false})
  }

  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(<div></div>)
  }

  renderCart(){
    const cartItemsList = this.props.cart.map(function(cartArr){
      return(
        <div key={cartArr._id}>
          <ul>
            <li>
              <h6>{cartArr.title}</h6><span>    </span>
            </li>
            <li>
              <h6>usd. {cartArr.price}</h6>
            </li>
            <li>
              <h6>qty. <label>{cartArr.quantity}</label></h6>
            </li>
            <li>
              <div style={{minWidth:'300px'}}>
                <button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} >-</button>
                <button onClick={this.onIncrement.bind(this, cartArr._id)} >+</button>
                <span>     </span>
                <button onClick={this.onDelete.bind(this, cartArr._id)} >DELETE</button>
              </div>
            </li>
          </ul>
        </div>
      )
    }, this)
    return(
      <div header="Cart">
        {cartItemsList}
        <ul>
          <li xs={12}>
            <h6>Total amount: {this.props.totalAmount}</h6>
            <button onClick={this.open.bind(this)} >
              PROCEED TO CHECKOUT
            </button>
          </li>
        </ul>
        <div show={this.state.showModal} onHide={this.close.bind(this)}>
          <h6>Thank you!</h6>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          <ul>
            <li>
              <h6>total $: {this.props.totalAmount}</h6>
            </li>
            <button onClick={this.close.bind(this)}>Close</button>
          </ul>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteCartItem:deleteCartItem,
    updateCart:updateCart,
    getCart:getCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);


