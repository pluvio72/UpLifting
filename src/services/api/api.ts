import {Session} from '../../contexts/session';

const BACKEND_URI = 'http://localhost:3000';
export const uri = (path: string) => BACKEND_URI + path;

export type AuthenticatedRoute<T> = (
  session: Session,
  ...params: any[]
) => Promise<T>;

export const AuthenticatedRoute = async <T>(
  session: Session,
  verb: 'GET' | 'POST',
  url: string,
  body?: BodyInit_,
): Promise<GenericResponse & T> => {
  try {
    let headers: HeadersInit_ = {
      authorization: `${session.token} ${session.account.username}`,
    };
    if (verb === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(uri(url), {
      method: verb,
      headers,
      body,
    });
    return await res.json();
  } catch (error: any) {
    console.warn(`Error in ${verb} ${url}, ${error.message}.`);
    throw new Error('API_ERROR');
  }
};

export const UnauthenticatedRoute = async <T>(
  verb: 'GET' | 'POST',
  url: string,
  body?: BodyInit_,
): Promise<GenericResponse & T> => {
  try {
    const res = await fetch(uri(url), {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    return await res.json();
  } catch (error: any) {
    console.warn(`Error in ${verb} in route ${url}, ${error.message}.`);
    throw new Error('API_ERROR');
  }
};

export type GenericResponse = {
  success: boolean;
};
