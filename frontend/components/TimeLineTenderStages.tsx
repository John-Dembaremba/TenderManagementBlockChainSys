import React from 'react'
import { useContractRead } from 'wagmi'
import abi from '../utils/contractAbi.json' assert {type: "json"};
import useGetContractData from './CustomHooks/useGetContractData';


function TimeLineTenderStages({ rfqNumber }: any) {

    const data = useGetContractData({ isStages: true })

    try {
        const entries = Object.entries(data)
        return (
            <div>
                {entries.map(item => (
                    <ol className="items-center sm:flex">
                        {rfqNumber === item[1]["requestForQuotaion"] &&
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>

                                <div className="mt-3 sm:pr-8">

                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item[1]["requestForQuotaion"]}</h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item[1]["requirements"]}</p>
                                </div>
                            </li>
                        }

                    </ol>
                ))}
            </div>
        )
    } catch (error) {
        console.log(error)
        return (
            <></>
        )
    }

}

export default TimeLineTenderStages

