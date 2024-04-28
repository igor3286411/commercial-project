import { Tracker } from "meteor/tracker";

export const checkUser = async () => {
    const currentUser = await new Promise(resolve => {
        Tracker.autorun(() => {
            const user = Meteor.user();
            if (user !== undefined) {
                resolve(user);
            }
        });
    });

    if (!currentUser) {
        window.location.href = '/'
    }
};