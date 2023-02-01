import { useState } from 'react';

function getValue(target) {
  return target.type === 'checkbox' ? target.checked : target.value;
}

export function useAuthForm(initialCredentials) {
  const [credentials, setCredentials] = useState({
    ...initialCredentials,
  });

  const handleChange = ({ target }) => {
    setCredentials((prior) => {
      return {
        ...prior,
        [target.name]: getValue(target),
      };
    });
  };

  return [credentials, handleChange];
}
