import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import scrollIntoView from 'scroll-into-view'

class ScrollView extends Component {
  elements = {}

  static childContextTypes = {
    scroll: PropTypes.object,
  }

  register = (id, ref) => {
    this.elements[id] = ref
  }

  unregister = (id) => {
    delete this.elements[id]
  }

  getChildContext() {
    return {
      scroll: {
        register: this.register,
        unregister: this.unregister
      }
    }
  }

  scrollTo(id) {
    const node = findDOMNode(this.elements[id])

    scrollIntoView(node, {
      time: 500,
      align: {
        top: 0
      }
    })
  }

  render() {
    return (
      React.Children.only(this.props.children)
    )
  }
}

class ScrollElement extends Component {
  static contextTypes = {
    scroll: PropTypes.object,
  }

  componentDidMount() {
    console.log(this.props.id)
    this.context.scroll.register(this.props.id, this._element)
  }

  componentWillUnmount() {
    this.context.scroll.unregister(this.props.id)
  }

  render () {
    return (
      React.cloneElement(this.props.children, {
        ref: ref => this._element = ref
      })
    )
  }
}

export { ScrollElement }
export default ScrollView
