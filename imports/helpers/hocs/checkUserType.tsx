import React, { useState, useEffect } from "react";
import { Tracker } from "meteor/tracker";

const checkUserType = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const computation = Tracker.autorun(() => {
            const user = Meteor.user();
            if (user !== undefined) {
                setCurrentUser(user);
            }
        });

        return () => {
            // Остановка автозапуска при размонтировании компонента
            computation.stop();
        };
    }, []);
    //@ts-ignore
    return currentUser?.profile?.userType
}

export default checkUserType

