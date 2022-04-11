import service from '../../config';

const casinoMoneyAPI = {
    syncCasinoMoney: async ({seq}) => {
        return await service
            .get("syncCasinoMoney",
            {params: {userSeq: seq}
            });
    }
}

export default casinoMoneyAPI