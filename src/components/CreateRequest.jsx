import React from 'react'
import { connect } from 'react-redux'


 const CreateRequest = props => {
   let productDisplay = props.articles.map(product => {
     return (
      <div key={product.id} align="center">
        <h1>{product.name}{product.price}</h1>
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
export default connect(mapStateToProps)(CreateRequest)
