import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getChapters(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Chapters', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createChapters(data: any) {
    try {
      if (data.chapterID == null) data.chapterID = shortid.generate();
        await service.sqlStorage.sqlCreate('Chapters', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getChapter(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Chapters', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateChapter(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Chapters', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteChapter(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Chapters', query);
    } catch (e) {
        throw e;
    }
}
                  