import type { Component, JSX } from 'solid-js';

const Backdrop: Component<{
  style?: JSX.CSSProperties;
}> = (props) => {
  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        'z-index': 9995,
        'background-color': 'rgb(0 0 0 / 0.4)',
        ...props.style,
      }}
    />
  );
};

export default Backdrop;
