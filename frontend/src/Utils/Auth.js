import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export const addUsertoLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
};

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : { role: "", isApproved: "", username: "" };
    return user;
};

export function checkAdminLoader() {
    const token = getAuthToken();
    const { role } = getUserFromLocalStorage();
    if (!token) {
        return redirect('/signup');
    }

    if (token && role !== 'admin') {
        return redirect('..');
    }

    return null;
}

export function checkArtistLoader() {
    const token = getAuthToken();
    const { role } = getUserFromLocalStorage();
    if (!token) {
        return redirect('/signup');
    }

    if (token && role !== 'artist') {
        return redirect('..');
    }

    return null;
}

export function checkAuthLoader() {
    const token = getAuthToken();
    if (!token) {
        return redirect('/signup');
    }

    return null;
}

export function redirectAuth() {
    const token = getAuthToken();
    if (token) {
        return redirect('/');
    }
    return null;
}
