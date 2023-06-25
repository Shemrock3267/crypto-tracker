const getUserAccountAddress = async (
  cb: React.Dispatch<React.SetStateAction<string>>
) => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const acc = accounts[0];
  cb(acc);
};

export default getUserAccountAddress;
