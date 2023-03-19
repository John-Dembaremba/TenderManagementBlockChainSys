export default function applicationIdGenerator(stageId, applicationNum = 0) {
    let tenderApplicateNum = applicationNum.toString()
    return stageId + "B" + tenderApplicateNum
}