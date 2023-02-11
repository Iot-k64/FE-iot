import instanceAxios from './base';

class ProductApi {
  static async getProducts() {
    const response = await instanceAxios.post('/get-all-products');
    return response.data;
  }

  static async createProduct(productData) {
    const response = await instanceAxios.post(
      '/add-new-product',
      productData
    );
    return response.data;
  }

  static async editProduct(productData) {
    const response = await instanceAxios.post(
      '/update-product-by-id',
      productData,
    );
    return response.data;
  }

  static async removeProduct(productId) {
    const response = await instanceAxios.post(
      '/delete-product-by-id',
      { id: productId }
    );
    return response.data;
  }
}

export default ProductApi;
