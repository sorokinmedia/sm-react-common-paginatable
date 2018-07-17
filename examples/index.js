import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import Paginatable from '../lib'

class App extends Component {

	render() {
		return (
			<div>
				<Paginatable count={30} onPageClick={() => console.log('go')} />
			</div>
		)
	}
}

App.propTypes = {}
App.defaultProps = {}

render(<App />, document.getElementById('root'))
