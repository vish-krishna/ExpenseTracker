const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Categories => field =>['type', 'color']

const CategoriesModel = new Schema({
    type: { type: String, default: 'Investment' },
    color: { type: String, default: '#FCBE44' },
});

//transaction => filed => ['name', 'type', 'amount', 'date']

const transactionModel = new Schema({
    name: { type: String, default: 'Anonymous' },
    type: { type: String, default: 'Investment' },
    amount: { type: Number },
    date: { type: Date, default: Date.now },
});

const Categories = mongoose.model('Categories', CategoriesModel);
const Transaction = mongoose.model('transaction', transactionModel);

exports.default = Transaction;
module.exports = {
    Categories,
    Transaction,
};
