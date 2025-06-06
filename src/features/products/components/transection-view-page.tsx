import { fakeProducts, Transection } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';

type TProductViewPageProps = {
  transectionId: string;
};

export default async function TransectionViewPage({
  transectionId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Transection';

  if (transectionId !== 'new') {
    const data = await fakeProducts.getProductById(Number(transectionId));
    product = data.product as Transection;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Transection`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
