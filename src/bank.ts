class Transaction{
    amount: number;
    date: Date;
    constructor(amount: number, date: Date){
        this.amount = amount;
        this.date = date;
    }
}

class Customer{
    name: string;
    id: number;
    transactions: Transaction[];
    constructor(name: string, id: number){
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
        const balance = this.transactions.reduce((prev, current) => prev + current.amount, 0);
        return balance;
    }
    //Adds a successful transaction of the amount to the transactions array.
    addTransactions(amount: number){
        if((this.getBalance() + amount) < 0){  //since balance should not be negative
            console.log('transaction failed, there is no enough balanc\n');
            return false;
        }
        else{
            const transaction = new Transaction(amount, new Date());
            this.transactions.push(transaction);
            console.log('transaction successful\n');
            return true;
        }
    }
}

class Branch{
    name: string;
    customers: Customer[];
    constructor(name: string){
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
    addCustomer(customer: Customer){
        if(!this.customers.includes(customer)){
            this.customers.push(customer);
            return true;
        }
        else{
            return false;
        }
    }
    //Adds a transaction of the amount for the customer with the specified customerId.
    addCustomerTransaction(customerId: number, amount: number){
        const customer: Customer = this.customers.find(customer => (customer.id ===  customerId));
        if(customer){
            customer.addTransactions(amount);
            return true;
        }
        else{
            console.log('transaction failed, customer not found\n');
            return false;
        }
    }
    /*Add search functionality to allow users to search for specific customers based on 
      keywords or specific fields, such as by name or Id*/
    findCustomer(customerName: string){
        const customer = this.customers.find(customer => (customer.name ===  customerName));
        if(customer){
            console.log('customer found: ', customer, '\n');
        }
        else{
            console.log('customer not found\n');
        }
    }
}

class Bank{
    name: string;
    branches: Branch[];
    constructor(name: string){
        this.name = name;
        this.branches = [];
    }
    //Adds the branch to the branches array. Each branch should only be added once.
    addBranch(branch: Branch){ 
        if(!this.branches.includes(branch)){
            this.branches.push(branch);
            console.log('branch added successfully\n');
            return true;
        }
        else{
            console.log('this branch is already existed\n');
            return false;
        }
    }
    //Adds the customer to the branch of the bank. Each customer can only be added once to a branch.
    addCustomer(branch: Branch, customer: Customer){ 
        if(this.branches.includes(branch)){
            if(branch.getCustomers().includes(customer)){
                console.log('customer already existed\n');
                return false;
            }
            else{
                branch.addCustomer(customer);
                console.log('customer added successfully\n');
                return true;
            }
        }
        else{
            return false;
        }
    }
    //Adds a transaction of the amount for the customer with the specified customerId in the given branch.
    addCustomerTransaction(branch: Branch, customerId: number, amount: number){
        if(this.branches.includes(branch)){  
            branch.addCustomerTransaction(customerId, amount);
            return true;
        }
        else{
            console.log('branch not found\n');
            return false;
        } 
    }
    //Returns a list of matched branches with the specified branchName or null if no matches were found.
    findBranchByName(branchName: string){
        const branchArray = this.branches.filter(branch => branch.name === branchName);
        if(branchArray.length > 0){
            console.log('branch found:');
            return branchArray;
        }
        else{
            console.log('branch not found\n');
            return null;
        }
    }
    //Returns true if the branch belongs to the bank or false otherwise.
    checkBranch(branch: Branch){
        if(this.branches.includes(branch)){
            return true;
        }
        else {
            return false;
        } 
    }
    //Prints out a list of customers with their transaction details if includeTransactions is true.
    listCustomers(branch: Branch, includeTransactions: boolean){
        if(this.branches.includes(branch)){
            if(includeTransactions){
                console.log(`the list of the customers in ${branch.getName()} is: `);
                branch.getCustomers().forEach(customer => {
                    console.log('Name:', customer.name, ', id:', customer.id, customer.transactions);
                })
            }
            else{
                console.log(`the list of customers in ${branch.getName()} is: `);
                console.log(branch.getCustomers().map(customer => {return[customer.name, customer.id]}), '\n');
            }
        }
        else{
            console.log('branch not found\n');
        }
    }
}

const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch) 

console.log(arizonaBank.findBranchByName("West Branch"), '\n');
arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)

customer1.addTransactions(-1000)
console.log('balance = ',customer1.getBalance(), '\n')
arizonaBank.listCustomers(westBranch, true)
arizonaBank.listCustomers(sunBranch,false)
westBranch.findCustomer("John");