import db from '../models/index';

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.nameVi ||
                !data.nameEn ||
                !data.address ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                await db.Clinic.create({
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
            }

            resolve({
                errCode: 0,
                errMessage: 'Ok',
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClinic: createClinic,
};
