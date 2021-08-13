import config from '../config';

export default {
  info(...args) {
    if (config.env === 'prod') return;
    console.log(...args);
  },
  warn(...args) {
    if (config.env === 'prod') return;
    console.warn(...args);
  },
  error(...args) {
    if (config.env === 'prod') return;
    console.error(...args);
  },
};
