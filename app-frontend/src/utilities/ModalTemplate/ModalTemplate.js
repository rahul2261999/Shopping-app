import React from 'react'
import {IoClose} from 'react-icons/io5'
import AriaModal from 'react-aria-modal'

import {ModalBody,ModalHeader,Icon} from './style'
import Classes from './styles.module.css'

const ModalTemplate = props=>{
    const {
        modalTitle,
        isMount,
        headerTitle,
        isModalOpen,
        maxWidth
    } = props


    // const modalUnderlayStyle = {
    //     'position': 'fixed',
    //     'top': 0,
    //     'left': 0,
    //     'width': '100%',
    //     'height': '100%',
    //     'z-index': '1050',
    //     'overflow': 'hidden auto',
    //     'text-align': 'center',
    //     'background': 'rgba(0, 0, 0, 0.5)',
    //     'cursor': 'pointer',
    // }
    // const modalDialogeStyle = {
    //     'display': 'inline-block',
    //     'text-align': 'left',
    //     'top': 0,
    //     'max-width':'100%',
    //     'cursor': 'default',
    //     'outline': 0,
    //     '@media screen and (max-width:600px)':{
    //         'display': 'flex',
    //         'align-items':'flex-end',
    //         'height': '100%'
    //     }
    // }

    return(
        <AriaModal
         titleText={modalTitle}
         mounted={isMount}
         focusDialog
         underlayClass={Classes.modalUnderlay}
         dialogClass={Classes.modelDialoge}
         includeDefaultStyles={false}
         underlayClickExits
        >
            <ModalBody maxWidth={maxWidth}>
                <ModalHeader>
                    <div>{headerTitle}</div>
                    <Icon as={IoClose} onClick={isModalOpen} />
                </ModalHeader>
                {props.children}
            </ModalBody>
        </AriaModal>
    )
}

export default ModalTemplate