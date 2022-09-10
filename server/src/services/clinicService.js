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

let getAllClinics = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            resolve({
                errCode: 0,
                message: 'Get all clinics successfully!',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let handleEditClinic = (data) => {
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
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (clinic) {
                clinic.nameVi = data.nameVi;
                clinic.nameEn = data.nameEn;
                clinic.address = data.address;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    clinic.imageBase64 = data.imageBase64;
                }
                await clinic.save();
                resolve({
                    errCode: 0,
                    message: 'Edit clinic successfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'clinic not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let handleDeleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundClinic = await db.Clinic.findOne({ where: { id: clinicId } });
            if (!foundClinic) {
                resolve({
                    errCode: 2,
                    errMessage: "The clinic isn't exist.",
                });
            }
            await db.Clinic.destroy({ where: { id: clinicId } });
            resolve({
                errCode: 0,
                message: 'Delete clinic successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['nameVi', 'nameEn', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image'],
                });

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    });
                    //append doctorClinic vao data
                    data.doctorClinic = doctorClinic;
                } else data = {};

                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClinic: createClinic,
    getAllClinics: getAllClinics,
    handleEditClinic: handleEditClinic,
    handleDeleteClinic: handleDeleteClinic,
    getDetailClinicById: getDetailClinicById,
};
