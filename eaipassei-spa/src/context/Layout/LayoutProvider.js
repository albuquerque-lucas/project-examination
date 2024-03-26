import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import LayoutContext from './LayoutContext.js';

export default function LayoutProvider({ children }) {
  const [active, setActive] = useState(false);

  const value = useMemo(() => {
    // const handleMenuToggler = (isActive) => {
    //   console.log(isActive);
    //   setActive(isActive !== undefined ? isActive : !active);
    // };

    return {
      active,
      setActive,
    };
  }, [
    active,
    setActive,
]);

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
}