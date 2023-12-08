const IncomeSchema= require("../models/IncomeModel")
const UserModel = require("../models/User")
let user1
exports.addIncome = async (req, res) => {
    const {username, title, amount, category, description, date}  = req.body
    // console.log("Username: ", username)
    const income = IncomeSchema({
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
        user.incomeTransactions.push(income);
        await user.save();
        console.log(user.incomeTransactions)
        res.status(200).json({message: 'Income Added'})

    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        console.log("USER1: ", user1)
        const incomes = user1.incomeTransactions
        const income_trans = await IncomeSchema.find({
            _id: {$in: incomes}
        }).sort({createdAt: -1})
        // const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(income_trans)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
    // const newArray = objectIdArray.filter((objectId) => !objectId.equals(id));
}