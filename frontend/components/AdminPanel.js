import React, { useState } from "react";

const AdminPanel = ({ contract, account }) => {
    const [status, setStatus] = useState("");

    const startProposalRegistration = async () => {
        try {
            await contract.methods.startProposalsRegistration().send({ from: account });
            alert("Session d'enregistrement des propositions commencée !");
        } catch (error) {
            console.error("Erreur lors du démarrage :", error);
            alert("Impossible de démarrer la session.");
        }
    };

    const endProposalRegistration = async () => {
        try {
            await contract.methods.endProposalsRegistration().send({ from: account });
            alert("Session d'enregistrement des propositions terminée !");
        } catch (error) {
            console.error("Erreur lors de la clôture :", error);
            alert("Impossible de clôturer la session.");
        }
    };

    const startVotingSession = async () => {
        try {
            await contract.methods.startVotingSession().send({ from: account });
            alert("Session de vote commencée !");
        } catch (error) {
            console.error("Erreur lors du démarrage :", error);
            alert("Impossible de démarrer la session de vote.");
        }
    };

    const endVotingSession = async () => {
        try {
            await contract.methods.endVotingSession().send({ from: account });
            alert("Session de vote terminée !");
        } catch (error) {
            console.error("Erreur lors de la clôture :", error);
            alert("Impossible de clôturer la session de vote.");
        }
    };

    const tallyVotes = async () => {
        try {
            await contract.methods.tallyVotes().send({ from: account });
            alert("Votes comptabilisés !");
        } catch (error) {
            console.error("Erreur lors du comptage des votes :", error);
            alert("Impossible de comptabiliser les votes.");
        }
    };

    return (
        <div>
            <h2>Panneau Administrateur</h2>
            <button onClick={startProposalRegistration}>Démarrer l'enregistrement des propositions</button>
            <button onClick={endProposalRegistration}>Clôturer l'enregistrement des propositions</button>
            <button onClick={startVotingSession}>Démarrer la session de vote</button>
            <button onClick={endVotingSession}>Clôturer la session de vote</button>
            <button onClick={tallyVotes}>Comptabiliser les votes</button>
        </div>
    );
};

export default AdminPanel;
