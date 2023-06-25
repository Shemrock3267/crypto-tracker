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
import getBalance from '../utils/getBalance';
import getUserAccountAddress from '../utils/getUserAccountAddress';
import {
  themeColors,
  successProgressBarColor,
  errorProgressBarColor,
  hoverBtnColor,
} from '../constants/styles';
import switchToGoerliNetwork from '../utils/switchToGoerliNetwork';

const Balance = () => {
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [recipientWalletAddress, setRecipientWalletAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isTransferValValid, setIsTransferValValid] = useState(true);
  const [userBalance, setUserBalance] = useState('');
  const [transferVal, setTransferVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientWalletAddress(e.target.value);
  };

  const handleSendCoins = async () => {
    if (!isAddressValid || !isTransferValValid) return;
    if (recipientWalletAddress.length === 0) return setIsAddressValid(false);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    try {
      const weiAmount = ethers.utils.parseEther(transferVal.toString()); // Convert transferVal to Wei
      const transactionParams = {
        from: userAddress,
        to: recipientWalletAddress,
        value: weiAmount,
      };
      setIsLoading(true);

      const transaction = await signer.sendTransaction(transactionParams);
      const receipt = await provider.waitForTransaction(transaction.hash);
      setIsLoading(false);

      // Check the transaction status
      if (receipt.status === 1) {
        await getBalance(setUserBalance);

        toast.success(
          $l('APP_WALLET_TRANSACTION_SUCCESS_DESC'),
          successProgressBarColor
        );
      } else {
        toast.error(
          $l('APP_WALLET_TRANSACTION_FAILURE_DESC'),
          errorProgressBarColor
        );
      }
    } catch (err: any) {
      toast.error(err.message, errorProgressBarColor);
    }
  };

  const handleTransferValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTransferVal(value);
  };

  const validateAddress = () => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/gm;
    const res = addressRegex.test(recipientWalletAddress);
    if (recipientWalletAddress.length === 0) return;
    setIsAddressValid(res);
  };

  const validateBalance = () => {
    const isValid = transferVal <= +userBalance;
    setIsTransferValValid(isValid);
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      const goerliEthTestNetId = $l('APP_WALLET_GOERLI_TESTNETWORK_ID');
      try {
        await getUserAccountAddress(setUserWalletAddress);
        await switchToGoerliNetwork(goerliEthTestNetId);
        await getBalance(setUserBalance);

        toast.success(
          $l('APP_WALLET_NOTIFICATION_CONNECT_SUCCESS'),
          successProgressBarColor
        );
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
            <Flex minHeight='50px' direction='column'>
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
            <Flex minHeight='50px' direction='column'>
              <Input
                value={transferVal >= 0 ? transferVal : 0}
                onChange={handleTransferValChange}
                onBlur={validateBalance}
                onFocus={() => setIsTransferValValid(true)}
                isInvalid={!isTransferValValid}
              />
              {!isTransferValValid && (
                <Text color={themeColors['DECLINE_COLOR']} fontSize='sm'>
                  {$l('APP_WALLET_INCORRECT_INPUT_TRANSFER_VAL')}
                </Text>
              )}
            </Flex>
            <Button
              fontWeight='700'
              onClick={handleSendCoins}
              _hover={hoverBtnColor}
              isDisabled={isLoading}
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
