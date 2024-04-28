import React, { useEffect, useState } from 'react';
import "./Dashboard.scss"
import { Table, TextInput, withTableCopy } from '@gravity-ui/uikit';
import { Loader } from '@gravity-ui/uikit';
import { Select } from '@gravity-ui/uikit';
import { useDataForDashboard } from '../../../helpers/hooks/useDataForDashboard.tsx';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {

  const [mouseTable, setMouseTable] = useState<boolean>(false)
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

  const { dataForDashboard, isDataForDashboardLoading } = useDataForDashboard()

  //**работа фильтра по группам**

  // const allGroups = 'Все группы' 

  // const { payments, isPaymentsLoading } = usePayments()

  // useEffect(() => {
  //   if (selectedGroup[0] !== allGroups) {
  //     setStudentInTable(students.filter(student => student.group === selectedGroup[0]))
  //   }
  //   if (selectedGroup[0] === allGroups) {
  //     setStudentInTable(students)
  //   }
  // }, [selectedGroup[0]])

  // const newSet = new Set()
  // students.forEach(student => {
  //   if (student.group) {
  //     newSet.add(student.group)
  //   }
  // })

  // const groups: Array<string> = Array.from(newSet);
  // groups.unshift(allGroups)  

  //*****

  const [dataInColumnsDashboard, setDataInColumnsDashboard] = useState([])

  useEffect(() => {
    if (!isDataForDashboardLoading) {
      const data = [
        {
          'ФИО': <Link to='/student/studentId'>{`${dataForDashboard[0].studentData.name} ${dataForDashboard[0].studentData.surname}` || ''}</Link>,
          'ИНН': `${dataForDashboard[0].parentData.iin}` || '',
          'ФИО родителя': `${dataForDashboard[0].parentData.name} ${dataForDashboard[0].parentData.surname}` || '',
          'Телефон родителя': `${dataForDashboard[0].parentData.phone}` || '',
          'Группа': '',
          'Дата регулярного платежа': '',
          'Сумма регулярного платежа': '',
          'Последний платеж сумма': '',
          'Дата последнего платежа': '',
          'Комментарии': '',
          'Посещаемость': '',
          'Задолженность': '',
        },
      ]
      setDataInColumnsDashboard(data)
    }
  }, [isDataForDashboardLoading])

  // вытягивание даты платежей и смена цвета в зависимости от количества дней 

  // const [tableData, setTableData] = useState<any>([])
  // const { payments, isPaymentsLoading } = usePayments()
  // studentInTable.forEach(student => {

  //   //   const payment = payments.filter(payment => payment.userId === student.userId)
  //   //   let paymentForStudent = payment[0] ? payment[0].paymentNumber : '0'
  //   //   let dateOfPayment = payment[0] ? payment[0].date.toLocaleDateString() : '-'
  //   //   let nextDateOfPayment = payment[0] ? useDateNextMonth(payment[0].date) : '-'
  //   //   let daysDifference = payment[0] ? useDaysDifference(payment[0].date) : '0'

  //   //   let colorDays = Number(daysDifference) > 14 ? 'greenColor' : Number(daysDifference) < 6 ? 'redColor' : 'yellowColor' 

  //************** */

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

  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const filteredByFioAndInn = dataInColumnsDashboard.filter(item => {
    const fioLowerCase = item['ФИО'].props.children.toLowerCase();
    const innLowerCase = item['ИНН'].toLowerCase();
    const fioSearchSelectLowerCase = searchInput.toLowerCase();

    return fioLowerCase.includes(fioSearchSelectLowerCase) || innLowerCase.includes(fioSearchSelectLowerCase);
  })

  const MyTable = withTableCopy(Table);

  return (
    <div className='dashboard'>
      <div className='dashboard__wrapperSelect'>
        <Select filterable={true} placeholder="ФИО/ИНН" onFilterChange={(value) => handleSearchInputChange(value)}></Select>
        <Select width={120} placeholder="Задолженность" />
        {/* <Select width={120} value={selectedGroup}
          onUpdate={(nextValue) => setSelectedGroup(nextValue)}
        >
          {groups.map(group => {
            return (
              <Select.Option key={group} value={group}>{group}</Select.Option>
            )
          })}
        </Select> */}
        <Select width={120} placeholder="Посещаемость 30д." />
        <Select width={120} placeholder="Платеж" />
      </div>
      <div className='dashboard__wrapperTable'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onWheel={handleWheelScroll}
      >
        {isDataForDashboardLoading ?
          <Loader className='loader' size='l' /> :
          <MyTable
            className='myTable'
            data={filteredByFioAndInn}
            columns={columns}
            verticalAlign='middle'
          />
        }
      </div>

    </div>
  )
}

export default Dashboard
