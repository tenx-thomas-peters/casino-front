import service from '../../config';

const casinoMoneyAPI = {
    syncCasinoMoney: async ({userId}) => {
        return await service.get("syncCasinoMoney",
            {
                params: {userId: userId}
            });
    }
}

export default casinoMoneyAPI