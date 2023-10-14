import React from 'react';
import Layout from '../../components/layout';
import ProductLayout from '../../components/Product/ProductLayout';
import DeleteProduct from '../../components/Product/DeleteProduct';
import UpdateProduct from '../../components/Product/UpdateProduct';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="my-3 flex flex-col items-center justify-between rounded-md md:flex-row">
        <h1 className="mb-3 truncate text-xl font-bold text-gray-700">
          <span className="mr-2 text-sm font-medium text-gray-500">
            Product: 
          </span>
          {product?.name}
        </h1>
        <div className="flex items-center space-x-2">
          <UpdateProduct product={product} />
          <DeleteProduct productId={router.query.id} />
        </div>
      </header>
      {product ? (
        <ProductLayout product={product} />
      ) : (
        <div className="w-full text-center text-2xl font-bold text-gray-300">
          No details
        </div>
      )}
    </div>
  );
}

export default Product;

Product.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Products' }}>{page}</Layout>;
};

export async function getStaticProps({ params }) {
  const db = getFirestore();
  const docRef = doc(db, 'products', params.id);
  const docSnap = await getDoc(docRef);

  let product = null;
  if (docSnap.exists()) {
    product = docSnap.data();
  }

  return {
    props: {
      product,
    },
    revalidate: 1, // Re-generate the page at most once every second if there are any requests
  };
}

export async function getStaticPaths() {
  // Assuming you have the list of product IDs
  const paths = [{ params: { id: 'your_product_id_here' } }];

  return {
    paths,
    fallback: true, // Display fallback if the product does not exist
  };
}
