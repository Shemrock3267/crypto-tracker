export const themeColors = {
  MAIN_COLOR: '#7414EF', // violet
  SECONDARY_COLOR: '#FFFFFF', // white
  CONTENT_BACKGROUND_COLOR: '#F9F7FB', // dark pink
  TEXT_COLOR: '#595859', // black
  GROWTH_COLOR: '#ACCBA4', // green
  DECLINE_COLOR: '#DA8B7C', // red
};

export const successProgressBarColor = {
  progressStyle: {
    background: themeColors['MAIN_COLOR'],
  },
};

export const errorProgressBarColor = {
  progressStyle: {
    background: themeColors['DECLINE_COLOR'],
  },
};

export const hoverBtnColor = {
  bg: themeColors['MAIN_COLOR'],
  color: themeColors['SECONDARY_COLOR'],
};
