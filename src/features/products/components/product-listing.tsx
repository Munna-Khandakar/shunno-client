import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { TransectionTable } from './product-tables';
import { columns } from './product-tables/columns';
import { Transection } from "@/types/Transection";

type ProductListingPage = {};

export default async function TransectionListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.total_products;
  const products: Transection[] = data.products;

  return (
    <TransectionTable
      data={products}
      totalItems={totalProducts}
      columns={columns}
    />
  );
}
