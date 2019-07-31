let id = 0;

function createData(account, shorten, status) {
    id += 1;
    return {id, account, shorten, status};
}

const data = [
    createData('AECOM', 'aecom', 'Active'),
    createData('Leidos', 'leidos', 'Active'),
    createData('SOS International', 'sosi', 'Active'),
    // createData('Iridium', 'iridium', 'Not Active'),
    createData('Perspecta', 'perspecta', 'Internal Testing'),
    createData('Peraton', 'peraton', 'Active'),
    createData('Raytheon', 'raytheon', 'Active'),
    createData('Maxar Technologies', 'maxar', 'Active'),
    createData('CACI', 'caci', 'Active'),
    createData('Premier', 'premier', 'Active'),
    createData('SAP Public Services', 'sap', 'Internal Testing'),
    createData('KBR', 'kbr', 'Internal Testing'),
    createData('George Washington University', 'george', 'Active'),
    createData('L3 Harris', 'harris', 'Internal Testing'),
];

export default data;