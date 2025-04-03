// import { useCallback, useEffect } from 'react';
// import { debounce } from 'lodash';
// import { createNewTaskThunk } from '../redux/tasks/tasksOperations';

// export const useTaskDebounce = () => {
//   const debounced = useCallback(
//     debounce((board, column, task, dispatch) => {
//       dispatch(createNewTaskThunk(board, column, task));
//     }, 500),
//     []
//   );
//   return debounced;
// };
