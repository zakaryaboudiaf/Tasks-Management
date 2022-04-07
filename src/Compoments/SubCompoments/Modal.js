import React from 'react'

const Modal = (props) => {

    const { show , status , messages } = props.modalObj

    return (
        <div className={`modal ${status}`}>
            {
                messages.map((item , index) => {
                    return(
                        <p key={index}>{item}</p>
                    )
                })
            }
        </div>
    )
}

export default Modal