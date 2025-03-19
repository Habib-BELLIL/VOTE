import React, { useState } from "react";

const Vote = ({ contract, account }) => {
    const [proposalId, setProposalId] = useState("");

    const handleVote = async () => {
        if (!contract) {
            alert("Le contrat n'est pas chargé !");
            return;
        }

        try {
            await contract.methods.vote(proposalId).send({ from: account });
            alert("Vote enregistré avec succès !");
        } catch (error) {
            console.error("Erreur lors du vote :", error);
            alert("Une erreur est survenue. Vérifiez votre saisie et réessayez.");
        }
    };

    return (
        <div>
            <h2>Votez pour une proposition</h2>
            <input
                type="number"
                placeholder="ID de la proposition"
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
            />
            <button onClick={handleVote}>Voter</button>
        </div>
    );
};

export default Vote;
