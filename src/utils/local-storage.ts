export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate!);
    const now = new Date();
    return expirationDate.getTime() - now.getTime();
}

export const setRefreshTokenExpirationDate = (refreshTokenExpires: number) => {
    const expiration = new Date();
    expiration.setMilliseconds(expiration.getMilliseconds() + refreshTokenExpires);
    localStorage.setItem('expiration', expiration.toISOString());
}

export const removeRefreshTokenExpirationDate = () => {
    localStorage.removeItem('expiration');
}