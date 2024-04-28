import { SyncedCron } from 'meteor/littledata:synced-cron';
import { Attendances } from '../imports/api/attendance/Attendance';

SyncedCron.add({
  name: 'Clear collectons',
  schedule(parser) {
    return parser.text('at 1:00 am on the first day of the month');
  },
  job() {
    console.log('Задание выполняется каждую минуту');
    Attendances.remove({})
  }
});

SyncedCron.start();
