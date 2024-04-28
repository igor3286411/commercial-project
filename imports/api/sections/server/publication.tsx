import { Meteor } from 'meteor/meteor';
import { Sections } from '../Sections';

Meteor.publish('sections', function () {
    return Sections.find();
});


