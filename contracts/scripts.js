let web3;
let votingContract;
const votingContractAddress = 'YOUR_CONTRACT_ADDRESS';
const votingABI = [
    // ABI of the Voting contract
    {
        "constant": true,
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

async function init() {
    // Modern dapp browsers
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    }
    // Legacy dapp browsers
    else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    votingContract = new web3.eth.Contract(votingABI, votingContractAddress);
    displayCandidates();
}

async function displayCandidates() {
    const candidatesCount = await votingContract.methods.candidatesCount().call();
    const candidatesDiv = document.getElementById('candidates');

    for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await votingContract.methods.candidates(i).call();
        const candidateElement = document.createElement('div');
        candidateElement.innerHTML = `
            <p>Candidate ${candidate.id}: ${candidate.name} - Votes: ${candidate.voteCount}</p>
            <button onclick="vote(${candidate.id})">Vote</button>
        `;
        candidatesDiv.appendChild(candidateElement);
    }
}

async function vote(candidateId) {
    const accounts = await web3.eth.getAccounts();
    try {
        await votingContract.methods.vote(candidateId).send({ from: accounts[0] });
        document.getElementById('message').innerHTML = `<p id="success">Voted successfully for candidate ${candidateId}!</p>`;
        displayCandidates();
    } catch (error) {
        document.getElementById('message').innerHTML = `<p id="error">${error.message}</p>`;
    }
}

window.onload = init;
