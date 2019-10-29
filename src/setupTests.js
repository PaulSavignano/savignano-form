import React, { Component } from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const adapter = new Adapter()

configure({ adapter })

export class ErrorBoundary extends Component {
  componentDidCatch(error) {
    this.props.spy(error)
  }

  render() {
    return this.props.children
  }
}

export const HookWrapper = ({ hook }) => <div hook={hook ? hook() : undefined} />