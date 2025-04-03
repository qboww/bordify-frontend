import MyBoards from './MyBoards/MyBoards';
import NeedHelp from './NeedHelp/NeedHelp';
import LogOut from './LogOut/LogOut';
import s from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { selectBoards } from '../../redux/boards/boardsSelectors';
import Logo from '../Logo/Logo';
import { useMedia } from '../../hooks/useMedia';
import { ListMyBoards } from './ListMyBoards/ListMyBoards';
import clsx from 'clsx';
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isDesktop } = useMedia();
  const handleOutsideClick = event => {
    const target = event.target;
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('svg') ||
      target.closest('li')
    ) {
      return;
    }

    setIsSidebarOpen(false);
  };

  useEffect(() => {
    let timeoutId;
    if (isSidebarOpen && !isDesktop) {
      timeoutId = setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 100);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen, isDesktop]);

  return (
    <>
      {!isDesktop && isSidebarOpen && (
        <div className={s.backdrop} onClick={() => setIsSidebarOpen(false)} />
      )}
      <div
        className={clsx(s.container, {
          [s.mobile]: !isDesktop && isSidebarOpen,
        })}
      >
        <div className={s.navigation}>
          <Logo className={s.logo} />
          <CreateNewBoard />
        </div>
        <ListMyBoards className={s.boards_list} />
        <div className={s.needHelp}>
          <NeedHelp />
          <LogOut />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
