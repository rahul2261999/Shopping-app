import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCategory, editCategory } from '../../../../redux/actions/category';
import { requireField } from '../../../../utilities/helperFunction';
import ModalTemplate from '../../../../utilities/ModalTemplate/ModalTemplate';

import { FormContainer, FormWrapper, Button } from './style';

const AddEditCategory = (props) => {
  const {
    edit, closeModalHandler, token, modal, selectedProd
  } = props;
  const dispatch = useDispatch();
  const [category_name, setCategoryName] = useState('');
  const [category_error, setCategoryError] = useState(false);

  const { _id, category_name: cateName } = selectedProd;

  useEffect(() => {
    if (edit) {
      setCategoryName(cateName);
    }
  }, [cateName, edit]);

  const valueHandler = (e, data) => {
    setCategoryName(data.value.toUpperCase());
  };

  const submitFormHandler = () => {
    const validateCate = requireField(category_name, 'Field can not be empty');
    if (!validateCate) {
      edit ? dispatch(editCategory(_id, { category_name }, token)) : dispatch(addCategory({ category_name }, token));
    } else {
      setCategoryError(validateCate);
    }
  };

  return (
    <ModalTemplate
      modalTitle={edit ? 'Edit Category' : 'Add Category'}
      isMount={modal}
      headerTitle={edit ? 'Edit Category' : 'Add Category'}
      isModalOpen={closeModalHandler}
      maxWidth="300px"
    >
      <FormContainer>
        <FormWrapper onSubmit={(e) => {
          e.preventDefault();
          submitFormHandler();
        }}
        >
          <FormWrapper.Input
            label="Category Name"
            type="text"
            name="category_name"
            value={category_name}
            onChange={valueHandler}
            error={category_error}
          />
          <Button>{edit ? 'Edit Category' : 'Add category'}</Button>
        </FormWrapper>
      </FormContainer>
    </ModalTemplate>
  );
};

export default AddEditCategory;
