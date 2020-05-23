'use strict'

const Product = use('App/Models/Product')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { page } = request.get
    const products = await Product.query()
      .with('category', 'image')
      .paginate(page)

    return products
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only([
      'title',
      'description',
      'price',
      'category_id',
      'image_id'
    ])

    const product = await Product.create(data)
    await product.loadMany(['category', 'image'])
    return product
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).send({ error: 'Product not found' })
    }

    await product.loadMany(['image', 'category'])

    return product
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const product = await Product.findBy('id', params.id)

    if (!product) {
      return response.status(404).send({ error: 'Product not found' })
    }

    const data = request.all()

    await product.merge(data)
    await product.save()
    await product.loadMany(['category', 'image'])

    return product
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const product = await Product.findBy('id', params.id)
    await product.delete()
  }
}

module.exports = ProductController
