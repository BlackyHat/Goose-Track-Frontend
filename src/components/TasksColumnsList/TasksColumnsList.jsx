import TasksColumn from 'components/ChoosedDay/TasksColumn/TasksColumn';
import scss from './TasksColumnsList.module.scss';
import { COLUMNS_OPTIONS, COLUMNS } from 'constants/columns.constans';
import { useSelector } from 'react-redux';
import { getCurrentDate } from 'redux/calendar/selectors';
import { useTasksByChoosedDay } from 'hooks/useTasksByChoosedDay';

const TasksColumnsList = () => {
  const currentDate = useSelector(getCurrentDate);
  const { tasks } = useTasksByChoosedDay(currentDate);

  const tasksByColumns = COLUMNS.reduce((acc, column) => {
    return {
      ...acc,
      [column]: tasks.filter(task => task.column === column),
    };
  }, {});

  return (
    <div className={scss.listBox}>
      {COLUMNS.map(column => {
        const columnOptions = COLUMNS_OPTIONS.find(
          option => option.column === column
        );
        const title = columnOptions ? columnOptions.title : '';

        return (
          <TasksColumn
            key={column}
            tasks={tasksByColumns[column]}
            title={title}
            column={column}
          />
        );
      })}
    </div>
  );
};

export default TasksColumnsList;
