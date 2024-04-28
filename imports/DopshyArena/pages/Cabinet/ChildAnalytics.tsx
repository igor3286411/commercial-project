import React, { useState } from 'react'
import { Table } from '@gravity-ui/uikit'
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents'
import { useMultipleParents } from '../../../helpers/hooks/useMultipleParents'
import { useAttendances } from '../../../helpers/hooks/useAttendances'
import { useComments } from '../../../helpers/hooks/useComments'
import { Spin, TextArea, Button, Icon } from '@gravity-ui/uikit'
import { Magnifier, CaretDown } from '@gravity-ui/icons';
import './ChildAnalytics.scss'

const ChildAnalytics = () => {
    const { students, isStudentsLoading } = useMultipleStudents();
    const { parents } = useMultipleParents()
    //@ts-ignore
    const trainerId = Meteor.user()?.profile?.userId
    const { comments } = useComments('trainer', trainerId)
    const today = new Date().toString()

    const { attendances } = useAttendances('students');

    const [studentComments, setStudentComments] = useState<{ [key: string]: string }>({});

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, studentId: string) => {
        setStudentComments(prevState => ({
            ...prevState,
            [studentId]: event.target.value,
        }));
    };

    const saveComment = (studentId: string, comment: string) => {
        const currentComment = comments.find(comment => comment.studentId === studentId && comment.trainerId === trainerId);

        if (currentComment) {
            comment.length > 0 ? Meteor.call('comments.edit', currentComment._id, comment) : alert('Пустой комментарий');
        } else {
            comment.length > 0 ? Meteor.call('comments.insert', studentId, trainerId, today, comment) : alert('Пустой комментарий');
        }

        // setStudentComments(prevState => {
        //     let newState = { ...prevState };
        //     newState[studentId] = '';
        //     return newState;
        // })
    }

    const handleKeyPress = (studentId: string, event?: any) => {
        if (event.key === "Enter") {
            event.preventDefault()
            saveComment(studentId, studentComments[studentId]);
        }
    };

    const fullNameStudents = students.map(student => `${student.name} ${student.surname} `)

    const checkedIIN: any[] = [];

    students.forEach(student => {
        if (student.userId) {
            const parent = parents.find(parent => parent.childrenUserId.includes(student.userId));
            if (parent) {
                checkedIIN.push(parent.iin);
            } else {
                checkedIIN.push('');
            }
        }
    });

    const headers = ['Имя Фамилия (ребенок)', 'ИИН', 'Комментарий', 'Посещаемость']

    const columns = [];
    for (let i = 0; i < headers.length; i++) {
        const object = { id: headers[i] }; columns.push(object);
    }

    const commentsArray = students.map((student, i) => {

        const defaultCommentForStudent = comments.find(comment => comment.studentId === student.userId)
        return (
            <TextArea
                key={i}
                defaultValue={defaultCommentForStudent?.comment}
                value={studentComments[student.userId]}
                onChange={(event) => handleChange(event, student.userId,)}
                onKeyDown={(event) => { handleKeyPress(student.userId, event) }}
            />
        )
    });

    const attendancesDaysWithMonth = students.map((student, i) => {
        const attendancesAmount = attendances.filter(attendance => attendance.students.includes(student.userId)).length

        return (
            <div>{attendancesAmount}</div>
        )
    })

    const ndata = [];

    for (let i = 0; i < fullNameStudents.length; i++) {
        const obj = {
            [headers[0]]: fullNameStudents[i],
            [headers[1]]: checkedIIN[i],
            [headers[2]]: commentsArray[i],
            [headers[3]]: attendancesDaysWithMonth[i]

        };
        ndata.push(obj);
    }

    return (
        <>
            {
                !isStudentsLoading ? <div className='container'>
                    <div className='search_buttons'>
                        <Button view="outlined">
                            <Icon data={Magnifier} size={12} />
                            ФИО</Button>
                        <Button view="outlined">
                            <Icon data={Magnifier} size={12} />
                            ИИН</Button>
                        <Button view="outlined">
                            Группа
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

export default ChildAnalytics