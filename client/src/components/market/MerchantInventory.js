import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInventory } from '../../actions';

class MerchantInventory extends Component{

    componentDidMount(){
        this.props.fetchInventory();
    }

    renderInventory(){
        if(this.props.inventory){
            console.log(this.props.inventory)
            return this.props.inventory.map(item => {
                return (    
                <div className="card darken-1" key={item._id}>
                    <div className="card-content">
                    <span className="card-title">{item.title}</span>
                    </div>
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

function mapStateToProps({inventory}) {
    return { inventory };
  }
  
  export default connect(mapStateToProps, { fetchInventory })(MerchantInventory);
  