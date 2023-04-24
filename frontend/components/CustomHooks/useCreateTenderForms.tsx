import {
    Heading
} from '@chakra-ui/react';

import TenderAdvert from '../forms/TenderAdvert';
import PostTenderStages from '../forms/PostTenderStages';
import TenderDetails from '../displays/TenderDetails';


export default function useCreateTenderForms({ rfqNumber, isTenderForm = false, isStagedForm = false, isTenderDetails = false }: { rfqNumber?: string, isTenderForm?: boolean, isStagedForm?: boolean, isTenderDetails?: boolean }) {

    const TenderAdvertForm = ({ rfqNumber }: any) => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Initial Tender Details
                </Heading>
                <TenderAdvert rfqNumber={rfqNumber} />

            </>
        );
    };

    const TenderStagesForm = ({ rfqNumber }: any) => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Tender Stages Details
                </Heading>
                <PostTenderStages rfqNumber={rfqNumber} />
            </>
        );
    };

    const TenderInformationForm = ({ rfqNumber }: any) => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Tender Advert Details
                </Heading>
                <TenderDetails rfqNumber={rfqNumber} />

            </>
        );
    };


    return (
        <div>
            {isTenderForm ? <TenderAdvertForm rfqNumber={rfqNumber} /> : isStagedForm ? <TenderStagesForm rfqNumber={rfqNumber} /> : isTenderDetails ? <TenderInformationForm rfqNumber={rfqNumber} /> : null}
        </div>
    )
}




