import db from '../models/index';

let createSpecialty = (data) => {
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
                    errMessage: 'Missing required parameters',
                });
            } else {
                await db.Specialty.create({
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
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

let handleEditSpecialty = (data) => {
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
                    errMessage: 'Missing required parameters',
                });
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (specialty) {
                specialty.nameVi = data.nameVi;
                specialty.nameEn = data.nameEn;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    specialty.imageBase64 = data.imageBase64;
                }
                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Edit specialty successfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Specialty not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let handleDeleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundSpecialty = await db.Specialty.findOne({ where: { id: specialtyId } });
            if (!foundSpecialty) {
                resolve({
                    errCode: 2,
                    errMessage: "The specialty isn't exist.",
                });
            }
            await db.Specialty.destroy({ where: { id: specialtyId } });
            resolve({
                errCode: 0,
                message: 'Delete specialty successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'nameVi', 'nameEn'],
                });

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId, provinceId: location },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    }
                    //append doctorSpecialty vao data
                    data.doctorSpecialty = doctorSpecialty;
                } else data = {};

                resolve({
                    errCode: 0,
                    message: 'Get detail specialty id successfully!',
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    handleEditSpecialty: handleEditSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
};
