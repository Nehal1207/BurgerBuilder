import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';

class Orders extends Component {
	state = {
		order: []
	}

	componentDidMount() {
		axios.get('https://burgerbuilder-7c9d9-default-rtdb.firebaseio.com/orders.json').then(res => {
			const orders = []
			for (let i in res.data) {
				orders.push(res.data[i]);
			}
			console.log(orders);
			this.setState({ order: orders });
			//const orderArray = res.data.map(p)
			//this.setState()
		})
	}

	render() {
		const displayOrders = this.state.order.map(p => {
			return <Order data={p} />
		})
		return (
			<div>
				{displayOrders}
			</div>
		);
	}
}

export default Orders;