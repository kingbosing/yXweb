const MyCompany = 'MyCompany'

export function setMyCompanys(MyCompanys) {
  sessionStorage.setItem(MyCompany, MyCompanys)
}

export function getMyCompanys() {
  return JSON.parse(sessionStorage.getItem(MyCompany))
}

// Token
export function getMyToken() {
  return sessionStorage.getItem('Token')
}

export function removeMyToken() {
  return sessionStorage.removeItem('Token')
}

// getProfileId
export function getProfileId() {
  return sessionStorage.getItem('MyProfileId')
}
