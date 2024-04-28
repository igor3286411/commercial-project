import React, { useEffect, useState } from 'react';
import "./Dashboard.scss"
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents.tsx';
import { Table, TextInput, withTableCopy } from '@gravity-ui/uikit';
import { Loader } from '@gravity-ui/uikit';
import { Select } from '@gravity-ui/uikit';
import { IStudentData } from './studentData.ts';
import Comment from './Comment.tsx';
import { useComments } from '../../../helpers/hooks/useComments.tsx';
import { usePayments } from '../../../helpers/hooks/usePayments.tsx';
import useDateNextMonth from '../../../helpers/hooks/useDateNextMonth.tsx';
import useDaysDifference from '../../../helpers/hooks/useDaysDifference.tsx';
import { useAttendances } from '../../../helpers/hooks/useAttendances.tsx';
import { useParent } from '../../../helpers/hooks/useParent.tsx';
import { useStudentsByParent } from '../../../helpers/hooks/useStudentsByParent';
import { useMultipleParents } from '../../../helpers/hooks/useMultipleParents.tsx';
import { Students } from '../../../api/students/Students.tsx'
import { Parents } from '../../../api/parents/Parents.tsx'
import { useDashboardData } from '../../../helpers/hooks/useDashboardData.tsx';

const Dashboard: React.FC = () => {

  const allGroups = 'Все группы'
  const { students, isStudentsLoading } = useMultipleStudents()

  const { payments, isPaymentsLoading } = usePayments()

  const [selectedGroup, setSelectedGroup] = useState<string[]>([allGroups])
  const [studentInTable, setStudentInTable] = useState(students)
  const [mouseTable, setMouseTable] = useState<boolean>(false)

  //-------------------

  const dashboardData = useDashboardData([Students, Parents]);
  //--------------


  useEffect(() => {
    setStudentInTable(students)
  }, [isStudentsLoading])

  useEffect(() => {
    if (selectedGroup[0] !== allGroups) {
      setStudentInTable(students.filter(student => student.group === selectedGroup[0]))
    }
    if (selectedGroup[0] === allGroups) {
      setStudentInTable(students)
    }
  }, [selectedGroup[0]])

  const newSet = new Set()
  students.forEach(student => {
    if (student.group) {
      newSet.add(student.group)
    }
  })

  const groups: Array<string> = Array.from(newSet);
  groups.unshift(allGroups)

  const MyTable = withTableCopy(Table);

  const dataStub = { // временные заглушки 
    'ИНН': '7642198235',
    'ФИО родителя': 'Сергей Викторович',
    'Дата последней оплаты': '20.02.2024',
    'Статус оплаты и посещение': '+',
    'Выставить счет': '50 $',
    'Следующая оплата': '20.03.2024',
    'Посещаемость': '+',
    'Дней до оплаты': '29',
    'Задолженность': 'нет',
  }

  const data: IStudentData[] = [];
  const [tableData, setTableData] = useState<any>([])
  studentInTable.forEach(student => {

    const payment = payments.filter(payment => payment.userId === student.userId)
    let paymentForStudent = payment[0] ? payment[0].paymentNumber : '0'
    let dateOfPayment = payment[0] ? payment[0].date.toLocaleDateString() : '-'
    let nextDateOfPayment = payment[0] ? useDateNextMonth(payment[0].date) : '-'
    let daysDifference = payment[0] ? useDaysDifference(payment[0].date) : '0'

    let colorDays = Number(daysDifference) > 14 ? 'greenColor' : Number(daysDifference) < 6 ? 'redColor' : 'yellowColor'


    data.push({
      // 'ФИО': `${student.name} ${student.surname}`,
      'ИНН': dataStub['ИНН'],
      // 'ФИО родителя': `${dataStub['ФИО родителя']} ${student.phone}`,
      // 'Телефон родителя': student.phone,
      // 'Группа': student.group,
      'Дата последней оплаты': `${dateOfPayment}`,
      'Статус оплаты и посещение': dataStub['Статус оплаты и посещение'],
      'Выставить счет': `${paymentForStudent} тг`,
      'Следующая оплата': `${nextDateOfPayment}`,
      // 'Посещаемость': `${attendancesStudent}`,
      // 'Комментарии': <Comment comment={comments ? comments : '-'} />,
      'Дней до оплаты': <span className={`${colorDays}`}>{daysDifference}</span>,
      'Задолженность': dataStub['Задолженность'],
    })


  })

  const columns = [
    { id: 'ФИО' },
    { id: 'ИНН' },
    { id: 'ФИО родителя' },
    { id: 'Телефон родителя' },
    { id: 'Группа' },
    { id: 'Дата регулярного платежа' },
    { id: 'Сумма регулярного платежа' },
    { id: 'Последний платеж сумма' },
    { id: 'Дата последнего платежа' },
    { id: 'Комментарии' },
    { id: 'Посещаемость' },
    { id: 'Задолженность' },
  ];

  const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (mouseTable) {
      const container = document.querySelector('.dashboard__wrapperTable');

      if (container) {
        container.scrollLeft += event.deltaY;
      }
    }
  };

  useEffect(() => {
    const handleDocumentWheel = (event: WheelEvent) => {
      if (mouseTable) {
        event.preventDefault();
      }
    };

    document.addEventListener('wheel', handleDocumentWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleDocumentWheel);
    };
  }, [mouseTable]);

  const onMouseEnter = () => {
    setMouseTable(true)
  }

  const onMouseLeave = () => {
    setMouseTable(false)
  }

  return (
    <div className='dashboard'>
      <div className='dashboard__wrapperSelect'>
        <TextInput className='search' placeholder="ФИО/ИНН" disabled />
        <Select width={120} placeholder="Задолженность" />
        <Select width={120} value={selectedGroup}
          onUpdate={(nextValue) => setSelectedGroup(nextValue)}
        >
          {groups.map(group => {
            return (
              <Select.Option key={group} value={group}>{group}</Select.Option>
            )
          })}
        </Select>
        <Select width={120} placeholder="Посещаемость 30д." />
        <Select width={120} placeholder="Платеж" />
      </div>
      <div className='dashboard__wrapperTable'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onWheel={handleWheelScroll}
      >
        {isStudentsLoading ?
          <Loader className='loader' size='l' /> :
          <MyTable
            className='myTable'
            data={data}
            columns={columns}
            verticalAlign='middle'
          />
        }
      </div>

    </div>
  )
}

export default Dashboard
