import { useTranslation } from 'react-i18next';

import { updateActiveColumnId } from '../../../reduxUsers/actions/columnActions';
import { setModalState } from '../../../reduxUsers/actions/modalActions';
import { useAppDispatch } from '../../../reduxUsers/hook/reduxCustomHook';
import StyledButtonAddTask from './StyledButtonAddTask';

interface IButtonAddTask {
  _id: string;
}

const ButtonAddTask = (props: IButtonAddTask) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onAddNewTask = (columnId: string) => {
    dispatch(updateActiveColumnId(columnId));
    dispatch(setModalState({ isOpen: true, type: 'ADD_TASK' }));
  };

  return (
    <StyledButtonAddTask func={onAddNewTask} _id={props._id}>
      {t('Add task')}
    </StyledButtonAddTask>
  );
};

export default ButtonAddTask;
