import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'
import { SHOW_REQUEST_FORM } from '../state/actions/actionTypes'

const CreateRequest = props => {
  let productDisplay

  const dispatch = useDispatch()
  
  props.fetchProducts()

  const addToRequest = async event => {
    debugger
  }


  if (!props.showRequestForm) {
  } else {
    productDisplay = props.products.map(product => {
      return (
        <li key={product.id}>
          <div>
            {product.name} {product.price}
            <button key={product.id} onClick={addToRequest.bind(this)}>
              Add
            </button>
          </div>
        </li>
      )
    })
  }

  return (
    <>
      <button
        className='create-request'
        onClick={() => dispatch({ type: SHOW_REQUEST_FORM, showRequestForm: true })}
      >
        Create your request
      </button>
      <ul id='product-list'>{productDisplay}</ul>
    </>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)