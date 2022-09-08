import specialtyService from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getAllSpecialties = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialties();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleEditSpecialty = async (req, res) => {
    try {
        let data = req.body;
        let infor = await specialtyService.handleEditSpecialty(data);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let handleDeleteSpecialty = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(404).json({
                errCode: 1,
                errMessage: 'Missing required parameters!',
            });
        }
        let infor = await specialtyService.handleDeleteSpecialty(req.body.id);
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
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    getDetailSpecialtyById: getDetailSpecialtyById,
    handleEditSpecialty: handleEditSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty,
};
