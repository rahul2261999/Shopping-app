import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ModalTemplate from '../../utilities/ModalTemplate/ModalTemplate'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

import {
    requireField,
    validateEmail,
    validatePassword,
    validateConfirmPassWord,
    isObjectEmpty
} 
from '../../utilities/helperFunction'
import {
    ModalMainContent,
    FormWrapper,
    AuthBUtton,
    Row,
    ModalFooter,
    FooterRight,
    Span,
    Icon
}
from './style'

import {
    userSignup,
    userSignInInitiate,
    closeAuthModal
} from '../../redux/actions/user'
import { memoizedUser } from '../../redux/selector/user'


const Auth = props =>{
    const {openModal} = useSelector(memoizedUser)

    const [isSignup,setSignup] = useState(false)
    const [formValues,setFormValues] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirm_password:''
    })

    const [formError,setFromError] = useState('')
    const dispatch = useDispatch()

    const {first_name,last_name,email,password,confirm_password} = formValues

    const inputChangeHandler = (e,{name,value}) => {
        setFormValues({...formValues,[name]:value})
    }

    const closeModal = () =>{
        dispatch(closeAuthModal(false))
    }

    const switchFrom = () =>{
        setFormValues({
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirm_password:''
        })
        setFromError('')
        setSignup(prevState => !prevState)
    }

    const validation =()=>{

        setFromError('')
        const error ={
            first_name:isSignup?requireField(first_name,'First name is required'):false,
            email:validateEmail(email),
            password:validatePassword(password),
            confirm_password:isSignup?validateConfirmPassWord(confirm_password,password):false
        }
        return error
    }

    const formSubmitHandler = () =>{
        const error = validation()
        console.log(isObjectEmpty(error))
        if(isObjectEmpty(error)){
            isSignup ? dispatch(userSignup(formValues)) : dispatch(userSignInInitiate(formValues))
        }else{
            setFromError(error)
            console.log(error)
        }
    }

    const signUpFrom = (
        <ModalMainContent>
                <Row>
                <FormWrapper>
                    <FormWrapper.Group widths='equal'>
                        <FormWrapper.Input 
                            label="First Name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={first_name}
                            error={formError.first_name}
                            onChange={inputChangeHandler}
                        />
                        <FormWrapper.Input 
                            label="Last Name" 
                            name="last_name"
                            type="text" 
                            placeholder="Last Name"
                            value={last_name}
                            onChange={inputChangeHandler}
                        />
                    </FormWrapper.Group>
                    <FormWrapper.Input 
                        label="E-mail" 
                        name="email"
                        type="email"
                        placeholder="Enter your e-mail"
                        value={email}
                        error={formError.email}
                        onChange={inputChangeHandler} 
                        />
                    <FormWrapper.Input 
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password" 
                        value={password}
                        error={formError.password}
                        onChange={inputChangeHandler}
                        />
                    <FormWrapper.Input
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirm_password}
                        error={formError.confirm_password}
                        onChange={inputChangeHandler}
                        />
                    <AuthBUtton onClick={formSubmitHandler}>Sign Up</AuthBUtton>
                </FormWrapper>
                </Row>
                <Row>
                    <ModalFooter>
                        <div>
                            <Icon as={FcGoogle} />
                            <Icon as={FaFacebook} />
                        </div>
                        <FooterRight>
                            Already have an Account?<Span onClick={switchFrom}>Sign In</Span>
                        </FooterRight>
                    </ModalFooter>
                </Row>
            </ModalMainContent>
    )

    const signInFrom = (
        <ModalMainContent>
                <Row>
                <FormWrapper>
                    <FormWrapper.Input 
                        label="E-mail" 
                        name="email"
                        type="email"
                        placeholder="Enter your e-mail"
                        value={email}
                        error={formError.email}
                        onChange={inputChangeHandler} 
                        />
                    <FormWrapper.Input 
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password" 
                        value={password}
                        error={formError.password}
                        onChange={inputChangeHandler}
                        />
                    <AuthBUtton onClick={formSubmitHandler}>Sign In</AuthBUtton>
                </FormWrapper>
                </Row>
                <Row>
                    <ModalFooter>
                        <div>
                            <Icon as={FcGoogle} />
                            <Icon as={FaFacebook} />
                        </div>
                        <FooterRight style={{justifyContent:'flex-end'}}>
                            Not have an Account?<Span onClick={switchFrom}>Sign Up</Span> 
                        </FooterRight>
                    </ModalFooter>
                </Row>
            </ModalMainContent>
       
    )

    return (
        <ModalTemplate
         modalTitle="Auth Modal"
         isMount={openModal}
         maxWidth="450px"
         headerTitle={isSignup?'Sign Up':'Sign In'}
         isModalOpen={closeModal}
        >
           {isSignup?signUpFrom:signInFrom}
        </ModalTemplate>
    )
}

export default Auth