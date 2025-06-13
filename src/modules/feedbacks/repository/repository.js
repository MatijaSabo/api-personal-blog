const db = require(`../../../helpers/database`);
const {v4: uuidv4} = require('uuid');

class FeedbackRepository {
    constructor() {
        this.tableName = 'feedbacks';
    }

    async findAll() {
        const params = {
            TableName: this.tableName
        }

        return dbRead(params);
    }

    async findByID(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                id,
            },
        };

        return await db.get(params).promise();
    }

    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                id: uuidv4(),
                message: data.message,
                hidden: data.hidden,
                author: data.author
            },
        };

        await db.put(params).promise();

        return params.Item;
    }

    async update(id, data) {
        const params = {
            TableName: this.tableName,
            Key: {
                id: id
            },
            UpdateExpression: `set #message = :message, #hidden = :hidden, #author = :author`,
            ExpressionAttributeNames: {
                '#message': `message`,
                '#hidden': `hidden`,
                '#author': 'author'
            },
            ExpressionAttributeValues: {
                ":message": data.message,
                ":hidden": data.hidden,
                ":author": data.author
            },
            ReturnValues: `UPDATED_NEW`,
        };

        const update = await db.update(params).promise();

        return update.Attributes;
    }

    async deleteByID(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                id,
            },
        };

        return await db.delete(params).promise();
    }
}

async function dbRead(params) {
    let promise = db.scan(params).promise();
    let result = await promise;
    let data = result.Items;
    if (result.LastEvaluatedKey) {
        params.ExclusiveStartKey = result.LastEvaluatedKey;
        data = data.concat(await dbRead(params));
    }
    return data;
}

module.exports = new FeedbackRepository();