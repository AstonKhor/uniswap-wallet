import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Root Stack Navigator Types
export type RootStackParamList = {
  index: undefined;
  'wallet-address': undefined;
  'import-wallet': undefined;
  '(main)': NavigatorScreenParams<TabParamList>;
};

// Tab Navigator Types
export type TabParamList = {
  Portfolio: undefined;
  Transactions: undefined;
  Send: undefined;
  Settings: undefined;
};

// Onboarding Stack Types
export type OnboardingStackParamList = {
  Welcome: undefined;
  InputMethod: undefined;
  AddressInput: undefined;
  SeedPhraseInput: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>;

export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> =
  NativeStackScreenProps<OnboardingStackParamList, T>;

// Navigation Props
export type RootStackNavigationProp = RootStackScreenProps<keyof RootStackParamList>['navigation'];
export type TabNavigationProp = TabScreenProps<keyof TabParamList>['navigation'];
export type OnboardingNavigationProp = OnboardingScreenProps<
  keyof OnboardingStackParamList
>['navigation'];

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
