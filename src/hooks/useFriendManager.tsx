import {useState} from 'react';
import {Session} from '../contexts/session';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from '../services/api/user';

export const useFriendManager = (session: Session) => {
  const [friends, setFriends] = useState(session.account.friends);

  const addFriend = async (friendUsername: string) => {
    const newFriend = (await sendFriendRequest(session, friendUsername)).friend;
    return newFriend;
  };

  const _acceptFriendRequst = async (friendUsername: string) => {
    await acceptFriendRequest(session, friendUsername);
    const newFriendArray = session.account.friends;
    const index = newFriendArray.findIndex(
      e => e.user.username === friendUsername,
    );
    if (index === -1) {
      console.log('No Friend found! ', friendUsername);
      return;
    }
    newFriendArray[index].pending = false;
    session.update('friends', newFriendArray);
    setFriends(newFriendArray);
  };

  const _rejectFriendRequest = async (friendUsername: string) => {
    await rejectFriendRequest(session, friendUsername);
    const index = session.account.friends.findIndex(
      e => e.user.username === friendUsername,
    );
    if (index === -1) {
      console.log('No Friend found! ', friendUsername);
      return;
    }
    const newFriendArray = session.account.friends.slice(0, index);
    newFriendArray.concat(session.account.friends.slice(index + 1));
    setFriends(newFriendArray);
  };

  return {
    friends: friends.filter(e => e.pending === false),
    pendingFriends: friends.filter(e => e.pending === true),
    addFriend,
    acceptFriendRequest: _acceptFriendRequst,
    rejectFriendRequest: _rejectFriendRequest,
  };
};
