import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'
import { SHOW_REQUEST_FORM } from '../state/actions/actionTypes'

const CreateRequest = props => {
  props.fetchProducts()
  let productDisplay

  const dispatch = useDispatch()
  
  

  const addToRequest = async () => {
  // let response = axios.get("/products")
  // return response.data
  }


  if (!props.showRequestForm) {
  } else {
    productDisplay = props.products.map(product => {
      return (
        <li id="product" key={product.id}>
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