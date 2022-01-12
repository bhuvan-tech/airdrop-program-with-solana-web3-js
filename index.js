const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

   const newPair = new Keypair();       //allows us to create a wallet
   console.log(newPair);

   const publicKey = new PublicKey(newPair._keypair.publicKey).toString();     //extracting the public key from accountInfo and storing it in a new variable called myPublicKey

   const secretKey = newPair._keypair.secretKey;

   //function to check balance
   const getWalletBalance = async () => {
        try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

            //creating a wallet using secretkey
            const myWallet = await Keypair.fromSecretKey(secretKey);
            const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
            console.log(`=> For wallet address ${publicKey}`);
            console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
        } catch (err) {
            console.log(err);
        }
    };


    const airDropSol = async () => {
        try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const walletKeyPair = await Keypair.fromSecretKey(secretKey);
            const fromAirDropSignature = await connection.requestAirdrop(
                new PublicKey(walletKeyPair.publicKey),
                2 * LAMPORTS_PER_SOL
            );
            await connection.confirmTransaction(fromAirDropSignature);
        } catch (err) {
            console.log(err);
        }
    };

    //test
    const driverFunction = async () => {
        await getWalletBalance();
        await airDropSol();
        await getWalletBalance();
    }
    
    driverFunction();