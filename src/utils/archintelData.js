let id = 0;

function createData(account, shorten, status) {
    id += 1;
    return {id, account, shorten, status};
}

const data = [
    createData('AECOM', 'aecom', 'Active'),
    createData('Leidos', 'leidos', 'Active'),
    createData('SOS International', 'sosi', 'Active'),
    createData('Perspecta', 'perspecta', 'Active'),
    createData('CACI', 'caci', 'Active'),
    createData('Premier', 'premier', 'Active'),
    createData('George Washington University', 'george', 'Active'),
    createData('SAP Public Services', 'sap', 'Internal Testing'),
];

export default data;