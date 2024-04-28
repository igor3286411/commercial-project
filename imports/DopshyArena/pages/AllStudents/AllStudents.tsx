import React, { useState } from 'react';
import { useSections } from '../../../helpers/hooks/useSections';
import { Student } from '../../../helpers/types';
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents';

const AllStudents = () => {
    const [selectSection, setSelectSection] = useState<string>();
    const [selectGroup, setSelectGroup] = useState<string>();
    const [selectSubGroup, setSelectSubGroup] = useState<string>();
    const [student, setStudent] = useState<Student>();
    const { students } = useMultipleStudents();
    const { sections } = useSections();
    const section = sections.filter(section => section.section === selectSection)[0];

    const handleChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        state: React.Dispatch<React.SetStateAction<string | undefined>>,
        student?: Student | undefined
    ) => {
        state(event.target.value);
        setStudent(student)
    };

    const renderSelectGroups = () => {
        if (selectSection) {
            return (
                <div>
                    <select id="groupsList" onChange={(event) => handleChange(event, setSelectGroup, student)}>
                        <option value="">-- Выберите --</option>
                        {section.groups.map((item) => (
                            <option>
                                {item.groupName}
                            </option>
                        ))}
                    </select>
                    {renderSelectSubGroups()}
                </div>
            );
        }
    }

    const renderSelectSubGroups = () => {
        if (selectGroup) {
            const group = section.groups.filter(group => group.groupName === selectGroup)[0]
            return (
                <select id="groupsList" onChange={(event) => handleChange(event, setSelectSubGroup, student)}>
                    <option value="">-- Выберите --</option>
                    {group.subGroupName.map((item) => (
                        <option>
                            {item}
                        </option>
                    ))}
                </select>
            );
        }
    }


    const insertGroupForStudents = () => {
        if (selectSection && selectGroup && selectSubGroup && student) {
            Meteor.call('students.toGroup', student.userId, selectSection, selectGroup, selectSubGroup)
        }
    }

    const studentsRender = () => {
        return students.map(student => {
            return (
                <tr key={student.userId}>
                    <td>
                        <div>
                            <div style={{ width: '200px', marginLeft: '10px' }}>
                                {/* <img style={{ width: '100%' }} src={`data:image/png;base64,${photo?.imageData}`} alt="" /> */}
                            </div>
                            <div>
                                {student.name} {student.surname}
                            </div>
                            <div>
                                <select id="groupsList" onChange={(event) => handleChange(event, setSelectSection, student)}>
                                    <option value="">-- Выберите --</option>
                                    {sections.map((item) => (
                                        <option>
                                            {item.section}
                                        </option>
                                    ))}
                                </select>
                                {renderSelectGroups()}
                            </div>
                            <button onClick={insertGroupForStudents}>Задать группу</button>
                        </div>
                    </td>
                </tr >
            );
        });
    };

    return (
        <div className='container'>
            {studentsRender()}
        </div>
    )
}

export default AllStudents;