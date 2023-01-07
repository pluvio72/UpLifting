import jwtDecode from 'jwt-decode';

export const isValidJWT = (token: string) => {
  const exp = (jwtDecode(token) as any).exp;
  // exp is in seconds not MS
  return exp >= Math.floor(Date.now() / 1000);
};
