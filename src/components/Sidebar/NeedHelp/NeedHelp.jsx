import React, { useState } from 'react';
import s from './NeedHelp.module.css';
import {
  helpMob1x,
  helpMob2x,
  helpTab1x,
  helpTab2x,
  helpDesk1x,
  helpDesk2x,
} from '../../../assets/images/needHelp/index';
import Modal from '../../Modal/Modal';
import NeedHelpForm from './NeedHelpForm';
import icon from '../../../images/icons.svg';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectNeedHelpModal } from '../../../redux/modal/modalSelector';
import { closeModal, closeNeedHelpModal, openModal, openNeedHelpModal } from '../../../redux/modal/modalSlice';
import { useDispatch } from 'react-redux';

const NeedHelp = () => {
  const isOpen = useSelector(selectNeedHelpModal);
  const dispatch = useDispatch();
  // const toggleModal = () => {
  //   if (isOpen) {
  //     dispatch(closeModal());
  //   } else {
  //     dispatch(openModal());
  //   }
  // };
  const handleOpen = ()=>{
    dispatch(openNeedHelpModal())
  }

  return (
    <div className={s.container}>
      <picture className={s.image}>
        <source
          media="(max-width: 375px)"
          srcSet={`${helpMob1x} 1x, ${helpMob2x} 2x`}
        />

        <source
          media="(min-width: 768px)"
          srcSet={`${helpTab1x} 1x, ${helpTab2x} 2x`}
        />

        <source
          media="(min-width: 1440px)"
          srcSet={`${helpDesk1x} 1x, ${helpDesk2x} 2x`}
        />

        <img
          src={helpMob1x}
          srcSet={`${helpMob1x} 1x, ${helpMob2x} 2x`}
          alt="Smiling plant"
        />
      </picture>
      <div className={s.wrapper}>
        <p className={s.text}>
          If you need help with <br />
          <span className={s.span}>TaskPro</span>, check out our support
          resources or reach out to our customer support team.
        </p>

        <button type="button" className={s.btn} onClick={handleOpen}>
          <svg width="20px" height="20px" className={s.icon}>
            <use href={icon + '#icon-help'}></use>
          </svg>
          Need help?
        </button>
      </div>

      {isOpen &&
        createPortal(
          <Modal title="Need help" isOpen={isOpen} closeModal={closeNeedHelpModal}>
            <NeedHelpForm onClose={()=>dispatch(closeNeedHelpModal())}/>
          </Modal>,
          document.body
        )}
    </div>
  );
};
export default NeedHelp;
