// I import the functions I created in my loads
import {loadClientsToDataBase} from "./load_client.js";
import {loadBillsToDataBase} from "./load_bill.js";
import {loadTransactionsToDataBase} from "./load_transaction.js";

(async () => {
    try {
        console.log('🚀 Initializing seeders...');

        await loadClientsToDataBase() // I wait for them to run
        await loadBillsToDataBase()
        await loadTransactionsToDataBase()

        console.log('✅ All the seeders have been executed correctly.'); // Success message
    } catch (error) {
        console.error('❌ Error executing seeders:', error.message); // Error message
    } finally {
        process.exit();
    }
})()