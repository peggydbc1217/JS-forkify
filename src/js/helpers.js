/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */
// contain resued functions
// import { hasOwnMetadata } from "core-js/library/es6/reflect";
import { TIMEOUT_SEC } from "./config.js";

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (url, uploadData = undefined) => {
  const fetchPro = uploadData ? fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  }) : fetch(url);

  try {
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // magic value = 10

    const data = await res.json(); // convert to json
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async (url) => {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     // magic value = 10

//     const data = await res.json(); // convert to json
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async (url, uploadData) => {
//   try {
//     const res = await Promise.race([fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     }), timeout(TIMEOUT_SEC)]);
//     // magic value = 10

//     const data = await res.json(); // convert to json
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
