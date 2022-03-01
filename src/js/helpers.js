import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from './config';

// getJson for converting our recieved data to json formart
export const getJson = async function (url) {
  //  rejecting the promise when it takes to long to fetch data using timeout function
  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  try {
    // racing the fetch and timeout promise, so the timeout will reject the promise if takes too long
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
