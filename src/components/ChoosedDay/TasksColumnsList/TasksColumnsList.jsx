import TasksColumn from 'components/ChoosedDay/TasksColumn/TasksColumn';
import scss from './TasksColumnsList.module.scss';
import { COLUMNS_OPTIONS, COLUMNS } from 'constants/columns.constans';
import { useTasksByChoosedDay } from 'hooks/useTasksByChoosedDay';
import { useTranslation } from 'react-i18next';

const TasksColumnsList = ({ currentDay }) => {
  const { tasks } = useTasksByChoosedDay(currentDay);
  const { t } = useTranslation();

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
            title={t(title)}
            column={column}
          />
        );
      })}
    </div>
  );
};

export default TasksColumnsList;
