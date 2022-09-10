import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getAllClinics = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinics();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleEditClinic = async (req, res) => {
    try {
        let data = req.body;
        let infor = await clinicService.handleEditClinic(data);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleDeleteClinic = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(404).json({
                errCode: 1,
                errMessage: 'Missing required parameters!',
            });
        }
        let infor = await clinicService.handleDeleteClinic(req.body.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    createClinic: createClinic,
    getAllClinics: getAllClinics,
    getDetailClinicById: getDetailClinicById,
    handleEditClinic: handleEditClinic,
    handleDeleteClinic: handleDeleteClinic,
};
