import { toast } from 'react-toastify';

export const notify = (type, message) => {
  const method = type === 'default' ? toast : toast[type];

  method(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};