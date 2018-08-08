import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInventory } from '../../actions';
import BrowseStore from "./BrowseStore"
import * as actions from '../../actions';

class ClientStore extends Component{

    render(){
        return (
            <div>
                <BrowseStore />
            </div>    
        )
    }
}
  
  export default ClientStore;
  