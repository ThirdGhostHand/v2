import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {addToCart, updateCart} from '../../actions';

class Item extends React.Component{

    handleCart(){
        const addedItem = [...this.props.cart, {
            _id:this.props._id,
            title:this.props.title,
            description:this.props.description,
            price:this.props.price,
            quantity:1
        }]
        // CHECK IF CART IS EMPTY
        if(this.props.cart.length > 0) {
          // CART IS NOT EMPTY
          let _id = this.props._id;
    
          let cartIndex = this.props.cart.findIndex(function(cart){
            console.log(cartIndex)
            return cart._id === _id;
          })
          // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
          if (cartIndex === -1){
            this.props.addToCart(addedItem);
          } else {
            // WE NEED TO UPDATE QUANTITY
            this.props.updateCart(_id, 1, this.props.cart);
          }
    
        } else {
          // CART IS EMPTY
          this.props.addToCart(addedItem);
        }
    
      }

  constructor(){
    super();
    this.state = {
      isClicked:false
    };
  }
  onReadMore(){
    this.setState({isClicked:true})
  }
  render(){
    return(
      <div>
        <ul>
          <li >
            <h6>{this.props.title}</h6>
            <p>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0, 50)):(this.props.description)}
              <button className='link' onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...read more'):('')}
              </button>
            </p>
            <h6>usd. {this.props.price}</h6>
            <button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</button>

          </li>
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    cart:state.cart.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart:addToCart,
    updateCart:updateCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
