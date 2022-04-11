import service from '../../config';

const casinoMoneyAPI = {
    syncCasinoMoney: async ({userSeq}) => {
        console.log("userSeq");
        console.log(userSeq);
        return await service
            .get("syncCasinoMoney",
            {params: {userSeq: userSeq}
            });
    }
}

export default casinoMoneyAPI