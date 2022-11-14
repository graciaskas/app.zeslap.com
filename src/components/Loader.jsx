import React from 'react'
import PropTypes from 'prop-types'

function Loader(props) {
    return (
        <div
            className='site-loader position-fixed top-0 end-50 start-50 d-flex align-items-center justify-content-center'
            style={{zIndex:5}}>
            <strong className='bg-secondary text-white d-flex rounded-bottom p-2 px-4'>
                <i className="fa fa-spinner rotate" style={{ marginRight:"8px"}}/>  Loading...
            </strong>
        </div>
    )
}

Loader.propTypes = {}

export default Loader
