let id = 0;

function createData(account, shorten, teamLead, sched, time, status) {
    id += 1;
    return {id, account, shorten, teamLead, sched, time, status};
}

const data = [
    createData('AECOM', 'aecom', 'Gigi Melecio', 'Monday - Friday',6, 'Active'),
    createData('Leidos', 'leidos', 'Jhoanna Valdez', 'Monday - Friday',6, 'Active'),
    createData('KBR', 'kbr', 'Marc Mondala', 'Monday - Friday',6, 'Internal Testing'),
    createData('UMUC Ventures', 'ventures', 'Anna Mondala', 'Monday - Friday',6, 'Active'),
    createData('GD Mission Systems', 'gdms', 'Anna Mondala', 'Monday - Friday',6, 'Active'),

    createData('Peraton', 'peraton', 'Gigi Melecio', 'Monday - Friday',7, 'Active'),
    createData('Raytheon', 'raytheon', 'Ray Santos', 'Monday - Friday',7, 'Active'),
    createData('Maxar Technologies', 'maxar', 'Jhoanna Valdez', 'Monday - Friday',7, 'Active'),
    createData('CACI', 'caci', 'Gigi Melecio', 'Monday - Friday',7, 'Active'),
    createData('Premier', 'premier', 'Marc Mondala', 'Monday - Friday',7, 'Active'),
    createData('SAP Public Services', 'sap', 'Anna Mondala', 'Monday - Friday',7, 'Internal Testing'),
    createData('L3 Harris', 'harris', 'Marc Mondala', 'Monday - Friday',7, 'Internal Testing'),

    // createData('Perspecta', 'perspecta', 'Ray Santos', 'Monday - Friday',9, 'Active'),
    createData('George Washington University', 'george', 'Marc Mondala', 'Friday Only',9, 'Active'),

    createData('SOS International', 'sosi', 'Gigi Melecio', 'Monday - Friday',12, 'Active'),
];

export default data;