import jwtDecode from 'jwt-decode';

export const isValidJWT = (token: string) => {
  const exp = (jwtDecode(token) as any).exp;
  return exp >= Date.now();
};
