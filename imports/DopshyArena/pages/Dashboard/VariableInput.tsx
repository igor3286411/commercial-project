import React, { useState } from 'react';
import { PencilToSquare } from '@gravity-ui/icons';
import { CircleCheck } from '@gravity-ui/icons';
import { TextInput } from '@gravity-ui/uikit';
import "./Dashboard.scss"



interface IVariableInput {
  dateInput?: string
}

const VariableInput: React.FC<IVariableInput> = ({ dateInput }) => {


  const [dateInputInside, setDateInputInside] = useState(dateInput)
  const [isEditMode, setIsEditMode] = useState(false);


  const correctInput = () => {
    setIsEditMode(true)
  }

  const sendingValue = () => {
    // ф-ция для обновления инпута 

    setIsEditMode(false)

  }

  return (
    <div className='wrapperInput'>
      {isEditMode ?
        <div className='input'>
          <TextInput value={dateInputInside ? dateInputInside : '-'} onUpdate={(nextValue) => setDateInputInside(nextValue)} />
          <div className='icon' onClick={sendingValue}><CircleCheck /></div>
        </div>
        :
        <div className='input'>
          {dateInputInside ? dateInputInside : '-'}
          <div className='icon' onClick={correctInput}><PencilToSquare /></div>
        </div>
      }
    </div>
  )


}

export default VariableInput;
