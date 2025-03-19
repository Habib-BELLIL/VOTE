import Web3 from "web3";

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.request({ method: "eth_requestAccounts" });
                resolve(web3);
            } catch (error) {
                reject(error);
            }
        } else {
            reject("Metamask not detected");
        }
    });
};

export default getWeb3;
