import { Meteor } from 'meteor/meteor';
//@ts-ignore
import { Roles } from 'meteor/alanning:roles';


Meteor.methods({
    'users.insert': function (userData) {
        const userId = Accounts.createUser({
            username: userData.email,
            password: userData.password,
            profile: {
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                phone: userData.phone,
                userType: 'client'
            }
        });
        console.log('Пользователь успешно создан. ID:', userId);
        // Roles.addUsersToRoles(userId, 'client');
        userData.userId = userId;

        if (userData.userType === 'client') {
            return Meteor.call('clients.insert', userData)
        }
    },
});

// console.log(Meteor.users.remove({ _id: 'WLjpZH8oyiJYyF2wN' }))

