import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

const SEED_USERNAME_ADMIN = 'admin@admin.com';
const SEED_PASSWORD_ADMIN = 'admin';

const SEED_USERNAME_SUPER_ADMIN = 'super-admin@admin.com';
const SEED_PASSWORD_SUPER_ADMIN = 'super-admin';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    
    Accounts.createUser({
      username: SEED_USERNAME_ADMIN,
      password: SEED_PASSWORD_ADMIN,
      profile: {
        email: SEED_USERNAME_ADMIN,
        userType: 'admin',
      },
    });

    Accounts.createUser({
      username: SEED_USERNAME_SUPER_ADMIN,
      password: SEED_PASSWORD_SUPER_ADMIN,
      profile: {
        email: SEED_USERNAME_SUPER_ADMIN,
        userType: 'super_admin',
      },
    });
  }
});
