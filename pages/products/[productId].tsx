import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { getAllProducts, getProductById } from '../../helpers/app-util';

import ProductDetails from '../../components/product-details/ProductDetails';
import { Product } from '../../helpers/product-interface';

const ProductDetailPage: React.FC<{ selectedProduct: Product }> = (props) => {
  const product = props.selectedProduct;

  return (
    <ProductDetails
      id={product.id}
      title={product.title}
      image={product.image}
      price={product.price}
      description={product.description}
      category={product.category}
      rating={product.rating.rate}
    />
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const productId = +context.params.productId;

  const product: Product = await getProductById(productId);

  return {
    props: {
      selectedProduct: product,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = await getAllProducts();

  const paths = products.map((product) => ({
    params: { productId: product.id + '' },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export default ProductDetailPage;
