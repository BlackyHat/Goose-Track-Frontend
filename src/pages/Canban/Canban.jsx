import { useSelector } from 'react-redux';
import { selectTasksByFilter } from 'redux/tasks/taskSelectors';
import TasksColumn from 'components/ChoosedDay/TasksColumn/TasksColumn';
import scss from './Canban.module.scss';
import Filter from 'components/Filter/Filter';
import { useTranslation } from 'react-i18next';

const Canban = () => {
  const tasks = useSelector(selectTasksByFilter);
  const { t } = useTranslation();
  let clmns;
  let tasksByColumns;
  if (tasks.length > 0) {
    clmns = [...new Set(tasks.map(({ column }) => column))];
    tasksByColumns = clmns.reduce((acc, column) => {
      return {
        ...acc,
        [column]: tasks.filter(task => task.column === column),
      };
    }, {});
  }

  return (
    <>
      <h1 className={scss.titleTask}>{t('Canban')}</h1>
      <Filter />
      <div className={scss.listBox}>
        {clmns &&
          clmns.map(column => {
            return (
              <TasksColumn
                key={column}
                tasks={tasksByColumns[column]}
                title={column}
                column={column}
              />
            );
          })}
      </div>
    </>
  );
};

export default Canban;
