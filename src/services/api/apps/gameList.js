import gameService from '../../gameConfig';

const GameListAPI = {
    getGameList: async ({vendor}) => {
        return await gameService.get('/game-list', {params: {vendor: vendor}});
    },
    getGameUrl: async (id, token, provider) => {
        return await gameService.get('/get-game-url', {params: {id: id, token: token, provider: provider}});
    },
};

export default GameListAPI;