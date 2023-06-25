import { ILocales } from '../types/constants';

export default {
  APP_SIDEBAR_TITLE: 'Crypting',
  APP_SIDEBAR_NAV_DASHBOARD: 'Dashboard',
  APP_SIDEBAR_NAV_WALLET: 'Wallet',
  APP_WALLET_BALANCE_TITLE: 'Ethereum Balance: ',
  APP_WALLET_SEND_TO_TITLE: 'Transfer Ethereum to:',
  APP_WALLET_TRANSFER_COINS_TITLE: 'Send',
  APP_WALLET_SENT_TO_PLACEHOLDER: 'Enter ETH wallet address...',
  APP_WALLET_ADDRESS_TITLE: 'Wallet Address:',
  APP_WALLET_INCORRECT_INPUT_ADDRESS: 'Please enter correct ETH address',
  APP_WALLET_CONNECT_METAMASK_BTN_TITLE: 'Connect to Metamask',
  APP_WALLET_DISCONNECT_METAMASK_BTN_TITLE: 'Disconnect wallet',
  APP_WALLET_NOTIFICATION_SUCCESS: 'Success, transfer completed.',
  APP_WALLET_NOTIFICATION_ERROR: 'Error, transfer failed. Try again later.',
  APP_WALLET_ETH_SYMBOL: 'ETH',
  APP_WALLET_NOTIFICATION_CONNECT_SUCCESS: 'Successfully connected to Metamask',
  APP_WALLET_NOTIFICATION_METAMASK_MISSING: 'Metamask not detected',
  APP_WALLET_STATUS_NOT_CONNECTED: 'Not connected',
  APP_WALLET_GOERLI_TESTNETWORK_ID: '0x5',
  APP_WALLET_GOERLI_TESTNETWORK_SWITCH_SUCCESS:
    'You have succefully switched to Goerli Test Network',
  APP_WALLET_GOERLI_TESTNETWORK_UNAVAILABLE:
    'This Goerli testnetwork is not available in your Metamask, please add it',
  APP_WALLET_GOERLI_TESTNETWORK_SWITCH_FAILED:
    'Failed to switch to the Goerli testnetwork',
  APP_WALLET_INCORRECT_INPUT_TRANSFER_VAL:
    'You have insufficient balance, change amount please',
  APP_WALLET_TRANSACTION_SUCCESS_DESC: 'Trasaction completed',
  APP_WALLET_TRANSACTION_FAILURE_DESC: 'Transaction failed',
} as ILocales;
