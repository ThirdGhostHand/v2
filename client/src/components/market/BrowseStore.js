import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStore, addToCart, updateCart} from '../../actions';

import Item from './Item';

class BrowseStore extends Component{

    componentWillMount(){
        this.props.fetchStore();
    }

    renderInventory(){
        if(this.props.inventory){
            return this.props.inventory.reverse().map(item => {
                return (
                <div className="card darken-1" key={item._id}>
                   <Item
                    _id= {item._id}
                    title={item.title}
                    description={item.description}
                    price={item.price}/>
                </div>
                );
            });
        }
    }
         

    render() {
        return (
        <div>
            {this.renderInventory()}
        </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        inventory: state.inventory,
        cart: state.cart.cart
     };
  }
  
  export default connect(mapStateToProps, { fetchStore, addToCart, updateCart })(BrowseStore);
  