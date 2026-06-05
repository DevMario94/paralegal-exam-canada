import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.paralegalexamcanada.app',
  appName: 'Paralegal Exam Canada',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    allowNavigation: [],
  },
  ios: {
    contentInset: 'always',
    allowsLinkPreview: false,
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: true,
    preferredContentMode: 'mobile',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#0B0F14',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      fadeInDuration: 300,
      fadeOutDuration: 400,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0B0F14',
      overlaysWebView: true,
    },
    Haptics: {},
  },
};

export default config;
