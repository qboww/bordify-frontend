import clsx from 'clsx';
import s from './Button.module.css';

export const Button = ({
  buttonText = '',
  onClick,
  type = 'button',
  typeStyle = 'primary',
  icon = '',
  width,
  height,
  iconSize = '20',
  className,
  small = false,
}) => {
  const buttonStyle = {
    width: width || undefined,
    height: height || undefined,
  };
  return (
    <>
      {small ? (
        <button
          className={clsx(s.btn_small, className)}
          type={type}
          style={buttonStyle}
          onClick={onClick ? onClick : null}
        >
          <svg width={iconSize} height={iconSize}>
            <use href={icon}></use>
          </svg>
        </button>
      ) : (
        <button
          type={type}
          onClick={onClick ? onClick : null}
          className={clsx(
            s.btn,
            {
              [s.transparent]: typeStyle === 'transparent',
              [s.primary]: typeStyle === 'primary',
              [s.secondary]: typeStyle === 'secondary',
              [s.small]: typeStyle === 'small',
            },
            className
          )}
          style={buttonStyle}
        >
          {icon && (
            <div className={s.icon}>
              <svg width="14" height="14">
                <use href={icon}></use>
              </svg>
            </div>
          )}
          {buttonText && <span>{buttonText}</span>}
        </button>
      )}
    </>
  );
};
