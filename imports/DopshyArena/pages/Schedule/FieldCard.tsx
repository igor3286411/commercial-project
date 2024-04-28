import React, { useEffect, useState } from "react";
import { Card, Switch, TextInput, Button } from '@gravity-ui/uikit';
import './ScheduleFields.scss';
import handleUpload from "../../../helpers/hocs/handleUpload";
import { usePhotoForField } from "../../../helpers/hooks/usePhotoForField";

interface IFieldCard {
  field: {
    active: boolean;
    fieldId: string;
    info: string;
    fieldName: string;
    schedule: any;
  };
}

const FieldCard: React.FC<IFieldCard> = ({ field }) => {
  const { photo, isPhotoLoading } = usePhotoForField(field.fieldId);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCheckedSwitch, setIsCheckedSwitch] = useState<boolean>(true);
  const [fieldName, setFieldName] = useState<string>('');
  const [fieldInfo, setFieldInfo] = useState<string>('');
  const [schedule, setSchedule] = useState<any[]>(field.schedule);
  const [photoDisplay, setPhotoDisplay] = useState<any>();
  const [photoServer, setPhotoServer] = useState<any>();

  const scheduleObj = schedule.map(item => ({
    days: item.days,
    times: item.times
  })).concat(
    schedule.every(item => item.days.length > 0 && item.times.length > 0) ? [{ days: '', times: '' }] : []
  );

  useEffect(() => {
    setPhotoDisplay(photo?.imageSrc);
  }, [isPhotoLoading]);

  const onSave = (fieldId: string, fieldName: string, fieldInfo: string, active: boolean, schedule: any) => {
    const fieldData = {
      fieldName,
      info: fieldInfo,
      schedule: schedule,
      active: active,
    };

    handleUpload(photoServer, field.fieldId, 'student');

    Meteor.call('fields.edit', fieldId, fieldData);
    setIsEdit(!isEdit);
  };

  const onEditing = () => {
    setIsEdit(!isEdit);
  };

  const onChangeFilds = (event: React.ChangeEvent<HTMLInputElement>, state: React.Dispatch<React.SetStateAction<string>>) => {
    state(event.target.value);
  };

  const onChangeDaysSchedule = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const scheduleCopy = [...scheduleObj];
    scheduleCopy[index].days = event.target.value;
    setSchedule(scheduleCopy);
  };

  const onChangeTimesSchedule = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const scheduleCopy = [...schedule];
    scheduleCopy[index].times = event.target.value;
    setSchedule(scheduleCopy);
  };

  const onHandleSwitch = (isChecked: boolean) => {
    setIsCheckedSwitch(isChecked);
  };

  const handlePhotoChange = (event: any, fieldId: string) => {
    const selectedPhoto = event.target.files[0];
    setPhotoServer(selectedPhoto);
    setPhotoDisplay(URL.createObjectURL(selectedPhoto));
  };

  return (
    <Card className={field.active ? 'card' : 'card disabled'} key={field.fieldId} view="outlined" type="container" size="l">
      <div className="wrapperPhoto">
        {photoDisplay ? <img className="fieldPicture" src={photoDisplay} alt="photo" /> : null}
        {isEdit ? (
          <Button>
            <label htmlFor="file-upload">
              <input id="file-upload" type="file" onChange={(event) => handlePhotoChange(event, field.fieldId)} accept="image/*" style={{ display: 'none' }} />
              Добавить фото
            </label>
          </Button>
        ) : (
          photoServer ?
            null
            :
            <Button disabled>
              Добавить фото
            </Button>
        )}
      </div>
      <div className="nameField">
        {isEdit ? (
          <TextInput
            className="inputName"
            view="normal"
            placeholder='Введите название поля'
            defaultValue={field.fieldName}
            onChange={(event) => onChangeFilds(event, setFieldName)} />
        ) : (
          <p>{field.fieldName ? field.fieldName : 'Введите название поля'}</p>
        )}
      </div>
      <div className="infoField">
        {isEdit ? (
          <TextInput
            className="inputInfo"
            view="normal"
            placeholder='Введите информацию о поле'
            defaultValue={field.info}
            onChange={(event) => onChangeFilds(event, setFieldInfo)} />
        ) : (
          <p>{field.info ? field.info : 'Введите информацию о поле'}</p>
        )}
      </div>
      <div>
        {Array.isArray(schedule) && scheduleObj.map((item: { days: string, times: string }, index: number) => (
          <ul key={index}>
            {isEdit ? (
              <TextInput
                view="normal"
                defaultValue={item.days}
                onChange={(event) => onChangeDaysSchedule(event, index)}
              />
            ) : (
              <strong>{item.days}{item.days.length > 0 ? ':' : ''}</strong>
            )}
            {isEdit ? (
              <TextInput
                view="normal"
                defaultValue={item.times}
                onChange={(event) => onChangeTimesSchedule(event, index)}
              />
            ) : (
              item.times.split(',').map((time: string, index: number) => (
                <li key={index}>{time}</li>
              ))
            )}
          </ul>
        ))}

      </div>
      <Switch className="switch" content="Активность поля"
        size="l"
        disabled={!isEdit}
        defaultChecked={field.active}
        onUpdate={(checked) => onHandleSwitch(checked)} />
      <div>
        {isEdit ? (
          <Button view="action"
            size="l"
            onClick={() => onSave(field.fieldId, fieldName, fieldInfo, isCheckedSwitch, schedule)}>Сохранить</Button >
        ) : (
          <Button view="action"
            size="l"
            onClick={onEditing}>Редактировать</Button >)}
      </div>
    </Card>
  );
};

export default FieldCard;
