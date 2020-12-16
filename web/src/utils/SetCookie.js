export const setCookie = (name, value) => {
  if (name && value) {
    document.cookie = `${name}=${value}`;
  } else {
    console.error('attempt to set cookie use without both parametrs');
  }
}