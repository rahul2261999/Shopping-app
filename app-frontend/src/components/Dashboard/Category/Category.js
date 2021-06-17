import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    HeaderBar,
    Icon,
    Container,
    CardBody,
    CardIcon,
} from './style'
import { FaPlusSquare } from 'react-icons/fa'


import DefaultCard from '../../../utilities/DefaultCard/DefaultCard'
import { getUser } from '../../../utilities/helperFunction'
import { closeCateModal, fetchAllCategories, openCateModal, removeCategory } from '../../../redux/actions/category'
import { memoisedCategory } from '../../../redux/selector/category'
import { FaTrashAlt, FaPen } from 'react-icons/fa'
import AddEditCategory from './AddEditCategory/AddEditCategory'

const Category = () => {
    const dispatch = useDispatch()
    const { token } = getUser()
    const { allCategories, modal } = useSelector(memoisedCategory)
    const [selectedProd, setSelectedProduct] = useState('')

    const [edit, setEdit] = useState(false)


    useEffect(() => {
        dispatch(fetchAllCategories(token))
    }, [])

    const editProductHandler = id => {
        const editProd = allCategories.find(item => item._id === id)
        setSelectedProduct(editProd)
        setEdit(true)
        dispatch(openCateModal())
    }

    const openModalHandler = () => {
        setEdit(false)
        dispatch(openCateModal())
    }
    const closeModalHandler = () => {
        setEdit(false)
        dispatch(closeCateModal())
    }

    const removeCategoryHandler = id => {
        dispatch(removeCategory(id, token))
    }



    const categoryCard = allCategories.map(cate => {
        return (<DefaultCard key={cate._id}>
            <CardBody>
                {cate.category_name}
                <CardIcon>
                    <Icon as={FaTrashAlt} onClick={() => removeCategoryHandler(cate._id)} />
                    <Icon as={FaPen} onClick={() => editProductHandler(cate._id)} />
                </CardIcon>
            </CardBody>
        </DefaultCard>)
    })

    return (
        <React.Fragment>
            <HeaderBar>
                <Icon margin="10px" onClick={openModalHandler} as={FaPlusSquare} /> Add New Category
            </HeaderBar>
            <Container>
                {categoryCard}
            </Container>
            {modal && (
                <AddEditCategory
                    token={token}
                    edit={edit}
                    modal={modal}
                    closeModalHandler={closeModalHandler}
                    selectedProd={selectedProd}
                />
            )}
        </React.Fragment>
    )
}

export default Category