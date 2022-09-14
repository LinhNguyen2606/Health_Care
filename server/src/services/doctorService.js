import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailService from '../services/emailService';
const MAX_NUMBER_SCHEDULES = process.env.MAX_NUMBER_SCHEDULES;

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi'],
                    },

                    {
                        model: db.Allcode,
                        as: 'genderData',
                        attributes: ['valueEn', 'valueVi'],
                    },

                    {
                        model: db.Doctor_Infor,
                        attributes: ['specialtyId'],
                        include: [
                            {
                                model: db.Specialty,
                                as: 'specialtyTypeData',
                                attributes: ['nameEn', 'nameVi'],
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                message: 'Get top doctor successfully',
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image'],
                },
            });
            resolve({
                errCode: 0,
                message: 'Get all doctors successfully',
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let checkRequiredFields = (inputData) => {
    let arrFields = [
        'doctorId',
        'contentHTML',
        'contentMarkdown',
        'action',
        'selectedPrice',
        'selectedPayment',
        'selectedProvince',
        'nameClinic',
        'addressClinic',
        'note',
        'specialtyId',
    ];

    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element,
    };
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters: ${checkObj.element}`,
                });
            } else {
                //upsert to Markdown table
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    });
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    });

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save();
                    }
                }
            }

            //upsert to Doctor_infor table
            let doctorInfor = await db.Doctor_Infor.findOne({
                where: { doctorId: inputData.doctorId },
                raw: false,
            });
            if (doctorInfor) {
                //update
                doctorInfor.doctorId = inputData.doctorId;
                doctorInfor.priceId = inputData.selectedPrice;
                doctorInfor.provinceId = inputData.selectedProvince;
                doctorInfor.paymentId = inputData.selectedPayment;
                doctorInfor.nameClinic = inputData.nameClinic;
                doctorInfor.addressClinic = inputData.addressClinic;
                doctorInfor.note = inputData.note;
                doctorInfor.specialtyId = inputData.specialtyId;
                doctorInfor.clinicId = inputData.clinicId;
                await doctorInfor.save();
            } else {
                //create
                await db.Doctor_Infor.create({
                    doctorId: inputData.doctorId,
                    priceId: inputData.selectedPrice,
                    provinceId: inputData.selectedProvince,
                    paymentId: inputData.selectedPayment,
                    nameClinic: inputData.nameClinic,
                    addressClinic: inputData.addressClinic,
                    note: inputData.note,
                    specialtyId: inputData.specialtyId,
                    clinicId: inputData.clinicId,
                });
            }

            resolve({
                errCode: 0,
                message: 'Save infor doctor successfully!',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let handleDeleteDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundDoctor = await db.User.findOne({ where: { id: doctorId } });
            if (!foundDoctor) {
                resolve({
                    errCode: 2,
                    errMessage: "The doctor isn't exist.",
                });
            }
            await db.User.destroy({ where: { id: doctorId } });
            resolve({
                errCode: 0,
                message: 'Delete doctor successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },

                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi'],
                        },

                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                {
                                    model: db.Specialty,
                                    as: 'specialtyTypeData',
                                    attributes: ['nameEn', 'nameVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'priceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'provinceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'paymentTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                            ],
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    message: 'Get detail doctor by id successfully',
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                //build một cục data
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULES;
                        return item;
                    });
                }

                //get all existing data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formattedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                });

                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                // create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    message: 'Create schedule successfully',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'timeTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },

                        {
                            model: db.User,
                            as: 'doctorData',
                            attributes: ['fullname'],
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                if (!dataSchedule) dataSchedule = [];

                resolve({
                    errCode: 0,
                    message: 'Get schedule by date successfully',
                    data: dataSchedule,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getExtraInforDoctorById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: { doctorId: idInput },
                    attributes: {
                        exclude: ['id', 'doctorId'],
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'priceTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                        {
                            model: db.Allcode,
                            as: 'provinceTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                        {
                            model: db.Allcode,
                            as: 'paymentTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    message: 'Get extra doctor infor successfully!',
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getProfileDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },

                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi'],
                        },

                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'priceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'provinceTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                {
                                    model: db.Allcode,
                                    as: 'paymentTypeData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                            ],
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    message: 'Get profile doctor by id successfully',
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                let data = await db.Booking.findAll({
                    where: { doctorId: 'S2', doctorId: doctorId, date: date },
                    include: [
                        {
                            model: db.User,
                            as: 'patientData',
                            attributes: ['email', 'fullname', 'address', 'gender', 'phoneNumber'],
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'genderData',
                                    attributes: ['valueEn', 'valueVi'],
                                },
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: 'timeTypeDataPatient',
                            attributes: ['valueEn', 'valueVi'],
                        },
                    ],

                    raw: false,
                    nest: true,
                });

                resolve({
                    errCode: 0,
                    message: 'Get list patient for doctor successfully!',
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType || !data.imgBase64) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                //update patient status
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2',
                    },
                    raw: false,
                });

                if (appointment) {
                    appointment.statusId = 'S3';
                    await appointment.save();
                }
                //send email remedy
                await emailService.sendAttachment(data);
                resolve({
                    errCode: 0,
                    errMessage: 'Send remedy successfully!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    handleDeleteDoctor: handleDeleteDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
};
