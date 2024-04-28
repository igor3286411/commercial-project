import { Students } from "../Students";
import { check } from "meteor/check";

Meteor.methods({
    'students.insert'(studentsObj, parentObj) {
        const studentData = {
            name: studentsObj.name,
            surname: studentsObj.surname,
            userId: studentsObj.userId,
            parentUserId: parentObj.userId,
            parentFullName: `${parentObj.name} ${parentObj.surname}`,
            parentPhone: parentObj.phone,
            parentEmail: parentObj.email,
            userType: 'student'
        }
        Students.insert(studentData)
    },
    'students.toGroup'(studentId, section, group, subGroup) {
        const student = Students.findOne({ userId: studentId });

        const data = {
            sectionName: section,
            groupName: group,
            subGroup: subGroup
        }

        if (student) {
            Students.update(student._id, { $push: { sections: data } });
        }
    },
    'student.edit'(studentId, newData) {
        const student = Students.findOne({ userId: studentId })
        if (student) {
            Students.update(student._id, { $set: newData })
        }
    },
})

// console.log(Students.remove({}))
// console.log(Students.findOne({}))

// console.log(Accounts.findUserByUsername('student2@gmail.com'));

// console.log(Meteor.users.remove({}));
