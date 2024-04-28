import React, { useCallback, useEffect, useMemo, useState } from 'react';
import "./AllTrainers.scss"
import { useMultipleTrainers } from '../../../helpers/hooks/useMultipleTrainers';
import { ControlGroupOption, Select, SelectOption, Table, TextInput, withTableCopy } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';
import { useSections } from '../../../helpers/hooks/useSections';
import { useDaysByFieldId } from '../../../helpers/hooks/useDaysByFieldId';
import { useFields } from '../../../helpers/hooks/useFields';

interface TrainerData {
    [key: string]: string | Array<string>; // sections теперь объявлен как массив строк
}

const MyTable = withTableCopy(Table);

const AllTrainers = () => {
    const [dataInColumns, setDataInColumns] = useState([])
    const { trainers, isTrainersLoading } = useMultipleTrainers();
    const { sections } = useSections();
    const [trainersData, setTrainersData] = useState<TrainerData[]>([]);

    const { fields } = useFields();

    const currentTrainerData = (trainerId: string) => {
        return trainersData.find(trainer => trainer.trainerId === trainerId)
    }

    console.log(trainers)

    const data = trainers.map(trainer => ({
        trainerId: trainer.userId,
        sections: trainer.sections
    }));

    if (data.length > 0) {
        if (JSON.stringify(trainersData) !== JSON.stringify(data) && data.length > 0) {
            //@ts-ignore
            setTrainersData(data)
        }
    }

    const handleChange = (
        key: string,
        value: string[],
        trainerId: string,
        indexData: number
    ) => {
        setTrainersData(prevState => {
            const newState = [...prevState];
            const changeState = newState.find((trainer) => trainer.trainerId === trainerId);

            if (changeState) {
                if (changeState.sections.length > 0) {
                    //@ts-ignore
                    changeState.sections.map((section, index) => {
                        console.log(section)
                        if (indexData === index) {
                            section[key] = value[0]

                            Meteor.call('trainers.toGroup', trainerId, section.sectionName, section.fieldName,
                                section.days, section.subGroupName, index)
                        }
                    })
                } else {
                    //@ts-ignore
                    changeState.sections.push({
                        [key]: value[0]
                    });
                    //@ts-ignore
                    changeState.sections.map((section, index) => Meteor.call('trainers.toGroup', trainerId, section.sectionName,
                        section.groupName, section.subGroupName, index))
                }

            } else {

                newState.push({
                    trainerId,
                    [key]: value[0]
                });

            }
            return newState;
        });
    };


    const renderSelectSection = (trainerId: string, sectionData: any, index: number) => {
        return (
            <div>
                <Select width={120} placeholder='Секции' defaultValue={[sectionData?.sectionName || null]}
                    onUpdate={(nextValue) => handleChange('sectionName', nextValue, trainerId, index)}
                >
                    {sections.map(item => {
                        return (
                            <Select.Option key={item.sectionName} value={item.sectionName}>{item.sectionName}</Select.Option>
                        )
                    })}
                </Select>
            </div>
        )
    };

    const renderSelectGroups = (trainerId: string, sectionData: any, index: number) => {
        const currentData = currentTrainerData(trainerId)

        if (currentData) {
            const section = sections.find(section => section.sectionName === sectionData.sectionName)
            return (
                <Select width={120} placeholder='Дни'
                    defaultValue={[sectionData?.groupName || null]}
                    onUpdate={(nextValue) => handleChange('days', nextValue, trainerId, index)}
                >
                    {section?.groups?.map(item => {

                        return (
                            <Select.Option key={item.groupName} value={item.groupName}>{item.groupName}</Select.Option>
                        )
                    })}
                </Select>
            )
        }
    };

    const renderSelectSubGroups = (trainerId: string, sectionData: any, index: number) => {
        if (sectionData) {
            const group =
                sections.find(section => section.section === sectionData.sectionName)?.groups?.find(group => group.groupName === sectionData.groupName)
            return (
                <Select width={120} placeholder='Группы'
                    defaultValue={[sectionData.subGroupName || null]}
                    onUpdate={(nextValue) => handleChange('groupName', nextValue, trainerId, index)}
                >
                    {group?.subGroupName.map(item => {
                        return (
                            <Select.Option key={item} value={item}>{item}</Select.Option>
                        )
                    })}
                </Select>
            )
        }
    };

    const renderSelectFields = (trainerId: string, fieldData: any, index: number) => {

        return (
            <Select width={120} placeholder='Поле'
                defaultValue={[fieldData.fieldName || null]}
                onUpdate={(nextValue) => handleChange('fieldName', nextValue, trainerId, index)}
            >
                {fields?.map(field => {
                    return (
                        <Select.Option key={field.fieldId} value={field.fieldName}>{field.fieldName}</Select.Option>
                    )
                })}
            </Select>
        )
    };

    const renderSelectDays = (trainerId: string, scheduleData: any, index: number) => {
        console.log(scheduleData)
        return (
            <Select width={120} placeholder='Дни'
                defaultValue={[trainersData.days || null]}
                onUpdate={(nextValue) => handleChange('days', nextValue, trainerId, index)}
            >
                {/* <Select.Option key={fieldData.fieldId} value={fieldData.fieldName}>{fieldData.fieldName}</Select.Option> */}
                {fields?.map(field => {
                    return (
                        <Select.Option key={field.schedule} value={field.days}>{field.days}</Select.Option>
                    )
                })}
            </Select>
        )
    };
    useEffect(() => {
        if (!isTrainersLoading) {
            const data: object[] = [];
            trainers?.forEach((trainer, index) => {
                const trainerData = currentTrainerData(trainer.userId);
                if (trainerData) {
                    const sections = Array.isArray(trainerData.sections) ? trainerData.sections : [trainerData.sections];
                    data.push({
                        'Тренера': trainer.name,
                        'Секции':
                            <div className='wrapperSelect'>
                                {sections.length > 0 ? sections.map((item, index) => renderSelectSection(trainer.userId, item, index)) :
                                    renderSelectSection(trainer.userId, undefined, index)
                                }

                            </div>,
                        'Поле':
                            <div>
                                {sections.map((item, index) => renderSelectFields(trainer.userId, item, index))}
                            </div>,
                        'Дни':
                            <div>
                                {sections.map((item, index) => renderSelectDays(trainer.userId, item, index))}
                            </div>,
                        'Группы':
                            <div>
                                {sections.map((item, index) => renderSelectSubGroups(trainer.userId, item, index))}
                            </div>,
                    });
                }
            });
            if (JSON.stringify(dataInColumns) !== JSON.stringify(data)) {
                //@ts-ignore
                setDataInColumns(data);
            }
        }
    }, [renderSelectSection]);



    const columns = [
        { id: 'Тренера' },
        { id: 'Секции' },
        { id: 'Поле' },
        { id: 'Дни' },
        { id: 'Группы' },
    ];

    return (
        <div className='container'>
            <div className='wrapperFilter'>
                <TextInput className='wrapperFilter__searchTrainer' placeholder="Тренер" leftContent={<Magnifier />} disabled />
                <TextInput placeholder="Группа" leftContent={<Magnifier />} disabled />
            </div>
            <MyTable
                className='myTable'
                data={dataInColumns}
                columns={columns}
            />
        </div>
    )
}

export default AllTrainers;
