import { toast } from 'react-toastify';

import {
  errorProgressBarColor,
  successProgressBarColor,
} from '../constants/styles';
import { $l } from './getLocale';

const switchToGoerliNetwork = async (id: string) => {
  // Switch to Goerli testnet switchToGoerliTestnet(networkId)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: id }], // networkId
    });
    toast.success(
      $l('APP_WALLET_GOERLI_TESTNETWORK_SWITCH_SUCCESS'),
      successProgressBarColor
    );
  } catch (err: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (err.code === 4902) {
      toast.error(
        $l('APP_WALLET_GOERLI_TESTNETWORK_UNAVAILABLE'),
        errorProgressBarColor
      );
    }
    toast.error(
      $l('APP_WALLET_GOERLI_TESTNETWORK_SWITCH_FAILED'),
      errorProgressBarColor
    );
  }
};

export default switchToGoerliNetwork;
