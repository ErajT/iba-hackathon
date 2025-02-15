import { ethers } from "ethers";

// Set up the provider (using Infura or other Ethereum node)

const {ethereum} =window
// console.log(ethereum)



const provider = new ethers.BrowserProvider(ethereum)

// const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/fb42f5c8ad5e4f6fb113a25d8a9d4b5b"); // Replace with your Infura project ID

// The contract ABI and address
const contractABI = [
  "function sendPayment(address payable to) external payable",
  "function contractBalance() external view returns (uint256)",
  "function withdraw(uint256 amount) external",
  "event PaymentMade(address indexed from, address indexed to, uint256 amount)",
  "event Withdrawal(address indexed owner, uint256 amount)",
//   "receive() external payable" // Added the receive function to handle incoming Ether to the contract
];
const contractAddress = "0x7054849f3f8913e9DDD5b28C0Fd8481b1722f11E"; // Replace with the actual contract address

// Create a function that connects to MetaMask and sets up the signer
async function connectMetaMask() {
  if (window.ethereum) {
    try {
      // Request account access from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Use the first account returned from MetaMask
      
      const signer = await  provider.getSigner();
      
      console.log(signer)
      // Initialize the contract with the MetaMask signer
      const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
      const contractWithProvider = new ethers.Contract(contractAddress, contractABI, provider);
      
      // Now, you can call contract functions using this contract instance.
      return {contractWithProvider,contractWithSigner};

    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("MetaMask is not installed");
  }
}

// Example: Send payment from user to the contract
async function sendPaymentToContract() {
  const amountInEther = "0.00005"; // Amount in Ether to send to the contract
  const {contractWithSigner} = await connectMetaMask(); // Get the contract connected to MetaMask

  if (!contractWithSigner) return;

  // Convert the Ether amount to Wei (the smallest unit of Ether)
  
  
  const amountInWei = ethers.parseEther(amountInEther);

  console.log(amountInWei)

  try {
    // Send the payment to the contract
    
    const tx = await contractWithSigner.sendPayment(
      contractAddress, // Contract address
      {value: amountInWei }   // Payment amount in Wei
    );

 
    console.log("Transaction sent. Waiting for confirmation...");
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed. Receipt:", receipt);
    
  } catch (error) {
    console.error("Error sending payment to the contract:", error);
  }
}

// Example: Send payment from contract to another address
async function sendPaymentFromContract() {
  const toAddress = "0xE4336Ca3Aefa5Ce6457A8c36bE8842Ba8B309547"; // Replace with recipient's address
  const amountInEther = "0.0001"; // Amount in Ether to send
  const {contractWithSigner} = await connectMetaMask(); // Get the contract connected to MetaMask

  if (!contractWithSigner) return;

  // Convert the Ether amount to Wei
  const amountInWei = ethers.parseEther(amountInEther);

  try {
    // Send payment from the contract to another address
    const tx = await contractWithSigner.runner.sendTransaction(toAddress, { value: amountInWei });

    console.log("Transaction sent. Waiting for confirmation...");
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed. Receipt:", receipt);
    
  } catch (error) {
    console.error("Error sending payment from contract:", error);
  }
}

// Example: Check contract balance
async function checkContractBalance() {
  const {contractWithProvider} = await connectMetaMask(); // Get the contract connected to MetaMask

  if (!contractWithProvider) return;

  try {
    const balance = await contractWithProvider.contractBalance();
    console.log("Contract balance (in Wei):", balance.toString());
    console.log("Contract balance (in Ether):", ethers.formatEther(balance));
  } catch (error) {
    console.error("Error fetching contract balance:", error);
  }
}

// Example: Withdraw funds from the contract (only owner can do this)
async function withdrawFunds() {
  const amountInEther = "0.1"; // Amount to withdraw in Ether
  const amountInWei = ethers.utils.parseEther(amountInEther);
  const contract = await connectMetaMask(); // Get the contract connected to MetaMask

  if (!contract) return;

  try {
    // Call the withdraw function to transfer funds to the owner's wallet
    const tx = await contract.withdraw(amountInWei);
    console.log("Withdrawal successful. Transaction:", tx);
  } catch (error) {
    console.error("Error withdrawing funds:", error);
  }
}

// Calling the functions
// sendPaymentToContract(); // Send Ether to the contract
// checkContractBalance();  // Check the contract's balance
// sendPaymentFromContract(); // Send payment from the contract
// withdrawFunds(); // Withdraw funds (only if you're the owner)


export{sendPaymentFromContract,sendPaymentToContract,checkContractBalance,withdrawFunds}