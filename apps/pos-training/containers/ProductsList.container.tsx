import ProductsList from "@/components/ProductsList";
import { getCatalogItems } from "@/utils/getCatalogItems";
import { getSquareCatalogMeta } from "@/utils/getCategories-Discounts";

const ProductsListContainer = async () => {
  const [res, metaRes] = await Promise.all([
    getCatalogItems(),
    getSquareCatalogMeta(), // for Categories + Discounts + Taxes
  ]);

  const [data, metaData] = await Promise.all([res.json(), metaRes.json()]);

  const discounts = metaData.data.filter(
    (item: any) => item.type === "DISCOUNT"
  );

  const taxes = metaData.data.filter((item: any) => item.type === "TAX");

  return <ProductsList items={data} discounts={discounts} taxes={taxes} />;
};

export default ProductsListContainer;
