import React, { useState } from "react"
import { useTrainer } from "../../../../helpers/hooks/useTrainer";
import { useSearchParams } from "react-router-dom";
import { Sections, Student } from "../../../../helpers/types/types";
import { useMultipleStudents } from "../../../../helpers/hooks/useMultipleStudents";

export const TrainerGrops = () => {
    const user = Meteor.user();
    const { trainer } = useTrainer(user?._id);
    const { students } = useMultipleStudents()

    const [pageloading, setPageloading] = useState<boolean>(false)
    const [groups, setGroups] = useState<string[]>([])
    const [subGroups, setSubGroups] = useState<Sections[]>([])
    let sectionsNameTrainer: string[] = []

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionParams = searchParams.get('section') || ''
    const groupParams = searchParams.get('group') || ''
    const subGroupParams = searchParams.get('subGroup') || ''

    function filterSections(array: Sections[]) {
        return array.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.sectionName === obj.sectionName
            ))
        ).map(obj => obj.sectionName);
    }

    function filterGroups(array: Sections[]) {
        return array.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.groupName === obj.groupName
            ))
        ).map(obj => obj.groupName);
    }

    const renderGroup = (sectionName: string) => {
        const sections = trainer.sections.filter(section => section.sectionName === sectionName)
        setSearchParams({ section: sections[0].sectionName });
        const trainerGroups: string[] = filterGroups(sections)
        setSubGroups([]);
        setGroups(trainerGroups);
    }

    const renderSubGroup = (sectionName: string, groupName: string) => {
        const subGroup = trainer.sections.filter(section => section.sectionName === sectionName && section.groupName === groupName)
        setSubGroups(subGroup);
        setSearchParams({ section: sectionName, group: subGroup[0].groupName });
    }

    const activeSubGroup = (section: string, group: string, subGroup: string) => {
        setSearchParams({ section, group, subGroup });
    }

    const renderStudentInSubGroup = (section: string, group: string, subGroup: string) => {
        const studentInSubGroup: Student[] = []
        students.map(student => (student.sections.map(sectionArr =>
            sectionArr.sectionName === section &&
            sectionArr.groupName === group &&
            sectionArr.subGroup === subGroup &&
            studentInSubGroup.push(student))))

        if (!studentInSubGroup.length) {
            return (<h2>В этой группе нет учеников</h2>)
        } else {
            return (
                <div className="trainer-grops__student-group-name">
                    <h2>Секция:{section}; Группа:{group}; Подгруппа:{subGroup}</h2>
                    <h3>Список учеников:</h3>
                    <ul>
                        {studentInSubGroup.map(student => (
                            <li key={student.userId}>{student.name} {student.surname}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    if (trainer) {
        sectionsNameTrainer = filterSections(trainer.sections)
    }

    if (!pageloading && sectionParams && trainer) {
        setPageloading(true)
        if (sectionParams) {
            const sections = trainer.sections.filter(section => section.sectionName === sectionParams)
            const trainerGroups: string[] = filterGroups(sections)
            setGroups(trainerGroups)
        }
        if (sectionParams) {
            const subGroup = trainer.sections.filter(section => section.sectionName === sectionParams && section.groupName === groupParams)
            setSubGroups(subGroup);
        }
    }

    if (trainer) {
        return (
            <div className="trainer-grops">
                <h2>Мои группы</h2>
                <div className="trainer-grops__sections">
                    {sectionsNameTrainer && sectionsNameTrainer.map((section) => (
                        <button key={section} onClick={() => renderGroup(section)} className="btn btn-secondary">{section}</button>
                    ))
                    }
                </div>
                <div className="trainer-grops__groups">
                    {groups && groups.map(group => (
                        <button key={group}
                            onClick={() => renderSubGroup(sectionParams, group)}
                            className="btn btn-secondary">{group}</button>
                    ))}
                </div>
                <div className="trainer-grops__sub-group">
                    {subGroups.map((groupArr, index) => (
                        <button key={index}
                            onClick={() => activeSubGroup(sectionParams, groupParams, groupArr.subGroup)}
                            className="btn btn-secondary">{groupArr.subGroup}</button>
                    ))}
                </div>
                <div className="trainer-grops__student-group">
                    {students && sectionParams && groupParams && subGroupParams &&
                        renderStudentInSubGroup(sectionParams, groupParams, subGroupParams)}
                </div>
            </div>
        )
    }
}