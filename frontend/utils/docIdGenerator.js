
export default function docIdGenerator(userAddress, docNum = 0) {
    let companyDocNum = docNum.toString()
    return userAddress + "-" + companyDocNum
}