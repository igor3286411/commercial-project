import React, { useEffect, useState } from "react";
import { useMultipleStudents } from "../../../helpers/hooks/useMultipleStudents";
import { usePhotos } from "../../../helpers/hooks/usePhotos";
import { Table } from "react-bootstrap";
import allDaysMonth from "../../../helpers/hocs/allDaysMonth";
import updateDateWithOptions from "../../../helpers/hooks/updateDateWithOptions";
import { useParams } from "react-router-dom";
import { useTrainer } from "../../../helpers/hooks/useTrainer";
import { useGroup } from "../../../helpers/hooks/useSections";

const StudentsList = () => {
  const [datesInMonth, setDatesInMonth] = useState<Date[]>([]);
  const [checkedStudentId, setCheckedStudentId] = useState<string>('');
  const [today, setToday] = useState<string>('');
  const [comment, setComment] = useState('');
  const trainerId = Meteor.user()?._id
  const { trainer } = useTrainer(trainerId)
  // const { id } = useParams();
  // const { trainer } = useTrainer(id);
  const { students, isStudentsLoading } = useMultipleStudents();
  const { photos } = usePhotos();
  // const { group, isGroupLoading } = useGroup(id)
  const { group, isGroupLoading } = useGroup(trainerId)

  useEffect(() => {
    allDaysMonth(setDatesInMonth);
    updateToday();
  }, []);

  const updateToday = () => {
    const todayDate = new Date().toString();
    setToday(todayDate);
  };

  const handleCheckboxChange = (studentId: string) => {
    if (checkedStudentId === studentId) {
      setCheckedStudentId('');
    } else {
      setCheckedStudentId(studentId);
    }
    updateToday();
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const saveComment = (studentId: string) => {
    comment.length > 0 ?
      Meteor.call('comments.insert', studentId, trainer.userId, today, comment)
      : alert('Пустой комментарий');
    setComment("")
  }


  const handleKeyPress = (studentId: string, event?: any) => {
    if (event.key === "Enter") {
      event.preventDefault()
      saveComment(studentId);
    }
  };

  const studentsRender = () => {
    const studentsForCurrentTrainer = students.filter(student => student?.group === trainer?.group)

    return studentsForCurrentTrainer.map(student => {
      // const photo = photos.find(photo => student.userId === photo.userId);
      return (
        <tr key={student.userId}>
          <td>
            <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}>
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={checkedStudentId === student.userId}
                onChange={() => handleCheckboxChange(student.userId)}
                style={{ marginRight: "15px" }}
                aria-label="Checkbox for following text input"
              />
              {/* <div style={{ width: '200px', marginLeft: '10px' }}>
                <img style={{ width: '100%' }} src={`data:image/png;base64,${photo?.imageData}`} alt="" />
              </div> */}
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>{student.name} {student.surname}</p>
                  <p>{student.age} лет</p>
                  <p>{student.class} класс</p>
                </div>
                <div>
                  {student?.group}
                  <br />
                  {student?.subGroup}
                </div>
                <div>
                  <div className="input-group mb-3">
                    <textarea className="form-control" value={comment} onChange={handleChange} onKeyDown={(event) => { handleKeyPress(student.userId, event) }} aria-label="With textarea"></textarea>
                    <button className="btn btn-outline-secondary" onClick={() => saveComment(student.userId)} type="button" id="button-addon2">Отправить комментарий</button>
                  </div>
                  <ul className="list-group">
                    {student?.commentNew?.map((comment: string, index: number) => {
                      return <li key={index} className="list-group-item">{comment}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr >

      );
    });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{updateDateWithOptions(today)}</th>
            {/* {datesInMonth.map((item, i) => {
                            return <th key={i}>{moment(item).format('DD MMMM')} <br /> {moment(item).format('dd')}</th>
                        })} */}
          </tr>
        </thead>
        <tbody style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
          {isStudentsLoading ? <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : studentsRender()}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentsList;