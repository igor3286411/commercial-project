import React, { FC, useContext, useRef, useState } from 'react';
import { Button, Popup, TextInput } from '@gravity-ui/uikit';
import { Ellipsis } from '@gravity-ui/icons';
import { useSearchParams } from 'react-router-dom';
import { SectionContext } from '../SectionContext';

interface ButtonAndInputProps {
    id?: string
    textButton: string;
    typeButton: string;
    index: number;
}

export const ButtonAndInput: FC<ButtonAndInputProps> = ({ id, textButton, typeButton, index }) => {

    const { clickRedactContext, setClickRedactContext } = useContext(SectionContext);
    const boxRef = useRef(null);
    const [RedactInput, setRedactInput] = useState<string>(textButton)
    const [clickRedactName, setClickRedactName] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const sectionActiveParams = searchParams.get('section') || ''
    const fieldActiveParams = searchParams.get('fieldId') || ''
    const dayActiveParams = searchParams.get('day') || ''
    const timeActiveParams = searchParams.get('time') || ''
    const groupActiveParams = searchParams.get('group') || ''

    const sectionParams = (section: string) => {
        setSearchParams({ section })
    }

    const fieldParams = (section: string, fieldId: string) => {
        setSearchParams({ section, fieldId })
    }

    const dayParams = (section: string, fieldId: string, day: string) => {
        setSearchParams({ section, fieldId, day })
    }

    const timeParams = (section: string, fieldId: string, day: string, time: string) => {
        setSearchParams({ section, fieldId, day, time })
    }

    const groupParams = (section: string, fieldId: string, day: string, time: string, group: string) => {
        setSearchParams({ section, fieldId, day, time, group })
    }

    const handleClick = (type: string, index: number) => {
        setClickRedactContext([{
            id: type + index, isOpen: true
        }])
    };

    const handleChange = (e: any) => {
        setRedactInput(e.target.value);
    };

    const clickRedactButton = (type: string, index: number) => {
        setClickRedactName(true)
        setClickRedactContext([{
            id: type + index, isOpen: false
        }])
    }

    const inputSubmit = (event: React.FormEvent<HTMLFormElement>, typeName: string,) => {
        event.preventDefault()
        // console.log('Изменено: ' + RedactInput + typeName);
        setClickRedactName(false)
    }

    const clickDelete = (section: string, group: string, subGroup: string) => {
        // console.log(`Удалить ${section}/${group}/${subGroup}`);
    }

    if (typeButton === "group") {
        return (
            <div ref={boxRef}>
                {clickRedactName ?
                    <form onSubmit={(e) => inputSubmit(e, typeButton)}>
                        <TextInput size="l" value={RedactInput} onChange={handleChange} />
                    </form> : <div className='add-sections__menu-section-button'>
                        <Button
                            className='add-sections__menu-section-button-text'
                            onClick={() => groupParams(sectionActiveParams, fieldActiveParams, dayActiveParams, timeActiveParams, textButton)}
                            view={groupActiveParams === textButton ? "action" : "outlined"}
                            size="l"
                            pin="round-clear">{RedactInput}
                        </Button>
                        <Button
                            view={groupActiveParams === textButton ? "action" : "outlined"} size="l"
                            pin="brick-round"
                            onClick={() => handleClick(typeButton, index)}
                            className='add-sections__menu-section-dots'><Ellipsis /></Button>
                    </div>}
                {<Popup onClose={() => setClickRedactContext([])} altBoundary={true} anchorRef={boxRef}
                    open={Boolean(clickRedactContext.find(item => item.id === typeButton + index && item.isOpen === true))}
                    placement="bottom-end">
                    <div onClick={() => clickRedactButton(typeButton, index)} className='add-sections__menu-section-popup-edit'>Изменить</div>
                    <div onClick={() => clickDelete(sectionActiveParams, groupActiveParams, textButton)} className='add-sections__menu-section-popup-edit'>Удалить</div>
                </Popup>}
            </div>
        )
    }

    if (typeButton === "field") {
        return (
            <Button
                className='add-sections__menu-section-button-text'
                onClick={() => fieldParams(sectionActiveParams, textButton)}
                view={fieldActiveParams === textButton ? "action" : "outlined"}
                size="l">{RedactInput}
            </Button>
        )
    }

    if (typeButton === "day") {
        return (
            <Button
                className='add-sections__menu-section-button-text'
                onClick={() => dayParams(sectionActiveParams, fieldActiveParams, textButton)}
                view={dayActiveParams === textButton ? "action" : "outlined"}
                size="l">{RedactInput}
            </Button>
        )
    }
    if (typeButton === "time") {
        return (
            <Button
                className='add-sections__menu-section-button-text'
                onClick={() => timeParams(sectionActiveParams, fieldActiveParams, dayActiveParams, textButton)}
                view={timeActiveParams === textButton ? "action" : "outlined"}
                size="l">{RedactInput}
            </Button>
        )
    }

    if (typeButton === "section") {
        return (
            <div ref={boxRef}>
                {clickRedactName ?
                    <form onSubmit={(e) => inputSubmit(e, typeButton)}>
                        <TextInput size="l" value={RedactInput} onChange={handleChange} />
                    </form> :
                    <div className='add-sections__menu-section-button'>
                        <Button
                            className='add-sections__menu-section-button-text'
                            onClick={() => sectionParams(textButton)}
                            view={sectionActiveParams === textButton ? "action" : "outlined"}
                            size="l"
                            pin="round-clear">{RedactInput}
                        </Button>
                        <Button
                            view={sectionActiveParams === textButton ? "action" : "outlined"} size="l"
                            pin="brick-round"
                            onClick={() => handleClick(typeButton, index)}
                            className='add-sections__menu-section-dots'><Ellipsis /></Button>
                    </div>}
                {<Popup onClose={() => setClickRedactContext([])} altBoundary={true} anchorRef={boxRef}
                    open={Boolean(clickRedactContext.find(item => item.id === typeButton + index && item.isOpen === true))}
                    placement="bottom-end">
                    <div onClick={() => clickRedactButton(typeButton, index)} className='add-sections__menu-section-popup-edit'>Изменить</div>
                    <div onClick={() => clickDelete(sectionActiveParams, groupActiveParams, textButton)} className='add-sections__menu-section-popup-edit'>Удалить</div>
                </Popup>}
            </div>
        )
    }
}