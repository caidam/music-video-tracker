import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useAxios from '@/utils/useAxios';

export const useDeleteAccount = () => {
    const api = useAxios();
    const { setUser, setAuthTokens } = useContext(AuthContext);

    const deleteAccount = async () => {
        try {
            const response = await api.delete(`/api/delete-account/`);

            if (response.status === 204) {
                console.log('Account deleted successfully.');
                setUser(null);
                setAuthTokens(null);
                localStorage.removeItem('authTokens');
                return { success: true };
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            return { success: false, error };
        }
    };

    return deleteAccount;
};
