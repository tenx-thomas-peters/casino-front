import service from '../../config';

const SupportAPI = {
    getSupportList: async ({memberSeq, type, classification, pageNo, pageSize}) => {
        return await service.get('getNoteList', {
            params: {
                sender: memberSeq,
                type: type, 
                classification: classification,
                pageNo: pageNo,
                pageSize: pageSize
            }});
    },

    postSupportForm: async ({memberSeq, title, content, type, classification}) => {
        return await service.post('postSupportForm', {  
                sender: memberSeq,
                title: title,
                content: content,
                type: type,
                classification: classification
            });
    },

    deleteNote: async ({noteSeq}) => {
        return await service.delete('deleteNote', {params: {noteSeq: noteSeq}});
    }
};

export  default SupportAPI;