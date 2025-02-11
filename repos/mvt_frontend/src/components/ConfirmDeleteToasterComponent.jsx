import { toast } from 'sonner';

const ConfirmDeleteToaster = ({ onConfirm }) => {
    const showConfirmation = () => {
        toast.warning('Are you sure you want to permanently delete your account?', {
            action: {
                label: 'Confirm',
                onClick: () => {
                    onConfirm();
                    toast.dismiss();
                },
            },
        });
    };

    return (
        <button onClick={showConfirmation}>Delete Account</button>
    );
};

export default ConfirmDeleteToaster;
