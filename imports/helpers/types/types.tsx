export interface User {
  profile?: {
    userType: string;
    name: string;
    surname: string;
    email: string;
    phone: number | string;
  };
}

export interface Client {
  _id: string;
  email: string;
  name: string;
  surname: string;
  userId: string;
  phone: number | string
}

export interface Booked {
  _id: string;
  clientName: string;
  clientSurname: string;
  clientUserId: string;
  clientPhone: string;
  clientEmail: string;
  bookedDays: string[];
  fieldId: string;
  fieldName: string;
}

export interface TPrice {
  _id: string;
  date: Date;
  price: number;
  hours: number;
  startDate: Date;
  startTime: number;
  endDate: Date;
  endTime: number;
  resultPrice: number;
  fieldId: string;
  fieldName: string;
}

export interface Field {
  _id: string;
  fieldInfo: string;
  fieldName: string;
}

export interface Sections {
  sectionName: string;
  groupName: string;
  subGroup: string;
}

export interface Trainer {
  _id: string;
  name: string;
  surname: string;
  age: number;
  students: string[];
  userId: string;
  group: string;
  subGroup: string[]
  price: number;
  sections: Sections[];
}

export interface Student {
  userId: string;
  name: string;
  surname: string;
  age: number;
  group: string;
  subGroup: string;
  trialLesson: string;
  commentNew?: string[];
  parentUserId: string;
  parentFullName: string;
  parentPhone: string | number;
  sections: Sections[];
}

export interface Photo {
  id: string;
  name: string;
  surname: string;
  photo: string;
  imageSrc: string;
}

export interface Group {
  _id: string;
  groupId: string;
  sectionId: string;
  groupName: string;
}

export interface Section {
  _id: string;
  sectionName: string;
  sectionId: string;
}

export interface Comment {
  _id: string;
  studentId: string;
  trainerId: string;
  comment: string;
  date: Date;
  name: string;
}

export interface Payment {
  _id: string;
  userId: string;
  date: Date;
  paymentNumber: number;
  status: 'invoice' | 'debt' | 'paid' | 'closed';
  residual: string;
}

export interface Notification {
  _id: string;
  userId: string;
  parentId: string;
  all: boolean;
  read: boolean;
  date: Date;
  type: string;
  content: string;
}

export interface Attendance {
  _id: string;
  date: Date;
  mark: string;
  userId: string;
  students: string[];
  trainerId: string;
  value: number | string
  price: number;
}

export interface Parent {
  _id: string;
  userId: string;
  iin: string;
  name: string;
  surname: string;
  phone: number | string;
  email: string;
  childrenUserId: string[];
}

export interface IDashboard {
  _id: string;
  parentData: object;
  studentData: object;
  paymentData: object;
}

export interface BarChartData {
  [key: string]: string | number;
}

export interface BarChartColors {
  [key: string]: string
}

export interface Field {
  _id: string;
  fieldId: string;
  fieldName: string;
  info: string;
  schedule: object;
  active: boolean;
}

export interface GroupTime {
  _id: string;
  groupTimeId: string;
  sectionId: string;
  groupId: string;
  groupTimeName: string;
}

export interface Schedule {
  days: string;
  times: string;
}
