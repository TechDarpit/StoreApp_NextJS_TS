import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
// import NotificationContext from '../../store/notification-context';
import { useRouter } from 'next/router';

import styles from './EditProductForm.module.css';
import { toast } from 'react-toastify';

const EditProductForm: React.FC<{
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}> = (props) => {
  const router = useRouter();
  const { id, title, description, price, category, image } = props;
  // const notificationCtx = useContext(NotificationContext);

  // console.log(price);

  const [validated, setValidated] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedImage, setUpdatedImage] = useState(image);

  useEffect(() => {
    setUpdatedTitle(title);
    setUpdatedPrice(price);
    setUpdatedCategory(category);
    setUpdatedDescription(description);
    setUpdatedImage(image);
  }, [title, price, description, category, image]);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value);
  };
  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedPrice(+event.target.value);
  };
  const descriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedDescription(event.target.value);
  };
  const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCategory(event.target.value);
  };
  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedImage(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form: any = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      toast.info('Updating Product Data!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetch(`https://fakestoreapi.com/products/${props.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: updatedTitle,
          price: updatedPrice,
          description: updatedDescription,
          image: updatedImage,
          category: updatedCategory,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success('Product Updated Successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push(`/products/${id}`);
        })
        .catch((error) => {
          toast.error(error.message || 'Something Went Wrong!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='validationCustom01'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Product Title'
              defaultValue={updatedTitle}
              onChange={titleHandler}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='validationCustom01'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Product Price In $'
              min='0'
              step='0.01'
              defaultValue={updatedPrice}
              onChange={priceHandler}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid price
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='validationCustom01'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Product Category'
              defaultValue={updatedCategory}
              onChange={categoryHandler}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid category
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='validationCustom01'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              placeholder='Enter Product Description'
              defaultValue={updatedDescription}
              onChange={descriptionHandler}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid description
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type='file'
              accept='image/*'
              defaultValue={updatedImage}
              onChange={imageHandler}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please provide a product image
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='primary' type='submit' className={styles.btn}>
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default EditProductForm;
