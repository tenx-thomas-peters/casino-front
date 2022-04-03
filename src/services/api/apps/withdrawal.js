import service from '../../config';

const WithdrawalAPI = {
    getWithdrawalList: async ({memberSeq, operationType, pageNo, pageSize}) => {
        return await service.get('getMonthMoneyHistory', {
            params: {memberSeq: memberSeq, operationType: operationType, pageNo: pageNo, pageSize: pageSize}}
        );
    },

    deleteWithdrawalBySeq: async({seq}) => {
        return await service.post('moneyHistoryDeleteBySeq', seq);
    },

    addWithdrawal: async({moneyHistory}) => {
        return await service.post('addWithdrawal', 
            {
                receiver: moneyHistory.memberSeq,
                variableAmount: moneyHistory.amount,
                note: moneyHistory.note
            });
    }
};

export default WithdrawalAPI;