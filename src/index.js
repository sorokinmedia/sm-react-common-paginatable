import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'

class Paginatable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: props.defaultPageNumber
		}
	}

	handlePageClick = (value) => {
		this.props.onPageClick(value.selected);
		this.setState({ page: value.selected })
	}

	render() {
		const { children, limit, forcePage, count } = this.props;
		const { page } = this.state;

		const pageCount = Math.ceil(count / limit);
		return (
			<div>
				{children}
				{pageCount > 1 ? <ReactPaginate
					previousLabel="«"
					nextLabel="»"
					breakLabel={<a href="">...</a>}
					breakClassName="break-me"
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={this.handlePageClick}
					containerClassName="pagination"
					subContainerClassName="pages pagination"
					activeClassName="active"
					forcePage={forcePage || forcePage === 0 ? forcePage : page}
				/> : ''}
			</div>)
	}

}

Paginatable.propTypes = {
	limit: PropTypes.number,
	forcePage: PropTypes.number,
	defaultPageNumber: PropTypes.number,
	count: PropTypes.number.isRequired,
	onPageClick: PropTypes.func.isRequired,
	children: PropTypes.node
};

Paginatable.defaultProps = {
	limit: 20,
	defaultPageNumber: 0
};

export default Paginatable
