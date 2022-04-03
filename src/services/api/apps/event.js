import service from '../../config';

const EventAPI = {
    getEventList: async ({type, classification, pageNo, pageSize}) => {
        return await service
            .get('getNoteList',
                {params: { type: type, classification: classification, pageSize: pageSize, pageNo: pageNo}});
    },
    getEventDetail: async({noteSeq}) => {
        return await service
            .get('getNoticeDetail',
                {params: { seq: noteSeq }});
    }
};

export default EventAPI;