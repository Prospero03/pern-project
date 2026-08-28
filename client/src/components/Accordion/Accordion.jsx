import React, { useState } from 'react'
import './Accordion.scss'

const Accordion = (props) => {
    const {
        list = [
            {
                name:'Название',
                description: 'Описание',
            },
            {
                name:'Название',
                description: 'Описание',
            },
        ]
    } = props

    const [openId, setOpenId] = useState([])
    const clickHandler = (id) => {
        setOpenId(id=== openId ? null : id);
    }
    // открытие нескольких
    // const clickHandler = (id) => {
    //     setOpenId(openId.includes(id)
    //         ? openId.filter((openId) => openId !== id)
    //         : [...openId, id]
    //     )
    // }
    return (
        <div className='accordion'>
            {list?.map((item, key)=>{
                const isOpen = key === openId
                // const isOpen = openId.includes(key)
                return(
                    <div className='accordion__item' key={key}>
                        <button className='accordion__header'
                                type='button'
                                onClick={()=>clickHandler(key)}
                                aria-expanded={isOpen}>
                                <span className='accordion__title'>{item.name}</span>
                                <span className={`accordion__icon ${isOpen ? 'open' : ''}`}></span>
                        </button>
                        <div className={`accordion__collapse ${isOpen ? 'open' : ''}`}>
                            <div className="accordion__body">
                                <span className="accordion__description">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Accordion