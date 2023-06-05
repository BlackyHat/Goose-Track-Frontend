import React from 'react';
import scss from './Filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectFilter } from 'redux/tasks/taskSelectors';
import { setFilter } from 'redux/tasks/taskSlice';
import { TiDeleteOutline } from 'react-icons/ti';

const Filter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const filterValue = useSelector(selectFilter);

  return (
    <div className={scss.filterBox}>
      <input
        id="floatingInput"
        className={scss.input}
        placeholder=" "
        value={filterValue}
        onChange={e => dispatch(setFilter(e.target.value))}
        type="text"
      />
      <label htmlFor="floatingInput">{t('Search')}...</label>
      {filterValue && (
        <TiDeleteOutline
          size={24}
          onClick={() => dispatch(setFilter(''))}
          className={scss.clearFilter}
        />
      )}
    </div>
  );
};

export default Filter;
