const ExpenseSchema = require("../models/ExpenseModel")
const UserModel = require("../models/User")
let user1

exports.addExpense = async (req, res) => {
    const { username, title, amount, category, description, date}  = req.body
    console.log("Expense: ", username)
    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        await income.save()
        const user = await UserModel.findOne({ username });
        user1 = user
        user.expenseTransactions.push(income);
        await user.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        console.log("USER1: ", user1)
        const incomes = user1.expenseTransactions
        const income_trans = await ExpenseSchema.find({
            _id: {$in: incomes}
        }).sort({createdAt: -1})
        res.status(200).json(income_trans)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}