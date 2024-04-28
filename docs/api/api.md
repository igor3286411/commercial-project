
# Документация для методов Meteor

## Методы для управления пользователями (users)

### `users.insert`

Этот метод используется для добавления нового пользователя в базу данных и создания аккаунта.

#### Параметры:

- `userData` (Object): Объект с информацией о пользователе, включая имя, фамилию, email, телефон и другие данные.

#### Пример использования:

```javascript
const form = {
name:  '',
surname:  '',
email:  '',
phone:  '',
password:  '',
confirmPassword:  '',
}

Meteor.call('users.insert', form, (error:  Error))
```

## Методы для управления родителями (parents)

### `parents.insert`

Этот метод используется для добавления нового родителя в базу данных и создание ему аккаунт.

#### Параметры:

- `parentsObj` (Object): Объект с информацией о родителе, включая имя, фамилию, email, телефон, и другие данные.
-  `studentObj` (Object): Объект с информацией о студенте, включая имя, фамилию, email, телефон, и другие данные.

#### Пример использования:

```javascript
const  parentData  = {
userId:  parentId,
iin,
name:  parentName,
surname:  parentSurname,
phone:  parentPhone,
email:  parentEmail
}

const studentData  = {
userId:  studentId,
name:  studentName,
surname:  studentSurname,
age:  studentAge,
phone:  studentPhone,
email:  studentEmail,
trialLesson:  formattedDate
}

Meteor.call('parents.insert',  parentData,  studentData)
```
### `parents.edit`

Этот метод используется для редактирования данных родителя.

#### Параметры:

- `parentId` (String): ID конкретного родителя.
-  `newData` (Object): Объект с новой информацией которую нужно изменить.

#### Пример использования:

```javascript
const  [data,  setData]  =  useState({})
const  changeInput  = (e,  key) => {
setData({
	...data,
	[key]:  e.target.value
	})
}
	
Meteor.call('parents.edit',  parent?.userId,  data)
```

## Методы для управления студентами (students)

### `students.insert`

Этот метод используется для добавления нового студента в базу данных.

#### Параметры:

- `studentsObj` (Object): Объект с информацией о студенте, включая имя, фамилию, email, телефон, класс и другие данные.

#### Пример использования:

```javascript
const studentData  = {
userId:  studentId,
name:  studentName,
surname:  studentSurname,
age:  studentAge,
phone:  studentPhone,
email:  studentEmail,
trialLesson:  formattedDate
}

Meteor.call('students.insert', studentData);
```

### `students.toGroup`

Этот метод используется для добавления студента в группу

#### Параметры:

- `studentId` (String): Id студента.
- `group` (String): Название группы.
- `subGroup`(String): Название подгруппы

#### Пример использования:

```javascript
Meteor.call('students.toGroup',  student.userId,  selectNameGroup,  selectNameSubGroup)
```

## Методы для управления тренерами (trainers)

### `trainer.insert`

Этот метод используется для добавления нового тренера в базу данных и создания аккаунта.

#### Параметры:

- `trainersObj` (Object): Объект с информацией о пользователе, включая имя, фамилию, email, телефон и другие данные.

#### Пример использования:

```javascript
const  trainerData  = {
userId:  trainerId,
name:  trainerName,
surname:  trainerSurname,
age:  trainerAge,
phone:  trainerPhone,
email:  trainerEmail
}

Meteor.call('trainers.insert',  trainerData)
```
### `trainers.toGroup`

Этот метод используется для добавления тренера в группу

#### Параметры:

- `trainerId` (String): Id студента.
- `group` (String): Название группы.
- `subGroup`(String): Название подгруппы

#### Пример использования:

```javascript
Meteor.call('trainers.toGroup',  trainer.userId,  selectNameGroup,  selectNameSubGroup)
```

## Методы для управления секциями (sections)

### `sections.insert`

Этот метод используется для добавления новой секции в базу данных или редактирования.

#### Параметры:

- `sectionName` (String): Название секции.
- `newSectionName`?(String): Опционально: Если нужно изменить название существующей секции

#### Пример использования:

```javascript
Meteor.call('sections.insert', 'Бокс') // Для добавления новой секции

Meteor.call('sections.insert', 'Бокс', 'Баскетбол') // Для изменения название секции
```
### `sections.group`

Этот метод используется для добавления группы к существующей секции или редактирования.

#### Параметры:

- `sectionName` (String): Название секции к которой нужно добавить группу.
- `groupName` (String): Название группы.
- `newGroupName`?(String): Опционально: Если нужно изменить название существующей группы

#### Пример использования:

```javascript
Meteor.call('sections.group',  sectionName, groupName) // Для добавления новой группы

Meteor.call('sections.group',  sectionName, groupName, newGroupName) // Для изменения название группы
```

### `sections.subGroup`

Этот метод используется для добавления подгруппы существующей группе в секции.

#### Параметры:

- `sectionName` (String): Название секции к которой нужно добавить подгруппу.
- `groupName` (String): Название группы к которой нужно добавить подгруппу.
- `subGroupName` (String): Название подгруппы.
- `newSubGroupName`?(String): Опционально: Если нужно изменить название существующей подгруппы

#### Пример использования:

```javascript

Meteor.call('sections.subGroup',  sectionName, groupName, subGroupName) // Для добавления новой подгруппы

Meteor.call('sections.subGroup',  sectionName, groupName, subGroupName, newSubGroupName) // Для изменения название подгруппы
```

### `sections.remove`

Этот метод используется для добавления удаления данных из секций(секции, группы или подгруппы)

#### Параметры:

- `sectionData` (Object): Обьект который хранит данные о тех данных которые нужно удалить.

#### Пример использования:

```javascript

const sectionData = {
	section: 'Бокс', // Для удаления секции
} 

const sectionData = {
	section: 'Бокс',
	group: 'ПН-СР-ПТ',  // Для удаления группы
} 

const sectionData = {
	section: 'Бокс',
	group: 'ПН-СР-ПТ',  // Для удаления подгруппы
	subGroup: '12:00'
} 

Meteor.call('sections.remove',  sectionData)

```

## Методы для управления комментариями (comments)

### `comments.insert`

Этот метод используется для добавления нового комментария в базу данных.

#### Параметры:

- `studentId` (String): Id студента.
-  `trainerId` (String): Id тренера.
-  `date` (String | Date): Дата комментария.
-  `comment` (String): Комментарий.

#### Пример использования:

```javascript
Meteor.call('comments.insert',  studentId,  trainer.userId,  '22.02.2024',  'Хорошо играл в футбол')
```

## Методы для управления посещением (attendances)

### `attendances.insert`

Этот метод используется для добавления информации о посещение и добавления студентов в массив students, если они были на занятиях в противном случае, не добавляет. 

#### Параметры:

- `studentId` (String): Id студента.
-  `date` (String | Date): Дата посещения(слота).
-  `mark` (Boolean): (true: 'Студент был на занятиях' | false: 'Не было' | null: 'Пустая ячейка (занятия не было)').

#### Пример использования:

```javascript
Meteor.call('attendances.insert',  studentId,  date,  true | false | null);
```

## Методы для управления бронированием (booking)

### `booking.insert`

Этот метод используется для добавления информации о бронировании дней в таблице. 

#### Параметры:

- `bookedDays` (String[]): Массив дней которые будут заняты.

#### Пример использования:

```javascript
const  bookedDaysArray  = {
clientName:  'Клиент,'
clientSurname:  'Клиентов',
clientPhone:  '+7(777)-77-77-77',
clientEmail:  'client@gmail.com',
bookedDays: ['Thu Feb 22 2024 10:54:22 GMT+0600 (Восточный Казахстан)', 'Thu Feb 23 2024 21:00:22 GMT+0600 (Восточный Казахстан)',]
fieldId
}

Meteor.call('booking.insert',  bookedDaysArray)
```

## Методы для управления полями (fields)

### `fields.insert`

Этот метод используется для добавления новых полей. 

#### Параметры:

- `fieldData` (Object): Объект который включает в себя информацию о новом поле.

#### Пример использования:

```javascript
const fieldData = {
	name: 'баскетбольное поле',
	fieldId,
	info: 'поле для баскетбола',
	schedule: schedule,
	active: true
}

Meteor.call('fields.insert', fieldData)
```

### `fields.edit`

Этот метод используется для редактирования полей. 

#### Параметры:

- `fieldId` (string): Id поля.
- `newData` (object): Объект с новой информацией который заменит старую информацию.

#### Пример использования:

```javascript

const fieldId = 'ryudsnfsdisdfndsuj';

const newData = {
	name: 'футбольное поле',
	info: 'поле для футбола',
	active: false
}

Meteor.call('fields.edit', fieldId, newData)
```

## Методы для управления уведомлениями (notifications)

### `notifications.insert`

Этот метод используется для создания новых уведомлений для пользоваетелей. 

#### Параметры:
- `userId` (String): Id пользователя которому придет уведомление.
- `date` (String | Date): Дата уведомления(когда придет уведомление или просто дата с того момента как уведомление отправилось).
- `content` (String): Контент уведомления.
- `type` (String): Тип уведомления (payment, update, stock, discounts и тд).

#### Пример использования:

```javascript
const contentMessage = `Вам выставлен счет на сумму ${paymentNumber}тг`

Meteor.call('notifications.insert',  studentId,  date,  contentMessage,  'payment')
```

## Методы для управления платежами (payments)

### `payments.insert`

Этот метод используется для создания платежей для пользоваетелей. 

#### Параметры:
- `userId` (String): Id пользователя которому придет счет об оплате.
- `date` (String | Date): Дата оплаты(когда нужна будет оплата или просто дата с того момента как счет был выставлен).
- `paymentNumber` (String | Number): Сумма платежа.
- `status` ('invoice'  |  'debt'  |  'paid'  |  'closed'): Статус платежа.

#### Пример использования:

```javascript
Meteor.call('payments.insert',  studentId,  date,  100.000 тг,  'invoice')
```
### `payments.paid`

Этот метод используется для изменения статуса платежа(итог оплаты). 
Статус меняется на paid или debt в зависимости от того полностью ли заплатил клиент или же остался остаток (residual)

#### Параметры:
- `paymentId` (String): Id конкретного платежа.
- `paidNumber` (String| Number): Сколько заплатил клиент.
- `paymentNumber` (String | Number): Сумма самого платежа (сколько клиенту нужно заплатить).

#### Пример использования:

```javascript
Meteor.call('payments.paid',  currentPayment._id,  50.000 тг,  100.000 тг)
```

## Методы для управления фото (аватарками) (photos)

### `photos.insert`

Этот метод используется для добавления фотографий. 

#### Параметры:
- `userId` (String): Id пользователя которому придет счет об оплате.
- `date` (String | Date): Дата оплаты(когда нужна будет оплата или просто дата с того момента как счет был выставлен).
- `paymentNumber` (String | Number): Сумма платежа.
- `status` ('invoice'  |  'debt'  |  'paid'  |  'closed'): Статус платежа.

#### Пример использования:

```javascript
const photo = {
userId = dfsdf2414123asfdsa,
imageData = 234asdsadpZgAAAAgA.... (формат data:image/png;base64)
}

Meteor.call('photos.insert', userId, 234asdsadpZgAAAAgA.....)
```

## Методы для управления ценами (price)

### `price.insert`

Этот метод используется для добавления цен в слоты бронирования. 

#### Параметры:
- `priceObj` (Object): Вся нужная информация по поводу цен.

#### Пример использования:

```javascript
const  priceObject  = {
startDate:  selectedDate,
startTime:  selectedTime,
endDate:  untilSelectedDate,
endTime:  untilSelectedTime,
fieldName:  selectField,
fieldId,
resultPrice
}
Meteor.call('price.insert',  priceObject)
```