import { instance } from './instance';

export const profileAPI = {
  getProfile(_id: string) {
    return instance.get('profile/${_id}', ).then((response) => response.data)
  },
  updateProfile(_id: string) {
    return instance.patch('profile/:id', {_id}).then((response) => response.data)
  },
}
