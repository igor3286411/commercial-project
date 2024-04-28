// import React, { useState } from 'react';
// import { useSections } from '../../../../../helpers/hooks/useSections';
// import { Form, Button } from 'react-bootstrap';

// type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// const CreateSection = () => {
//     const [sectionName, setSectionName] = useState<string>()
//     const [sectionGroup, setSectionGroup] = useState<string>()
//     const [selectSection, setSelectSection] = useState<string>();
//     const [selectGroup, setSelectGroup] = useState<string>();
//     const [sectionSubGroup, setSectionSubGroup] = useState<string>();
//     const [create, setCreate] = useState(false);
//     const { sections } = useSections();

//     const handleChange = (
//         event: React.ChangeEvent<FormControlElement>,
//         state: React.Dispatch<React.SetStateAction<string | undefined>>
//     ) => {
//         state(event.target.value);
//     };

//     const createSection = () => {
//         if (sectionName !== '') {
//             Meteor.call('sections.insert', sectionName)
//         } else {
//             return
//         }
//     }

//     const createGroup = () => {
//         if (sectionGroup !== '') {
//             Meteor.call('sections.group', selectSection, sectionGroup)
//         } else {
//             return
//         }
//     }

//     const createSubGroup = () => {
//         if (sectionSubGroup !== '') {
//             Meteor.call('sections.subGroup', selectSection, selectGroup, sectionSubGroup)
//         } else {
//             return
//         }
//     }

//     const renderSubGroupSetting = () => {
//         if (selectGroup) {
//             return (
//                 <div>
//                     <Form.Label htmlFor="sectionName">Название подгруппы:</Form.Label>
//                     <Form.Control type="text" value={sectionSubGroup} onChange={(event) => handleChange(event, setSectionSubGroup)} />
//                     <Button onClick={createSubGroup}>Создать подгруппу</Button>
//                 </div>
//             )
//         }
//     }

//     const renderGroupSetting = () => {
//         if (selectSection) {
//             return (
//                 <div>

//                     <Form.Label htmlFor="groupsSelect">Выберите группу:</Form.Label>
//                     <Form.Select id="groupsList" value={selectGroup} onChange={(event) => handleChange(event, setSelectGroup)}>
//                         <option value="">Выберите</option>
//                         {sections.map((section) => (
//                             section?.groups?.map((group, index) => (
//                                 <option key={index} value={group.groupName}>
//                                     {group.groupName}
//                                 </option>
//                             ))
//                         ))}
//                     </Form.Select>
//                     <Button onClick={() => setCreate(!create)}>{`${create ? 'Добавить подгруппу' : 'Создать группу'}`}</Button>
//                     {create ? <div>
//                         <Form.Label htmlFor="sectionName">Название группы:</Form.Label>
//                         <Form.Control type="text" value={sectionGroup} onChange={(event) => handleChange(event, setSectionGroup)} />
//                         <Button onClick={createGroup}>Создать группу</Button>
//                     </div> : <div>{renderSubGroupSetting()}</div>}
//                 </div>
//             )
//         }
//     }

//     return (
//         <div>
//             <div>
//                 <Form.Label htmlFor="groupName">Название секции:</Form.Label>
//                 <Form.Control type="text" value={sectionName} onChange={(event) => handleChange(event, setSectionName)} />
//                 <Button onClick={createSection}>Создать секцию</Button>
//             </div>
//             <div>
//                 <Form.Label htmlFor="groupsSelect">Выберите секцию:</Form.Label>
//                 <Form.Select id="groupsList" value={selectSection} onChange={(event) => handleChange(event, setSelectSection)}>
//                     <option value="">Выберите</option>
//                     {sections.map((item) => (
//                         <option>
//                             {item.section}
//                         </option>
//                     ))}
//                 </Form.Select>
//                 {renderGroupSetting()}
//             </div>
//         </div>
//     )
// }

// export default CreateSection;