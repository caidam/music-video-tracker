import { toast } from 'sonner';

const ConfirmationToaster = ({ onConfirm }) => {
  const showConfirmation = () => {
    toast.warning('Stop tracking this video?', {
      action: {
        label: 'Confirm',
        onClick: () => {
          onConfirm();
          toast.dismiss();
        },
      },
    //   cancel: {
    //     label: 'Cancel',
    //     onClick: () => toast.dismiss(),
    //   },
    });
  };

  return (
    <button onClick={showConfirmation}>Stop Tracking</button>
  );
};

export default ConfirmationToaster;
