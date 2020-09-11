const axios = require('axios');
const dsConfig = require('../../config/dsConfig');
const dsClient = axios.create(dsConfig);
const db = require('../../data/db-config');

const getUserByEmail = async (useremail) => {
  console.log(useremail);
  return db('profiles')
    .where({ email: `${useremail}` })
    .first();
};

const getMoneyFlow = async (user_ID, time_period) => {
  return getUserByEmail(user_ID).then(async (user) => {
    return await dsClient.post(`/moneyflow`, {
      bank_account_id: user.bank_account_id,
      time_period,
    });
  });
};

const getSpending = async (user_ID, graph_type, time_period) => {
  return getUserByEmail(user_ID).then(async (user) => {
    return await dsClient.post('/spending', {
      bank_account_id: user.bank_account_id,
      graph_type,
      time_period,
    });
  });
};

const getFutureBudget = async (user_id, monthly_savings_goal, placeholder) => {
  return getUserByEmail(user_id).then(async (user) => {
    return dsClient.post('/future_budget', {
      bank_account_id: user.bank_account_id,
      monthly_savings_goal,
      placeholder,
    });
  });
};

const getCurrentMonthSpending = async (user_id) => {
  return getUserByEmail(user_id).then(async (user) => {
    console.log(user.bank_account_id);
    return dsClient.get(`/current_month_spending/${user.bank_account_id}`);
  });
};

module.exports = {
  getSpending,
  getMoneyFlow,
  getFutureBudget,
  getCurrentMonthSpending,
};
