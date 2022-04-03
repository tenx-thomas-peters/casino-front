import gameService from '../../gameConfig';

const GameListAPI = {
    getGameList: async ({vendor}) => {
    	console.log("fff");
        return await gameService.get('/game-list', {params: {vendor: vendor}});
    },
    getGameUrl: async (id, token, provider) => {
    	console.log("ccccc");
        return await gameService.get('/get-game-url', {params: {id: id, token: token, provider: provider}});
    },
};

export default GameListAPI;