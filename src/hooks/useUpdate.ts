import { useNavigate } from 'react-router-dom';
import { verificationApi } from '../api/auth/authAPI';
import { UserTypeWithoutPassword } from './types';

// Define the LoginFunction type
interface LoginFunction {
    (userData: UserTypeWithoutPassword): void;
}

// Define the useUpdate hook with the LoginFunction type
export const useUpdate = (login: LoginFunction) => {
    const navigate = useNavigate();

    const update = () => {
        verificationApi.verification().then((res: UserTypeWithoutPassword | null) => {
            if (res !== null) {
                login(res);
            } else {
                navigate("/login");
            }
        }).catch((err) => {
            console.error(err);
            navigate("/login");
        });
    };

    return update;
};
