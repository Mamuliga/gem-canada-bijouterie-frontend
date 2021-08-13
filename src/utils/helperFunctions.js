export const getLocaleText = (enText, frText) => {
  return {
    en: enText,
    fr: frText,
  };
};

export const addHyphenWhenEmpty = (value) => (value ? value : '-');

export const getRoundedNumber = number => {
  if (!number) return '-';
  return parseFloat((Math.round(number * 10) * 10) / 100).toFixed(2);
};
