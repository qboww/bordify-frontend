import { components } from 'react-select';

const CustomOption = props => {
  const isSelected = props.isSelected;

  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
        <div
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            position: 'relative',
            marginRight: '8px',
            borderRadius: '50%',
            border: isSelected ? `1px solid ${props.data.color}` : 'none',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: props.data.color,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) ${
                isSelected ? 'scale(0.7)' : 'scale(1)'
              }`,
            }}
          ></div>
        </div>
        <div style={{ flex: '1', lineHeight: '20px' }}>{props.children}</div>
      </div>
    </components.Option>
  );
};

export default CustomOption;
