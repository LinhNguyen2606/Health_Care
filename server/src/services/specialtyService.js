import db from '../models/index';

let saveSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.nameVi ||
                !data.nameEn ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                await db.Specialty.create({
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                //  //upsert to Markdown table
                //  if (inputData.action === 'CREATE') {
                //     await db.Specialty.create({
                //         nameVi: data.nameVi,
                //         nameEn: data.nameEn,
                //         image: data.imageBase64,
                //         descriptionHTML: data.descriptionHTML,
                //         descriptionMarkdown: data.descriptionMarkdown,
                //         // id: data.specialtyId,
                //     });
                // } else if (inputData.action === 'EDIT') {
                //     let specialtyMarkdown = await db.Specialty.findOne({
                //         where: { id: inputData.specialtyId },
                //         raw: false,
                //     });

                //     if (specialtyMarkdown) {
                //         specialtyMarkdown.nameVi = data.nameVi;
                //         specialtyMarkdown.nameEn = data.nameEn;
                //         specialtyMarkdown.image = data.imageBase64;
                //         specialtyMarkdown.descriptionHTML = data.descriptionHTML;
                //         specialtyMarkdown.descriptionMarkdown = data.descriptionMarkdown;
                //         // specialtyMarkdown.id = data.id;
                //         await specialtyMarkdown.save();
                //     }
            }

            resolve({
                errCode: 0,
                message: 'Create specialty successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            resolve({
                errCode: 0,
                message: 'Get all specialties successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    saveSpecialty: saveSpecialty,
    getAllSpecialties: getAllSpecialties,
};
