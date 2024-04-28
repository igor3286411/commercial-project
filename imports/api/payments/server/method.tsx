import { check, Match } from 'meteor/check';
import { Payments } from '../Payments';

Meteor.methods({
    'payments.insert'(studentId, parentId, date, paymentNumber, status) {
        const datObj = {
            studentId,
            parentId,
            date,
            paymentNumber,
            status: status
        }
        Payments.insert(datObj);
    },
    'payments.paid'(paymentId, paidNumber, paymentNumber) {
        const payment = Payments.findOne({ _id: paymentId })
        console.log(paidNumber, paymentNumber)

        console.log(payment)
        if (payment) {
            if (paymentNumber - paidNumber === 0) {
                Payments.update(payment._id, { $set: { status: 'paid', residual: paymentNumber - paidNumber } })
            } else {
                Payments.update(payment._id, { $set: { status: 'debt', residual: paymentNumber - paidNumber } })
            }
        }
    }
})

// console.log(Payments.remove({}))


