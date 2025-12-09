import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

/**
 * Create a new category
 */
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create category',
    });
  }
};

/**
 * Get all categories
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeChildren, parentId } = req.query;

    const options = {
      includeChildren: includeChildren === 'true',
      parentId: parentId === 'null' ? null : (parentId as string | undefined),
    };

    const categories = await CategoryService.getAll(options);

    res.json({
      success: true,
      data: { categories },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch categories',
    });
  }
};

/**
 * Get category tree (hierarchical)
 */
export const getCategoryTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const tree = await CategoryService.getTree();

    res.json({
      success: true,
      data: { tree },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch category tree',
    });
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await CategoryService.getById(id);

    res.json({
      success: true,
      data: { category },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Category not found',
    });
  }
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const category = await CategoryService.getBySlug(slug);

    res.json({
      success: true,
      data: { category },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Category not found',
    });
  }
};

/**
 * Update category
 */
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await CategoryService.update(id, req.body);

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update category',
    });
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await CategoryService.delete(id);

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete category',
    });
  }
};

/**
 * Get category statistics
 */
export const getCategoryStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await CategoryService.getStats();

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch statistics',
    });
  }
};
