import React, { Component } from 'react';
import axios from 'axios';

const onSubmit = async (e)  => {
  try {
    e.preventDefault()
    let response = await axios.post(e.target.username.value, e.target.password.value)
  } catch (error){
     
  }
}

class CreateRequest extends Component {
  state = { 
    productItems: [],
    productList: []
  }

  componentDidMount () {
    axios.get('/products').then(response => {
      this.setState({
        productItems: response.data.products
      })
    })
  }

  render (){
    const productItems = this.state.productItems
    let productList
    if (productItems.length !== 0) {
      productList = productItems.map(productItem => {
        return (
          <>
            <div key={productItem.id} >
              <div className='five wide column'>
                <div>{productItem.name} {productItem.price}</div><button onClick={event => onSubmit(event)}>Add</button>
              </div>
            </div>
          </>
        )
      })
    }
    return (
      <div>
        <div id="products" >{productList}</div>          
      </div>
    )
  }
}
export default CreateRequest