import React, {Component} from 'react';

export default class Logout extends Component {
	componentDidMount = async() => {
		AsyncStore.removeData('@user');
	}

	render () {
		return null;
	}
}