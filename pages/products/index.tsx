import { GetStaticProps } from 'next';
import { Fragment, useState } from 'react';

import { Container, Row } from 'react-bootstrap';
import ProductItem from '../../components/product/ProductItem';
import SearchBar from '../../components/search-bar/SearchBar';

import { getAllProducts } from '../../helpers/app-util';
import { Product } from '../../helpers/product-interface';

const Products: React.FC<{ products: Product[] }> = (props) => {
  const PRODUCTS = props.products;
  const [sortValue, setSortValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (searchKey: string) => {
    setSearchValue(searchKey);
  };

  const sortHandler = (sortKey: string) => {
    setSortValue(sortKey);
  };

  return (
    <Fragment>
      <SearchBar onSearch={searchHandler} onSort={sortHandler} />
      <Container>
        <Row lg={4} md={3} sm={2}>
          {PRODUCTS.sort((a: Product, b: Product) => {
            if (sortValue.includes('title')) {
              const isReversed = sortValue.includes('asc') ? 1 : -1;
              return isReversed * a.title.localeCompare(b.title);
            } else if (sortValue.includes('price')) {
              if (sortValue.includes('asc')) {
                return a.price - b.price;
              } else {
                return b.price - a.price;
              }
            }
          })
            .filter(
              (product) =>
                product.title.includes(searchValue) ||
                product.category.includes(searchValue)
            )
            .map((product: Product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                image={product.image}
              />
            ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allProducts: Product[] = await getAllProducts();

  return {
    props: {
      products: allProducts,
    },
    revalidate: 3600,
  };
};

export default Products;
