class Transaction{
    constructor(amount, date){
        this.amount = amount;
        this.date = date;
    }
}

class Customer{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.transactions = []; 
    }

    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getTransactions(){
        return this.transactions;
    }
    getBalance(){
        //balance should not be negative
        const balance = this.transactions.reduce((prev, current) => prev + current.amount, 0);
        return balance;
    }
    //Adds a successful transaction of the amount to the transactions array.
    addTransactions(amount){
        if(amount < 0){ 
            return false;
        }
        else{
            const transaction = new Transaction(amount, new Date());
            this.transactions.push(transaction);
            return true;
        }
    }
}

class Branch{
    constructor(name){
        this.name = name;
        this.customers = [];
    }

    getName(){
        return this.name;
    }
    getCustomers(){
        return this.customers;
    }
    //Adds the customer to the customers array. Each customer should only be added once.
    addCustomer(customer){
        if(!this.customers.includes(customer)){
            this.customers.push(customer);
            return true;
        }
        else{
            return false;
        }
    }
    //Adds a transaction of the amount for the customer with the specified customerId.
    addCustomerTransaction(customerId, amount){
        const customer = this.customers.find(customer => customer.id ===  customerId)
        if(customer){
            customer.addTransactions(amount);
            return true;
        }
        else{
            return false;
        }
    }
}

class Bank{
    constructor(name){
        this.name = name;
        this.branches = [];
    }

    //Adds the branch to the branches array. Each branch should only be added once.
    addBranch(branch){ 
        if(!this.branches.includes(branch)){
            this.branches.push(branch);
            return true;
        }
        else{
            return false;
        }
    }
    //Adds the customer to the branch of the bank. Each customer can only be added once to a branch.
    addCustomer(branch, customer){ 
        if(this.branches.includes(branch)){
            branch.addCustomer(customer);
            return true;
        }
        else{
            return false;
        }
    }
    //Adds a transaction of the amount for the customer with the specified customerId in the given branch.
    addCustomerTransaction(){

    }
    //Returns a list of matched branches with the specified branchName or null if no matches were found.
    findBranchByName(branchName){
        
    }
    //Returns true if the branch belongs to the bank or false otherwise.
    checkBranch(branch){
        if(this.branches.includes(branch)){
            return true;
        }
        else {
            return false;
        } 
    }
    //Prints out a list of customers with their transaction details if includeTransactions is true.
    listCustomers(){

    }
}

const c1 = new Customer('h', '1');
c1.addTransactions(1000);
c1.addTransactions(2000);
c1.addTransactions(-4000);
//console.log(c1.getBalance()); //should not be negative

const sb = new Branch('sun br');
 console.log(sb.addCustomer(c1));
// console.log(sb.addCustomer(c1));

//console.log(sb.addCustomerTransaction('1', 5000));

const b1 = new Bank('bank1');
console.log(b1.addBranch('sb'));
console.log(b1.addBranch('sb'));
console.log(b1.addBranch('gb'));
console.log(b1.findBranchByName('sb'));