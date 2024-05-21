import { IProduct } from "../../interfaces";
import { CustomError } from "../../utils/custom_error";
import ProductModel from "../models/product.model";

interface IProductRepository {
  save(product: IProduct): Promise<IProduct> | null;
  products(): Promise<IProduct[]> | null;
  product(id: string): Promise<IProduct> | Promise<null>;
  byCategory(category: string): Promise<IProduct[]> | null;
  containsId(id: string[]): Promise<IProduct[]> | null;
}
class ProductRepository implements IProductRepository {
  async save(product: IProduct): Promise<IProduct> {
    const productToAdd = new ProductModel(product);
    try {
      const productResult = await productToAdd.save();
      console.log(productResult);
      return productResult;
    } catch (err: any) {
      throw new CustomError(err, 400, "Failed creating product");
    }
  }
  async products(): Promise<IProduct[]> {
    return await ProductModel.find();
  }
  async product(id: string): Promise<IProduct> {
    const product = await ProductModel.findById(id);
    if (product != null) {
      return product;
    } else {
      throw new CustomError("Not found", 404, "null");
    }
  }
  async byCategory(category: string): Promise<IProduct[]> {
    const products = await ProductModel.find({ type: category });
    if (products) {
      return products;
    }
    throw new CustomError("No category found", 404, "err");
  }

  async containsId(ids: string[]): Promise<IProduct[]> {
    const products = await ProductModel.find()
      .where("_id")
      .in(ids.map((_id) => _id))
      .exec();
    return products;
  }
}

export default new ProductRepository();
