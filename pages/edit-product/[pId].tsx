import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import EditProductForm from '../../components/edit-product-form/EditProductForm';
import { getProductById } from '../../helpers/app-util';
import { Product } from '../../helpers/product-interface';

const blankProduct: Product = {
  id: 0,
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  rating: {
    rate: 0,
    count: 0,
  },
};

const EditProduct = () => {
  const [productData, setProductData] = useState<Product>(blankProduct);
  const router = useRouter();
  const productid = +router.query.pId;

  console.log(productid);

  useEffect(() => {
    const getProductData = async () => {
      const data = await getProductById(productid);
      setProductData(data);
    };
    getProductData();
  }, [productid]);

  console.log('Data in Edit page: ' + productData);

  return (
    <Fragment>
      {productData && (
        <EditProductForm
          id={productData.id}
          title={productData.title}
          price={'' + productData.price}
          category={productData.category}
          description={productData.description}
          image={productData.image}
        />
      )}
    </Fragment>
  );
};

export default EditProduct;
