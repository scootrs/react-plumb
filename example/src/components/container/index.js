import React, { useState } from 'react';
import ContainerView from './view';
import useDrop from '../../hooks/useDrop';
import { usePlumbContainer } from 'react-plumb';
import Node from './node';

const genid = () => '' + Math.floor(Math.random() * 10000);

const initialState = [
  {
    id: genid(),
    x: 100,
    y: 400
  },
  {
    id: genid(),
    x: 400,
    y: 100
  },
  {
    id: genid(),
    x: 400,
    y: 400
  }
];

function Container() {
  const [state, setState] = useState(initialState);
  const onDrop = data => {
    setState([
      ...state,
      {
        id: genid(),
        x: data.x,
        y: data.y
      }
    ]);
  };
  const onRemove = id => {
    setState(state.filter(n => n.id !== id));
  };
  const onDragStop = (id, x, y) => {
    console.log(id, x, y);
  };

  const [ref, plumb] = usePlumbContainer({ onDragStop });

  useDrop({
    ref,
    onDrop
  });

  return (
    <ContainerView ref={ref}>{plumb(state.map(c => <Node key={c.id} {...c} onRemove={onRemove} />))}</ContainerView>
  );
}

export default Container;