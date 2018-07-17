import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Paginatable from './index'

configure({ adapter: new Adapter() })
let spy


function setup(customProps, lifeCycle = false) {
	const props = {
		count: 30,
		limit: 10,
		onPageClick: jest.fn(),
		...customProps
	}
	const container = shallow(<Paginatable {...props} />, { disableLifecycleMethods: lifeCycle })
	return { container, props }
}

describe('Paginatable component', () => {
	const { container } = setup()

	it('should render the component', () => {
		expect(container.exists()).toBe(true)
	})

	it('should have specified props', () => {
		const pageCount = Math.ceil(30 / 10)
		expect(container.find('PaginationBoxView').prop('pageCount')).toEqual(pageCount)
	})

	it('should have onPageChange prop', () => {
		const pageClickSpy = jest.fn()
		shallow(<Paginatable count={20} onPageClick={pageClickSpy} />)
		const instance = container.instance()
		spy = jest
			.spyOn(instance, 'handlePageClick')
			.mockImplementation(() => pageClickSpy())
		container.instance().forceUpdate()
		container.update()
		container.find('PaginationBoxView').prop('onPageChange')()
		expect(spy).toHaveBeenCalled()
		expect(pageClickSpy).toHaveBeenCalled()

	})

})
