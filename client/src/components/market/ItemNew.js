import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AddItem extends Component{
    onSubmit = formProps => {
        this.props.addItem(formProps, () => {
          this.props.history.push('/addItem');
        });
      };
    
      render() {
        const { handleSubmit } = this.props;
    
        return (
          <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
              <label>Item name</label>
              <Field
                name="title"
                type="text"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Description</label>
              <Field
                name="description"
                type="text"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Quantity</label>
              <Field
                name="quantity"
                type="number"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Price</label>
              <Field
                name="price"
                type="number"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <button>Add Item to inentory</button>
          </form>
        );
      }
    }
    
    function mapStateToProps(state) {
      return {errorMessage: state.store.errorMessage};
    }
    
    export default compose(
      connect(mapStateToProps, actions),
      reduxForm({ form: 'AddItem' })
    )(AddItem);