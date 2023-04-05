import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const stateDefault = {
    favorites: [''],
  };
  const [globalState, setGlobalState] = useState(stateDefault);

  const context = useMemo(() => ({
    globalState,
    setGlobalState,
  }), [globalState, setGlobalState]);
  
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
