import React, { useEffect, useState } from "react";
import Web3 from "web3";
import VotingABI from "./Voting.json";

const CONTRACT_ADDRESS = "0x..."; // Adresse du contrat déployé

function App() {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const loadBlockchainData = async () => {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);

            const votingContract = new web3.eth.Contract(VotingABI, CONTRACT_ADDRESS);
            setContract(votingContract);
        };
        loadBlockchainData();
    }, []);

    return (
        <div>
            <h1>Voting DApp</h1>
            <p>Connected Account: {account}</p>
        </div>
    );
}

export default App;
