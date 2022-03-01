import React, { useState, useRef, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import styles from './ProductForm.module.css';

const ProductForm = () => {
  const [validated, setValidated] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form: any = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      toast.info('Adding Product Data!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify({
          title: titleInputRef.current!.value,
          price: priceInputRef.current!.value,
          description: descriptionInputRef.current!.value,
          image: imageInputRef.current!.value,
          category: categoryInputRef.current!.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success('Product Added Successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='validationCustom01'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Product Title'
              ref={titleInputRef}
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
              ref={priceInputRef}
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
              ref={categoryInputRef}
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
              ref={descriptionInputRef}
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
              ref={imageInputRef}
              required
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

export default ProductForm;
