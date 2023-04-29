const model = require('../models/model');

// get - http:localhost:8080/api/categories
async function getCategories(req, res) {
    try {
        const Categories = await model.Categories.find({});
        return res.status(200).json(Categories);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while fetching ${error}` });
    }
}

// post - http:localhost:8080/api/categories
async function createCategories(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: 'Please provide data!' });
    }
    const { type, color } = req.body;

    const categories = new model.Categories({
        type,
        color,
    });

    try {
        const savedCategories = await categories.save();
        return res.status(201).json(savedCategories);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while creating Categories ${error}` });
    }
}

// delete - http:localhost:8080/api/categories
async function deleteCategories(req, res) {
    if (!req.body) {
        return res
            .status(400)
            .json({ message: 'Please provide id to delete!' });
    }

    try {
        const categories = await model.Categories.deleteOne(req.body);
        return res.status(200).json(categories);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while deleting ${error}` });
    }
}

// get - http:localhost:8080/api/transaction
async function getTransaction(req, res) {
    try {
        const transaction = await model.Transaction.find({});
        return res.status(200).json(transaction);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while fetching ${error}` });
    }
}

// post - http:localhost:8080/api/transaction

async function createTransaction(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: 'Please provide data!' });
    }
    const { name, type, amount } = req.body;

    const transaction = new model.Transaction({
        name,
        type,
        amount,
        date: new Date(),
    });

    try {
        const savedTransaction = await transaction.save();
        return res.status(201).json(savedTransaction);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while creating ${error}` });
    }
}

// delete - http:localhost:8080/api/transaction
async function deleteTransaction(req, res) {
    if (!req.body) {
        return res
            .status(400)
            .json({ message: 'Please provide id to delete!' });
    }

    try {
        const transaction = await model.Transaction.deleteOne(req.body);
        return res.status(200).json(transaction);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while deleting ${error}` });
    }
}

// get - http:localhost:8080/api/labels
async function getLabels(req, res) {
    try {
        const labels = await model.Transaction.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'categoriesInfo',
                },
            },
            {
                $unwind: '$categoriesInfo',
            },
        ]);
        const result = labels.map((v, i) => {
            return {
                _id: v._id,
                name: v.name,
                type: v.type,
                amount: v.amount,
                color: v.categoriesInfo.color,
            };
        });
        return res.status(200).json(result);
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Error while fetching lookup ${error}` });
    }
}
module.exports = {
    createCategories,
    getCategories,
    createTransaction,
    getTransaction,
    deleteTransaction,
    getLabels,
};
