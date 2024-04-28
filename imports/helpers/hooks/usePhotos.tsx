import { useTracker } from 'meteor/react-meteor-data';
import { Photos } from '../../api/photos/Photos';
import { Photo } from '../types';

export function usePhotos() {
    const { photos, isPhotosLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('photos');
        const photos = Photos.find().fetch() as Photo[];
        return { photos, isPhotosLoading: !subscription.ready() };

    });
    return { photos, isPhotosLoading };
}
