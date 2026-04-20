const prisma = require('./index');

async function saveResponse(slackId, slackName, response, lunchDate) {
    return await prisma.lunchResponse.upsert({
        where: {
            slackId_lunchDate: {slackId, lunchDate}
        },
        update: {response},
        create: {slackId, slackName, response, lunchDate}
    });
}

async function getResponsesForDate(lunchDate) {
    return await prisma.lunchResponse.findMany({
        where: {lunchDate}
    });
}

async function getReservations(lunchDate) {
    return await prisma.lunchResponse.findMany({
        where: {response: 'RESERVE', lunchDate}
    })
}

async function getStatus(lunchDate) {
    return await prisma.lunchResponse.groupBy({
        by: ['response'],
        where: {lunchDate},
        _count: {
            response: true
        }
    });
}

module.exports = {
    saveResponse,
    getResponsesForDate,
    getReservations,
    getStatus

}