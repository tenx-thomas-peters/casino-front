import service from '../../config';

const NoteAPI = {
    getInboxNoteList: async ({userSeq, type, pageNo, pageSize}) => {
        return await service.get('getInboxNoteList', {
            params: {
                receiver: userSeq,
                type: type, 
                pageNo: pageNo,
                pageSize: pageSize
            }});
    },
    deleteNote: async ({noteSeq}) => {
        return await service.delete('deleteNote', {params: {noteSeq: noteSeq}});
    },
    changeReadStatus: async ({params}) => {
        return await service.post('changeReadStatus', params);
    },
    changeReadStatusAll: async() => {
        return await service.get('changeReadStatusAll');
    },
    removeAll: async() => {
        return await service.get('removeAll');
    }
};

export  default NoteAPI;