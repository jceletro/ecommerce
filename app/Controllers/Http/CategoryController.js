'use strict'
const Category = use('App/Models/Category')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { page } = request.get
    const categories = await Category.query().with('image').paginate(page)

    return categories
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['title', 'description', 'image_id'])

    const category = await Category.create(data)

    await category.load('image')

    return category
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const category = await Category.findBy('id', params.id)

    if (!category) {
      return response.status(404).send({ error: 'category not found' })
    }

    return category
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const category = await Category.findBy('id', params.id)

    if (!category) {
      return response.status(404).send({ error: 'Category not found' })
    }

    const data = request.all()

    await category.merge(data)

    await category.save()

    await category.load('image')

    return category
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const category = await Category.findBy('id', params.id)

    await category.delete()
  }
}

module.exports = CategoryController
