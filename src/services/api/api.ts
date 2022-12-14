const BACKEND_URI = 'http://localhost:3000';
export const uri = (path: string) => BACKEND_URI + path;

export type AuthenticatedRoute<T> = (
  username: string,
  token: string,
  ...params: any[]
) => Promise<T>;

export const AuthenticatedRoute = async <T>(
  username: string,
  token: string,
  verb: 'GET' | 'POST',
  url: string,
  body?: BodyInit_,
): Promise<GenericResponse & T> => {
  try {
    const res = await fetch(url, {
      method: verb,
      headers: {
        authorization: `${token} ${username}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    return await res.json();
  } catch (error: any) {
    console.warn(`Error in ${verb} ${url}, ${error.message}.`);
    throw new Error('API_ERROR');
  }
};

export type GenericResponse = {
  success: boolean;
};
