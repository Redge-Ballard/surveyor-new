//List Models
const project = {id: '', name: '', number: '', organization: '', deletedAt: ''};
const site = {id: '', parentId: '', trinomial: '', temporaryNumber: '', name: '',
dateRecorded: '', county: '', landowner: '', primaryMapReference: '', township: '',
range: '', section: '', meridian: '', recordedBy: '', deletedAt: ''};
const comment = {id: '', parentId: '', dateRecorded: '', comment: '', deletedAt: ''};

//Non-List Models
const siteUseDates = {parentId: '', primaryStart: '', primaryEnd: '', secondaryStart: '', secondaryEnd: ''};
const partA = {parentId: '', UTMzone: '', UTMe: '', UTMn: '', dimensionL: '', dimensionW: '', area: '',
class: [], prehistoricType: [], otherPrehistoric: '', historicType: [],  otherHistoric: '', nrhpStatus: '',
nrhpJustification: '', siteDescription: [], partAComments: [], locationAccess: []};
const partD = {id: '', parentId: '', panelNumber: '', numberOfFigures: '',
manufactureTechnique: [], affiliations: [], situation: '', situationOther: '', aspect: '',
heightLowest: '', heightHighest: '', description: '', vandalism: '', impactingAgents: '',  deletedAt: ''};
const culturalTemporalAffiliation = {parentId: '', list: [], other: ''};

export const Models = {
    project,
    site,
    comment,
    siteUseDates,
    partA,
    partD,
    culturalTemporalAffiliation
}
