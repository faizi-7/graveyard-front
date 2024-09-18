// import { atom } from 'recoil';

// export const tokenState = atom({
//   key: 'tokenState',
//   default: localStorage.getItem('token'),
// });

import { atom } from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: localStorage.getItem('token'),
  effects: [
    ({ onSet }) => {
      onSet((newToken, _, isReset) => {
        if (isReset || newToken === null) {
          localStorage.removeItem('token');
        } else {
          localStorage.setItem('token', newToken);
        }
      });
    },
  ],
});