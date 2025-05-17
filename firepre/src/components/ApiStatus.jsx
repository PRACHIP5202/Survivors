import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ApiStatus.css';

export default function ApiStatus({ status, message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (status) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [status, message]);

  if (!visible || !status) return null;

  const statusClasses = {
    success: 'api-status-success',
    error: 'api-status-error',
    loading: 'api-status-loading'
  };

  return (
    <div className={`api-status ${statusClasses[status]}`}>
      {message}
    </div>
  );
}

ApiStatus.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'loading', '']),
  message: PropTypes.string
};
