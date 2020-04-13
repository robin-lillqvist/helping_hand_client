import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'

const CreateRequest = props => {
  props.fetchProducts()
  
  let productDisplay = props.products.map(product => {
    return (
      <div key={product.id} align='center'>
        <h1>
          {product.name}
          {product.price}
        </h1>
      </div>
    )
  })
  return <div id='product-list'>{productDisplay}</div>
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)