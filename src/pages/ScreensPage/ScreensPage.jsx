import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { selectBoards } from '../../redux/boards/boardsSelectors';
import s from './ScreensPage.module.css';
import { NoBoards } from '../../components/NoBoards/NoBoards';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
const ScreensPage = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  console.log('Screens', boards);

  return (
    <div className={s.screen_page}>
      {boards.length > 0 ? <Board /> : <NoBoards />}
    </div>
  );
};

export default ScreensPage;
