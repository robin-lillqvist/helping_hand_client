import axios from 'axios'

const products = async () => {
  let response = await axios.get("/products")
  return response.data
}

export {products}