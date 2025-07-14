import ProductsList from "@/components/ProductsList";
import { getCatalogItems } from "@/utils/getCatalogItems";
import { getCategories } from "@/utils/getCategories-Discounts";

const ProductsListContainer = async () => {
  const [res, categoryRes] = await Promise.all([
    getCatalogItems(),
    getCategories(),
  ]);

  const [data, categoryData] = await Promise.all([
    res.json(),
    categoryRes.json(),
  ]);
  const categories = categoryData.data.filter(
    (item: any) => item.type === "CATEGORY"
  );
  const discounts = categoryData.data.filter(
    (item: any) => item.type === "DISCOUNT"
  );

  return (
    <ProductsList items={data} categories={categories} discounts={discounts} />
  );
};

export default ProductsListContainer;
