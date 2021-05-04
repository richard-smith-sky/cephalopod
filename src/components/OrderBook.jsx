import React, { Component } from 'react';
import { Card, CardBody, Table } from 'reactstrap';

import getClient from '../clients/socketClient';

import './scss/orderBook.scss';

export default class OrderBook extends Component {
	state = {
		orderBook: []
	};

	componentDidMount() {
		this.client = getClient(this.updateOrderBook);
	}

	componentWillUnmount() {
		this.client.close();
	}

	updateOrderBook = (msg) => {
		// Parse the msg data and deconstruct feed, bids and asks
		const { feed, bids = [], asks = [] } = JSON.parse(msg.data);

		// Get the existing orderBook from the state
		let { orderBook } = this.state;

		if (feed === 'book_ui_1_snapshot') {
			// Feed contains 'snapshot' is the initial data load
			for (let [ price, size ] of [ ...bids, ...asks ]) {
				orderBook.push({
					price,
					size
				});
			}
		} else if (typeof feed !== undefined) {
			// Otherwise, assuming there is a feed value, it's a delta
			for (let [ price, size ] of [ ...bids, ...asks ]) {
				const priceLevel = orderBook.findIndex(({ price: deltaPrice }) => deltaPrice === price);

				if (size === 0 && priceLevel !== -1) {
					// Size is zero and the price level exists - remove it
					orderBook.splice(priceLevel);
				} else if (size !== 0 && priceLevel === -1) {
					// Size is not zero and the price level does not exist - add it
					orderBook.push({
						price,
						size
					});
				} else if (size !== 0 && priceLevel !== -1) {
					// Size is not zero and the price level exists - update it
					orderBook[priceLevel] = {
						...orderBook[priceLevel],
						size
					};
				}
			}
		}

		// Order entries by price ascending
		orderBook = orderBook.sort((a, b) => a.price - b.price);

		// Update totals by using a running total through the ordered orderbook
		let runningTotal = 0;
		for (let price of orderBook) {
			runningTotal += price.size;
			price.total = runningTotal;
		}

		// Reorder entries by totals descending
		orderBook = orderBook.sort((a, b) => b.price - a.price);

		// Put the new orderBook in state for rendering
		this.setState({
			orderBook
		});
	};

	renderOrderBookRows(orderBook) {
		return orderBook.map(({ price, size, total }) => {
			return (
				<tr key={`p${price}`}>
					<td>{price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
					<td>{size.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
					<td>{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
				</tr>
			);
		});
	}

	render() {
		const { orderBook = [] } = this.state;

		return (
			<Card className="orderBook">
				<CardBody>
					{orderBook.length === 0 && <p>No items found in the Order Book - please check your connection</p>}
					{orderBook.length !== 0 && (
						<Table size="sm" borderless striped>
							<thead>
								<tr>
									<th>Price</th>
									<th>Size</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>{this.renderOrderBookRows(orderBook)}</tbody>
						</Table>
					)}
				</CardBody>
			</Card>
		);
	}
}
