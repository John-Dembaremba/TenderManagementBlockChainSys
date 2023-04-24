import React from 'react'
import { useContractRead, useAccount } from 'wagmi'
import abi from '../../../backend/artifacts/contracts/TenderManagementSystem.sol/TenderManagementSystem.json' assert {type: "json"};


function useGetContractData({ isAdverts = false,
    isStages = false,
    isCompanyProf = false,
    isCompanyDocs = false,
    isBidders = false,
    isTenderProcess = false,
    isCompanyProfile = false }) {



    if (isAdverts) {
        const { data } = useContractRead({

            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'getTenderAdvert',
            onSuccess(data) {
                console.log('Success', data)
            },
            onError(error) {
                console.log('Error', error)
            },
            watch: true,

        })
        return data
    }
    if (isStages) {
        const { data } = useContractRead({

            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'getTenderStages',
            // watch: true,


        })
        return data

    }
    if (isCompanyProf) {
        const { data } = useContractRead({

            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'getCompanyProfile',
            // watch: true,

        })
        return data

    }
    if (isCompanyDocs) {
        const { data } = useContractRead({
            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'getCompanyDocs',
            // watch: true,

        })
        return data
    }
    if (isBidders) {
        const { data } = useContractRead({
            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'getBidTender',
            // watch: true,

        })
        return data
    }
    if (isTenderProcess) {
        const { data } = useContractRead({

            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'getTenderProcess',
            // watch: true,

        })
        return data
    }

    if (isCompanyProfile) {

        const { address, isConnecting, isDisconnected } = useAccount()

        const { data } = useContractRead({

            address: '0x2F1c27d74db0eBD02A880f4A7334637AB85dEc82',
            abi: abi.abi,
            functionName: 'companyProfile',
            args: [address],
            watch: true,

        })
        return data
    }

}




export default useGetContractData