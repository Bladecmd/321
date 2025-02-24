Blockchain Voting Application

Overview

This project is a decentralized voting application built using Solidity, Web3.js, and a simple front-end interface. The smart contract allows users to vote for candidates in a secure and tamper-proof manner using blockchain technology.

Features

Deployable Ethereum smart contract for voting

Prevents duplicate voting using an address-based tracking system

Front-end UI for interacting with the contract using Web3.js

Real-time candidate vote count display

Secure and transparent voting process

Smart Contract

The smart contract is written in Solidity and includes the following functionalities:

Adding candidates

Voting for a candidate (one vote per address)

Retrieving candidate details

Emitting events upon voting

Contract Code (Solidity)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    event VotedEvent(uint indexed candidateId);

    constructor() {
        addCandidate("Alice");
        addCandidate("Bob");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit VotedEvent(_candidateId);
    }

    function getCandidate(uint _candidateId) public view returns (string memory, uint) {
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
}

Front-End

The project includes an HTML, CSS, and JavaScript front-end that allows users to interact with the voting smart contract. The front-end:

Displays available candidates

Allows users to vote through MetaMask

Updates vote counts in real time

Technologies Used

Solidity

Web3.js

HTML, CSS, JavaScript

MetaMask (for interacting with the blockchain)

Installation & Setup

Clone the repository

git clone https://github.com/yourusername/your-repository.git
cd your-repository

Deploy the Smart Contract

Use Remix IDE or Hardhat to deploy the contract to a local or testnet Ethereum network.

Update the Front-End

Replace YOUR_CONTRACT_ADDRESS in scripts.js with the deployed contract address.

Ensure MetaMask is installed and connected to the correct network.

Run the Front-End

Open index.html in a browser with MetaMask enabled.

Usage

Connect your wallet using MetaMask.

View the list of candidates.

Vote for a candidate.

See vote counts update in real-time.

License

This project is licensed under the MIT License.

