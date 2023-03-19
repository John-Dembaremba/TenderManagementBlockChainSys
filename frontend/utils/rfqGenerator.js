

export default function rfqGenerator() {
    let randomNum = Math.floor(100000 + Math.random() * 900000)
    const rfqNum = "RFQ-" + randomNum.toString()
    return rfqNum
}







