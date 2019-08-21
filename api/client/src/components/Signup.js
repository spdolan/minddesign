import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Signup extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <>
      <div className='row'>
          <div className='col-10 offset-1 mt-4'>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset className='form-group'>
              <label>Name</label>
              <Field
                name="name"
                type="text"
                placeholder="What's your handle?"
                component="input"
                autoComplete="none"
                className='form-control'
              />
            </fieldset>
            <fieldset className='form-group'>
              <label>Email</label>
              <Field
                name="email"
                type="text"
                placeholder="rick@councilofricks.singularity"
                component="input"
                autoComplete="none"
                className='form-control'
              />
            </fieldset>
            <fieldset className='form-group'>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Anything but 'password'..."
                component="input"
                autoComplete="none"
                className='form-control'
              />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <button className='btn btn-lg btn-outline-success'>Sign Up!</button>
          </form>
          </div>
      </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
