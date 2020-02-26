import React from 'react'
import './button.scss'

const ButtonItem = ({text, classes, type, onClick, disabled})=>{
    
    const classBtn = ['button__primary']

    switch(type) {
        case "send":
            classBtn.push('button__primary--send')
            break
        case "cancel":
            classBtn.push('button__primary--cancel')
            break
        case "edit":
            classBtn.push('button__primary--edit')
            break
        case "delete":
            classBtn.push('button__primary--delete')
            break
        case "comments":
            classBtn.push('button__primary--comments')
            break
        default:
            break 
    }

    return(
        <button
        disabled={disabled}
        className={classBtn.join(" ").concat(` ${classes}`)}
        onClick={onClick}
        >{text}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )

}

export default ButtonItem