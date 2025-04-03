import clsx from 'clsx';
import s from './BgcList.module.css';
import { previewBgc } from '../../../../constants/dataForBoardModal';
import { useEffect } from 'react';

const BgcList = ({ selectedBgc, setSelectedBgc, register, name }) => {

  useEffect(() => {
    if (!selectedBgc) {
      setSelectedBgc(previewBgc[0].previewName);
    } else {
      setSelectedBgc(selectedBgc);
    }
  }, [selectedBgc, setSelectedBgc]);
  return (
    <ul className={s.bgc_list}>
      {previewBgc.map((bgc, idx) => (
        <li
          key={idx}
          className={clsx(s.bgc_item, {
            [s.selected]: selectedBgc === bgc.previewName,
          })}
        >
          <input
            type="radio"
            id={bgc.previewName}
            name="background"
            value={bgc.previewName}
            checked={selectedBgc === bgc.previewName}
            onClick={() => setSelectedBgc(bgc.previewName)}
            className={s.bgc_radio}
            {...register(name)}
          />
          <label htmlFor={bgc.previewName}>
            {bgc.previewName === 'none' ? (
              <svg
                width="16"
                height="16"
                className={clsx(s.svg_icon, {
                  [s.selected]: selectedBgc === bgc.previewName,
                })}
              >
                <use href={bgc.src}></use>
              </svg>
            ) : (
              <img src={bgc.src} alt={`Bgc ${bgc.previewName}`} />
            )}
          </label>
        </li>
      ))}
    </ul>
  );
};
export default BgcList;
