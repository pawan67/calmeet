export interface UserInterface {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: any;
  primaryWeb3WalletId: any;
  lastSignInAt: number;
  externalId: any;
  username: string;
  firstName: string;
  lastName: string;
  publicMetadata: PublicMetadata;
  privateMetadata: PrivateMetadata;
  unsafeMetadata: UnsafeMetadata;
  emailAddresses: EmailAddress[];
  phoneNumbers: any[];
  web3Wallets: any[];
  externalAccounts: ExternalAccount[];
  createOrganizationEnabled: boolean;
}

export interface PublicMetadata {}

export interface PrivateMetadata {}

export interface UnsafeMetadata {}

export interface EmailAddress {
  id: string;
  emailAddress: string;
  verification: Verification;
  linkedTo: LinkedTo[];
}

export interface Verification {
  status: string;
  strategy: string;
  externalVerificationRedirectURL: any;
  attempts: any;
  expireAt: any;
  nonce: any;
}

export interface LinkedTo {
  id: string;
  type: string;
}

export interface ExternalAccount {
  id: string;
  approvedScopes: string;
  emailAddress: string;
  username: string;
  publicMetadata: PublicMetadata2;
  label: any;
  verification: Verification2;
}

export interface PublicMetadata2 {}

export interface Verification2 {
  status: string;
  strategy: string;
  externalVerificationRedirectURL: any;
  attempts: any;
  expireAt: number;
  nonce: any;
}
