import React, { useState } from 'react';
import { PencilToSquare } from '@gravity-ui/icons';
import { CircleCheck } from '@gravity-ui/icons';
import { TextInput } from '@gravity-ui/uikit';
import "./Dashboard.scss"
import { useComments } from '../../../helpers/hooks/useComments';
import { string } from 'yup';

interface IComment {
  comment?: string
  // userType: string
  // userId: string
}

const Comment: React.FC<IComment> = ({ comment }) => {
  // const { comments, isCommentsLoading } = useComments(userType, userId)

  const [commentInside, setCommentInside] = useState(comment)
  const [isEditMode, setIsEditMode] = useState(false);


  const correctComment = () => {
    setIsEditMode(true)
  }

  const sendingValue = () => {
    // ф-ция для обновления комментария 

    setIsEditMode(false)

  }

  return (
    <div className='wrapperComment'>
      {isEditMode ?
        <div className='comment'>
          <TextInput value={commentInside ? commentInside : '-'} onUpdate={(nextValue) => setCommentInside(nextValue)} />
          <div className='icon' onClick={sendingValue}><CircleCheck /></div>
        </div>
        :
        <div className='comment'>
          {commentInside ? commentInside : '-'}
          <div className='icon' onClick={correctComment}><PencilToSquare /></div>
        </div>
      }
    </div>
  )


}

export default Comment;
