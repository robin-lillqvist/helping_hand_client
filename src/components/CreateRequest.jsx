import React from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'

const CreateRequest = props => {
  let productDisplay

  const dispatch = useDispatch()

  const getProducts = async () => {
    let response = await axios.get('/products')
    dispatch({ type: 'GET_PRODUCT_LIST', payload: response.data })
    dispatch({ type: 'SHOW_REQUEST_FORM', showRequestForm: true })
  }

  const addToRequest = async event => {
    let id = event.target.parentElement.dataset.id
    let response = await axios.post('/products')
    // return response.data
  }

  if (!props.showRequestForm) {
  } else {
    productDisplay = props.products.map(product => {
      return (
        <li
          id={`product-${product.id}`}
          key={product.id}
          data-id={product.id}
          data-name={product.name}
          data-price={product.price}
        >
            {product.name} {product.price}
            <button key={product.id} onClick={addToRequest.bind(this)}>
              Add
            </button>
        </li>
      )
    })
  }

  return (
    <>
      <button className='create-request' onClick={getProducts.bind(this)}>
        Create your request
      </button>
      <ul id='product-list'>{productDisplay}</ul>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)
