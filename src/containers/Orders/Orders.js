import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';

class Orders extends Component {
	

	componentWillMount() {
		this.props.resetAuth();
		if(this.props.token)this.props.initOrders(this.props.token,this.props.userId);
	}

	render() {
		const displayOrders = this.props.ord.map(p => {
			return <Order key={ p.id } data={p.dat} />
		})
		return (
			<div>
				{this.props.token? displayOrders : <h1>No order Found</h1>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ord: state.orders.orders,
		token: state.auth.token,
		userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
	return {
		initOrders: (token,id) => dispatch(actions.fetchOrders(token,id)),
		resetAuth: () => dispatch(actions.authReset())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);