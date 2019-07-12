import React , {Component} from 'react'
import PropTypes from 'prop-types'
import scrollIntoViewIfNeeded from "scroll-into-view-if-needed"

class ScrollIntoView extends Component {

    componentDidMount() {
        this.scroll()
    }

    componentDidUpdate() {
        this.scroll()
    }

    scroll() {
        const {id} = this.props
        if(!id) {
            return
        }
        const element = document.querySelector(id)
        if (element) {
            element.scrollIntoView({block: "end", behavior: "smooth"})
        }
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            element.scrollIntoView({block: 'end', behavior: "smooth"})
        } else {
            scrollIntoViewIfNeeded(element, false, {
                duration: 150
            })
        }
    }

    render() {
        return this.props.children
    }
}
ScrollIntoView.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired
    ])
}
export default ScrollIntoView