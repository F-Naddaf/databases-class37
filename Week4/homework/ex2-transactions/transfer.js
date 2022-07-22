const { MongoClient } = require('mongodb');
const env = require('dotenv').config();

async function main() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    // transfer format (Amount - Sender - Receiver - Remark)
    await transferTransaction(client, 1000, 101, 102, 'Rent money');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function transferTransaction(
  client,
  amount,
  senderAcc,
  receiverAcc,
  remark,
) {
  const accountCollection = client
    .db('databaseWeek4')
    .collection('accountTransaction');

  const session = client.startSession();

  const transactionOption = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };

  try {
    const transactionResult = await session.withTransaction(async () => {
      const todayDate = new Date().toISOString().slice(0, 10);
      // Sender account updates
      const updateSenderAcc = await accountCollection.updateOne(
        { account_number: senderAcc },
        {
          $inc: { balance: -amount, 'account_changes.change_number': 1 },
          $set: {
            'account_changes.amount': -amount,
            'account_changes.remark': remark,
            'account_changes.changed_date': todayDate,
          },
        },
        { session },
      );
      console.log(
        `${updateSenderAcc.matchedCount} sender account found in the collection`,
      );
      console.log(`${updateSenderAcc.modifiedCount} account was modified`);

      // Receiver account updates
      const updateReceiverAcc = await accountCollection.updateOne(
        { account_number: receiverAcc },
        {
          $inc: { balance: amount, 'account_changes.change_number': 1 },
          $set: {
            'account_changes.amount': amount,
            'account_changes.remark': remark,
            'account_changes.changed_date': todayDate,
          },
        },
        { session },
      );
      console.log(
        `${updateReceiverAcc.matchedCount} receiver account found in the collection`,
      );
      console.log(`${updateReceiverAcc.modifiedCount} account was modified`);

      const isThereEnoughMoney = await accountCollection.findOne(
        {
          account_number: senderAcc,
        },
        { session },
      );

      // Does sender have enough money in their account?
      if (isThereEnoughMoney.balance <= 0) {
        await session.abortTransaction();
        console.log(
          `There is not enough money in the sender account to complete the transaction!`,
        );
        return;
      }
    }, transactionOption);

    if (transactionResult) {
      console.log(`Money has been transferred!`);
    } else {
      console.log(`Transaction aborted! Please try again`);
    }
  } catch (error) {
    console.log(
      `The transaction was aborted due to an unexpected error: `,
      error,
    );
  } finally {
    await session.endSession();
  }
}
