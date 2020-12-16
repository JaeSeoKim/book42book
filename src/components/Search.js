import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Search = (props) => {
  return (
    <FormGroup>
        <Label for="Search"></Label>
        <Input
          type="search"
          name="search"
          id="Search"
          placeholder="도서 검색"
        />
      </FormGroup>
  );
}

export default Search;
