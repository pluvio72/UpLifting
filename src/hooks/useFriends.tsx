import {useState} from 'react';
import {Friend} from '../types/user';
import {Session} from '../contexts/session';

export const useFriends = (session: Session) => {
  const [friends, setFriends] = useState<Friend[]>(session.account.friends);
  return friends;
};
