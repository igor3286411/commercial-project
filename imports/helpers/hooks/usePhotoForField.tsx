import { useTracker } from 'meteor/react-meteor-data';
import { Photos } from '../../api/photos/Photos';
import { Photo } from '../types';

export function usePhotoForField(id: string) {
    const { photo, isPhotoLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('photos');
        const photo = Photos.findOne({ id }) as Photo;
        return { photo, isPhotoLoading: !subscription.ready() };

    });
    return { photo, isPhotoLoading };
}
