import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const defaultValue = {
  open: false,
  postId: null,
};

const CarouselModalContext = createContext(defaultValue);

export function CarouselModalProvider({ children }) {
  const [carouseModal, setCarouseModal] = useState(defaultValue);
  return (
    <CarouselModalContext.Provider value={{ ...carouseModal, setCarouseModal }}>
      {children}
    </CarouselModalContext.Provider>
  );
}

CarouselModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CarouselModalContext;
