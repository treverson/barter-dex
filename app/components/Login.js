// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';

import { Snackbar, Button, TextField} from 'material-ui';

import AppLogo from './AppLogo';
import { history } from '../store/configureStore.js';

export default class Login extends Component {
  constructor(props){
  	 
  	 super(props)

	 this.state = {
	 	passphrase: "",
	 	snackMsg: "",
	 	snackOpen: false,
	 }
  }
  _handleChange = (e) => {
	this.setState({ passphrase: e.target.value });
  }
  _handleLogin = () => {
  	history.push("/startup");
  }
   _handleSave = () => {
  	if(this.state.passphrase.length < 1){
  		this.showSnack("Enter a Passphrase to Login");
  	}
  	localStorage.setItem("passphrase", this.state.passphrase);
  	history.push("/pin");
  }
  showSnack = (msg) => {
  	this.setState({
  		snackOpen: true,
  		snackMsg: msg,
  	}); 
  }
  render() {
    return (
        <div className={styles.container}>
		  <Snackbar
	          anchorOrigin={{
	            vertical: 'bottom',
	            horizontal: 'left',
	          }}
	          open={this.state.snackOpen}
	          autoHideDuration={6000}
	          message={this.state.snackMsg}
		   />        
        	<AppLogo />
		    <TextField
		          value={this.state.passphrase}
		          onChange={this._handleChange}
		          margin="normal"
          		  label="Passphrase"
          		  InputProps={{ placeholder: 'Passphrase' }}		          
		        />
		        <Button color="accent" onClick={this._handleSave}>Save Passphrase</Button>
		        <Button raised color="primary" onClick={this._handleLogin}>Login</Button>
        </div>
    );
  }
}