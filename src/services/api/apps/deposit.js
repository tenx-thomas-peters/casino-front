import service from '../../config';

const DepositAPI = {
    sendRequestAccount: async ({params}) => {
        return await service.post('sendRequestAccount', params);
    },

    getDepositList: async ({memberSeq, operationType, pageNo, pageSize}) => {
        return await service.get('getMonthMoneyHistory', 
                        {params: {
                            memberSeq: memberSeq, 
                            operationType: operationType,
                            reasonType: 0,
                            pageNo: pageNo,
                            pageSize: pageSize
                        }});
    },

    deleteHistoryBySeq: async ({seq}) => {
        return await service.post('moneyHistoryDeleteBySeq', seq);
    },

    applyCharge: async ({params}) => {
        return await service.post('applyCharge', params);
    },
};

export default DepositAPI;