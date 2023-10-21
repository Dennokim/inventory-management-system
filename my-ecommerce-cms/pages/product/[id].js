import React from 'react';
import Layout from '../../components/layout';
import ProductLayout from '../../components/Product/ProductLayout';
import DeleteProduct from '../../components/Product/DeleteProduct';
import UpdateProduct from '../../components/Product/UpdateProduct';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

function Product({ product }) {
  return (
    <Layout>
      <div>
        <header className="my-3 flex flex-col items-center justify-between rounded-md md:flex-row">
          <h1 className="mb-3 truncate text-xl font-bold text-gray-700">
            <span className="mr-2 text-sm font-medium text-gray-500">Product: </span>
            {product?.name}
          </h1>
          <div className="flex items-center space-x-2">
            <UpdateProduct product={product} />
            <DeleteProduct />
          </div>
        </header>
        {product ? (
          <ProductLayout product={product} />
        ) : (
          <div className="w-full text-center text-2xl font-bold text-gray-300">No details</div>
        )}
      </div>
    </Layout>
  );
}

export default Product;

export async function getStaticProps({ params }) {
  // Fetch data from Firebase Firestore
  const product = await getFirebaseProduct(params.id);
  return {
    props: { product },
  };
}

// Pre-render all the static paths
export async function getStaticPaths() {
  // Fetch all product ids from Firebase Firestore
  const productIds = []; // Replace this with your actual fetching logic to get product ids from Firestore
  const paths = productIds.map((id) => ({
    params: { id: id.toString() },
  }));
  return {
    paths: paths,
    fallback: true, // Set to true if you want to enable fallback for dynamic routes
  };
}
