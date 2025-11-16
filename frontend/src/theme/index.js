export const colors = {
  // Primary Colors
  primary: '#07B4C8',
  primaryDark: '#0592A3',
  primaryLight: '#5FD9E6',
  
  // Background
  bgGradientTop: '#E6F9F9',
  bgGradientBottom: '#FFFFFF',
  background: '#F5FAFB',
  
  // Card & Surface
  card: '#FFFFFF',
  cardSubtle: '#F5FAFB',
  surface: '#FFFFFF',
  
  // Text
  textPrimary: '#1A1D1F',
  textSecondary: '#5A6A76',
  textMuted: '#93A2AF',
  
  // Status Colors
  success: '#3BB273',
  warning: '#F5A300',
  danger: '#E45858',
  info: '#4DA3FF',
  
  // UI Elements
  border: '#E2E8EC',
  divider: '#E8EDF1',
  tabInactive: '#9BA9B2',
  
  // Health Stats
  statGood: '#3BB273',
  statBad: '#E45858',
  statNeutral: '#93A2AF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  small: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  tiny: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};
