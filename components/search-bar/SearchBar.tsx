import React from 'react';
import { InputGroup, FormControl, Row, Col, Form } from 'react-bootstrap';

import { Search } from 'react-bootstrap-icons';

import styles from './SearchBar.module.css';

const SearchBar: React.FC<{
  onSort: (sortKey: string) => void;
  onSearch: (searchKey: string) => void;
}> = (props) => {
  const sortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sortKey = event.target.value;
    props.onSort(sortKey);
  };

  const searchHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const searchKey = event.target.value;
    props.onSearch(searchKey);
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <InputGroup onChange={searchHandler}>
            <FormControl placeholder='Search...' />
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col>
          <Form.Select
            aria-label='Default select example'
            onChange={sortHandler}
          >
            <option value='' selected disabled hidden>
              Sort by
            </option>
            <option value='title-asc'>Title A - Z</option>
            <option value='title-dsc'>Title Z - A</option>
            <option value='price-asc'>Price Low - High</option>
            <option value='price-dsc'>Price High - Low</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
