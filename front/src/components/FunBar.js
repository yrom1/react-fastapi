import React from 'react'
import DualComponent from './DualComponent'
import Theme from './Theme'
import Quote from './Quote'

function fn() {
    return (
        <DualComponent component1={<Theme />} component2={<Quote />} />
    )
}
export default fn
