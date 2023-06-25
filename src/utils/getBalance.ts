import { ethers } from 'ethers';

const getBalance = async (cb: React.Dispatch<React.SetStateAction<string>>) => {
  const params = await getBalanceParams();
  const { acc, provider } = params;

  const balance = await provider.getBalance(acc);
  const etherBalance = ethers.utils.formatEther(balance);
  console.log(typeof etherBalance);
  cb(etherBalance);
};

const getBalanceParams = async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const acc = accounts[0];
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return {
    acc,
    provider,
  };
};

export default getBalance;
