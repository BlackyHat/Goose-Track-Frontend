import React, { useEffect } from 'react';
import scss from './Filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { selectFilter } from 'redux/tasks/taskSelectors';
import { setFilter } from 'redux/tasks/taskSlice';
import { TiDeleteOutline } from 'react-icons/ti';

const Filter = () => {
  const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [_, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const filterValue = useSelector(selectFilter);

  useEffect(() => {
    if(filterValue) {
      setSearchParams({query:filterValue})
    }
  }, [filterValue,setSearchParams])

  const handlerFilter = (e)=> {
    const query = e.target.value.trim();
    dispatch(setFilter(query))
  }
  const clearFilter = ()=> {
    dispatch(setFilter(''))
  }

  return (
    <div className={scss.filterBox}>
      <input
        id="floatingInput"
        className={scss.input}
        placeholder=" "
        value={filterValue}
        onChange={handlerFilter}
        type="text"
      />
      <label htmlFor="floatingInput">{t('Search')}...</label>
      {filterValue && (
        <TiDeleteOutline
          size={24}
          onClick={clearFilter}
          className={scss.clearFilter}
        />
      )}
    </div>
  );
};

export default Filter;
