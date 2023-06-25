import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Flex,
  Text,
  CardFooter,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import { $l } from '../utils/getLocale';
import {
  themeColors,
  successProgressBarColor,
  errorProgressBarColor,
  hoverBtnColor,
} from '../constants/styles';

const Balance = () => {
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [recipientWalletAddress, setRecipientWalletAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [userBalance, setUserBalance] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientWalletAddress(event.target.value);
  };

  const handleSendCoins = async () => {
    if (!isAddressValid) return;
    if (recipientWalletAddress.length === 0) return setIsAddressValid(false);
    /** ToDo: Handle the logic for sending Ethereum to the provided wallet address */
    const transactionParams = {
      from: userWalletAddress,
      to: recipientWalletAddress,
    };
  };

  const validateAddress = () => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/gm;
    const res = addressRegex.test(recipientWalletAddress);
    if (recipientWalletAddress.length === 0) return;
    setIsAddressValid(res);
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      const goerliEthTestNetId = $l('APP_WALLET_GOERLI_TESTNETWORK_ID');
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const acc = accounts[0];

        setUserWalletAddress(acc);
        toast.success(
          $l('APP_WALLET_NOTIFICATION_CONNECT_SUCCESS'),
          successProgressBarColor
        );

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        console.log('chain id:', chainId);

        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: goerliEthTestNetId }],
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

        const retrieveBalance = async () => {
          const balance = await provider.getBalance(acc);
          const etherBalance = ethers.utils.formatEther(balance);
          setUserBalance(etherBalance);
        };
        await retrieveBalance();
      } catch (err: any) {
        toast.error(
          err?.data?.message || `Failed to connect: ${err?.data?.message}`,
          errorProgressBarColor
        );
      }
    } else {
      toast.error(
        $l('APP_WALLET_NOTIFICATION_METAMASK_MISSING'),
        errorProgressBarColor
      );
    }
  };

  const handleDisconnectWallet = () => {
    setUserWalletAddress('');
    setUserBalance('');
  };

  return (
    <Flex direction='column' justifyContent='center'>
      <Card maxW='600px' minW='250px' marginBottom='2em' fontWeight='bold'>
        <CardHeader>
          {userWalletAddress
            ? `${$l('APP_WALLET_ADDRESS_TITLE')} ${userWalletAddress}`
            : `${$l('APP_WALLET_ADDRESS_TITLE')} ${$l(
                'APP_WALLET_STATUS_NOT_CONNECTED'
              )}`}
        </CardHeader>
        <CardBody>
          {$l('APP_WALLET_BALANCE_TITLE')}
          <Text>
            {userBalance ? `${userBalance} ${$l('APP_WALLET_ETH_SYMBOL')}` : ''}
          </Text>
        </CardBody>
        <CardFooter>
          {!userWalletAddress ? (
            <Button
              fontWeight='700'
              onClick={handleConnectWallet}
              _hover={hoverBtnColor}
            >
              {$l('APP_WALLET_CONNECT_METAMASK_BTN_TITLE')}
            </Button>
          ) : (
            <Button
              fontWeight='700'
              onClick={handleDisconnectWallet}
              _hover={hoverBtnColor}
            >
              {$l('APP_WALLET_DISCONNECT_METAMASK_BTN_TITLE')}
            </Button>
          )}
        </CardFooter>
      </Card>
      {userWalletAddress && (
        <Card maxW='600px' minW='250px'>
          <CardHeader fontWeight='bold'>
            {$l('APP_WALLET_SEND_TO_TITLE')}
          </CardHeader>
          <CardBody>
            <Flex minHeight='75px' direction='column'>
              <Input
                type='text'
                placeholder={$l('APP_WALLET_SENT_TO_PLACEHOLDER')}
                value={recipientWalletAddress}
                onChange={handleInputChange}
                onBlur={validateAddress}
                onFocus={() => setIsAddressValid(true)}
                isInvalid={!isAddressValid}
                errorBorderColor='crimson'
              />

              {!isAddressValid && (
                <Text color={themeColors['DECLINE_COLOR']} fontSize='sm'>
                  {$l('APP_WALLET_INCORRECT_INPUT_ADDRESS')}
                </Text>
              )}
            </Flex>
            <Button
              fontWeight='700'
              onClick={handleSendCoins}
              _hover={hoverBtnColor}
            >
              {$l('APP_WALLET_TRANSFER_COINS_TITLE')}
            </Button>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export default Balance;
