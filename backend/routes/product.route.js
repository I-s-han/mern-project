import express from 'express'


import { createProduct, deleteProducts, getProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

router.get("/", getProducts)
router.put("/:id",updateProduct )
router.post("/" , createProduct)
router.delete("/:id",deleteProducts )

export default router;