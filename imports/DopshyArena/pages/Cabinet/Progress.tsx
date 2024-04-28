import React from 'react'
import { Table } from '@gravity-ui/uikit'
import { useGetStudentsOrParents } from '../../../helpers/hooks/useGetStudentsOrParents'
import { useComments } from '../../../helpers/hooks/useComments'
import { Spin, Button, Icon } from '@gravity-ui/uikit'
import { CaretDown } from '@gravity-ui/icons';
import './ChildAnalytics.scss'

const Progress = () => {

    const userId = Meteor.user()?.profile?.userId
    const { data, isDataLoading } = useGetStudentsOrParents('student', userId);
    const fullName = data[0]?.name + ' ' + data[0]?.surname
    const date = ['25 feb', '26 feb']
    const progress = ['Some achievements', 'More achievements']
    const records = ['https://drive.google.com/111', 'https://drive.google.com/222']
    const comments = useComments('student', userId)

    const recordsLinks = records.map((link, index) => (
        <div key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
                Link {index + 1}
            </a>
        </div>
    ))

    const headers = ['Дата', 'Достижения', 'Фото-видео материалы', '*Комментарий']

    const columns = [];
    for (let i = 0; i < headers.length; i++) {
        const object = { id: headers[i] }; columns.push(object);
    }

    const ndata = [];

    for (let i = 0; i < 2; i++) {
        const obj = {
            [headers[0]]: date[i],
            [headers[1]]: progress[i],
            [headers[2]]: recordsLinks[i]
        };
        ndata.push(obj);
    }

    return (
        <>
            {
                !isDataLoading ? <div className='container'>

                    <h3>Прогресс {fullName}</h3>
                    <div className='search_buttons'>
                        <Button view="outlined">
                            Обновление
                            <Icon data={CaretDown} size={16} />
                        </Button>
                    </div>
                    <Table data={ndata}
                        columns={columns}
                    />
                </div> : <div className='container'><Spin size='xl' /></div>
            }
        </>
    )
}

export default Progress