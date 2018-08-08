import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInventory } from '../../actions';
import MerchantInventory from "./MerchantInventory"
import * as actions from '../../actions';

class MerchantStore extends Component{

    render(){
        return (
            <div>
                <Link to="/addItem">Add Item</Link>
                <MerchantInventory />
            </div>    
        )
    }
}
  
  export default MerchantStore;
  