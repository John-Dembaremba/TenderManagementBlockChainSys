
export default function stageIdGenerator(rfqNum, stageNum) {
    let tenderStageNum = stageNum.toString()
    return rfqNum + "-" + tenderStageNum
}