import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask } from 'redux/tasks/tasksOperations';

import { useToggle } from 'hooks/useToggle';
import { spriteIcons } from 'images/icons';
import { COLUMNS } from 'constants/columns.constans';
import { Notify } from 'notiflix';

import TaskModal from 'components/TaskModal/TaskModal';
import Modal from 'components/Modal/Modal';
import ColumnToggler from '../ColumnToggler/ColumnToggler';
import scss from './TaskToolbar.module.scss';

const TaskToolbar = ({ task }) => {
  const dispatch = useDispatch();
  const { column } = task;

  const taskModal = useToggle();
  const columnToggler = useToggle();
  const [togglerPosition, setTogglerPosition] = useState({});

  const openColumnToggler = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTogglerPosition({ top: rect.top, left: rect.left });
    columnToggler.onOpen();
  };

  const otherColumns = COLUMNS.filter(colmn => colmn !== column);

  const handleDeleteTask = async () => {
    try {
      await dispatch(removeTask(task._id));
      Notify.success('notify.Success.Task removed');
    } catch (error) {
      Notify.error('notify.Error.Something gone wrong.');
    }
  };

  return (
    <>
      <ul className={scss.cardBox}>
        <li className={scss.itemChoice}>
          <button onClick={openColumnToggler}>
            <svg className={scss.iconButton}>
              <use href={spriteIcons + '#icon-arrow-circle-broken-right'}></use>
            </svg>
          </button>
        </li>
        <li>
          <button onClick={taskModal.onOpen}>
            <svg className={scss.iconButton}>
              <use href={spriteIcons + '#icon-pencil'}></use>
            </svg>
          </button>
        </li>
        <li>
          <button onClick={handleDeleteTask}>
            <svg className={scss.iconButton}>
              <use href={spriteIcons + '#icon-trash'}></use>
            </svg>
          </button>
        </li>
      </ul>

      {taskModal.isOpen && (
        <TaskModal taskData={task} onClose={taskModal.onClose} />
      )}

      {columnToggler.isOpen && (
        <Modal
          onClose={columnToggler.onClose}
          notStyled={true}
          position={togglerPosition}
        >
          <ColumnToggler
            columns={otherColumns}
            taskData={task}
            onClose={columnToggler.onClose}
          />
        </Modal>
      )}
    </>
  );
};

export default TaskToolbar;
