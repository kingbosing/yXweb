import Cookies from 'js-cookie'
import { getMyToken, getProfileId, removeMyToken } from '@/utils/sessionStorage'

const TokenKey = 'Admin-Token'
const MyToken = getMyToken()
const ProfileId = getProfileId()

export function getToken() {
  return MyToken // Cookies.get('TRACE')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return removeMyToken()
}

// getProfileId
export function getMyProfileId() {
  return ProfileId
}
