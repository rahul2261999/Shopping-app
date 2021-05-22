import React from 'react'
import {IoClose} from 'react-icons/io5'
import AriaModal from 'react-aria-modal'

import {ModalBody,ModalHeader,Icon} from './style'

const ModalTemplate = props=>{
    const {
        modalTitle,
        isMount,
        headerTitle,
        isModalOpen,
        maxWidth
    } = props

    return(
        <AriaModal
         titleText={modalTitle}
         mounted={isMount}
         focusDialog
         verticallyCenter
         underlayClickExits
        >
            <ModalBody maxWidth={maxWidth}>
                <ModalHeader>
                    <div>{headerTitle}</div>
                    <Icon as={IoClose} onClick={()=>isModalOpen(false)} />
                </ModalHeader>
                {props.children}
            </ModalBody>
        </AriaModal>
    )
}

export default ModalTemplate