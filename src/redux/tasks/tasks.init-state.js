import moment from 'moment';
import { STATUS } from '../../constants/status.constants';

export const tasksInitState = {
  filter:'',
  tasks: [],
  date: moment(new Date()).format('YYYY-MM'),
  status: STATUS.idle,
};
