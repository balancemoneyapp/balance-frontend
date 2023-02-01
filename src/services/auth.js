import { del, get, post } from './request.js';

const API = '/api/v1';
const AUTH = `${API}/users`;
const SESSION = `${AUTH}/sessions`;

export async function signUpUser(credentials) {
  const { data: user, error } = await post(AUTH, credentials);
  return { user, error };
}

export async function signInUser(credentials) {
  const { data: user, error } = await post(SESSION, credentials);
  return { user, error };
}

export async function signOutUser() {
  return await del(SESSION);
}

export async function verifyUser() {
  const { data: user, error } = await get(`${AUTH}/me`);
  return { user, error };
}

const USER_KEY = 'USER';

export function storeLocalUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function getLocalUser() {
  const json = localStorage.getItem(USER_KEY);
  try {
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    console.error('Error deserializing user from local store', e);
    storeLocalUser();
  }
}
