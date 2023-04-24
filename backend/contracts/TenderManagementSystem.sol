// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TenderManagementSystem {
    // Tender Advert
    struct TenderAdvert {
        string requestForQuotation;
        string openDate;
        string closingDate;
        string requirements;
        address account;
    }
    mapping(address => TenderAdvert) public tenderAdvert; // link blockchain account with tender adverts
    TenderAdvert[] public tendersArray;

    struct TenderStages {
        string requestForQuotation;
        address account;
        string stageId;
        string stageName;
        string requirements;
    }
    mapping(string => TenderStages) public tenderStages; // link tender RFQ with tender stages
    TenderStages[] public tenderStagesArray;

    // Profile
    struct CompanyProfile {
        address account;
        string companyName;
        string companyAddress;
        string contactInfo;
        string email;
    }
    mapping(address => CompanyProfile) public companyProfile;
    CompanyProfile[] public companiesProfilesArray;

    struct CompanyDocs {
        address account;
        string docId;
        string name;
        string[] docAddress; // CID from IPFS
    }
    mapping(address => CompanyDocs) public companyDocs; // link bidder or clients address with CompanyDocs
    CompanyDocs[] public companiesDocsArray;
    // Bidders

    struct BidTender {
        address account;
        string applicationId;
        string tenderStage;
        string[] biddingDocs; // CID from IPFS
    }
    mapping(address => BidTender) public bidTender; // link bider address with BidTender
    BidTender[] public bidTendersArray;

    struct TenderProcess {
        address account;
        string application; // Fk from applicationId in BidTender
        bool acceptApplication;
        string reasons;
    }
    mapping(address => TenderProcess) public tenderProcessing; // link client address with TenderProcessing
    TenderProcess[] public tenderProcessesArray;

    function createTenderAdvert(
        string memory _requestForQuotation,
        string memory _openDate,
        string memory _closingDate,
        string memory _requirements
    ) public {
        TenderAdvert storage postTender = tenderAdvert[msg.sender];
        postTender.requestForQuotation = _requestForQuotation;
        postTender.openDate = _openDate;
        postTender.closingDate = _closingDate;
        postTender.requirements = _requirements;
        postTender.account = msg.sender;
        tendersArray.push(postTender);
    }

    function getTenderAdvert() public view returns (TenderAdvert[] memory) {
        return tendersArray;
    }

    function createTenderStages(
        string memory _requestForQuotaion,
        string memory _stageId,
        string memory _stageName,
        string memory _requirements
    ) public {
        TenderStages storage postTenderStages = tenderStages[
            _requestForQuotaion
        ];
        postTenderStages.requestForQuotation = _requestForQuotaion;
        postTenderStages.stageId = _stageId;
        postTenderStages.stageName = _stageName;
        postTenderStages.requirements = _requirements;
        postTenderStages.account = msg.sender;
        tenderStagesArray.push(postTenderStages);
    }

    function getTenderStages() public view returns (TenderStages[] memory) {
        return tenderStagesArray;
    }

    function createCompanyProfile(
        string memory _companyName,
        string memory _companyAddress,
        string memory _contactInfo,
        string memory _email
    ) public {
        CompanyProfile storage _companyProfile = companyProfile[msg.sender];
        _companyProfile.companyName = _companyName;
        _companyProfile.companyAddress = _companyAddress;
        _companyProfile.contactInfo = _contactInfo;
        _companyProfile.email = _email;
        _companyProfile.account = msg.sender;
        companiesProfilesArray.push(_companyProfile);
    }

    function getCompanyProfile() public view returns (CompanyProfile[] memory) {
        return companiesProfilesArray;
    }

    function createCompanyDocs(
        string memory _docId,
        string memory _name,
        string[] memory _docAddress
    ) public {
        CompanyDocs storage _companyDocs = companyDocs[msg.sender];
        _companyDocs.docId = _docId;
        _companyDocs.name = _name;
        _companyDocs.docAddress = _docAddress;
        _companyDocs.account = msg.sender;
        companiesDocsArray.push(_companyDocs);
    }

    function getCompanyDocs() public view returns (CompanyDocs[] memory) {
        return companiesDocsArray;
    }

    function createBidTender(
        string memory _applicationId,
        string memory _tenderStage,
        string[] memory _biddingDocs
    ) public {
        BidTender storage _bidTender = bidTender[msg.sender];
        _bidTender.applicationId = _applicationId;
        _bidTender.tenderStage = _tenderStage;
        _bidTender.biddingDocs = _biddingDocs;
        _bidTender.account = msg.sender;
        bidTendersArray.push(_bidTender);
    }

    function getBidTender() public view returns (BidTender[] memory) {
        return bidTendersArray;
    }

    function createTenderProcess(
        string memory _application,
        bool _acceptApplication,
        string memory _reasons
    ) public {
        TenderProcess storage _tenderProcessing = tenderProcessing[msg.sender];
        _tenderProcessing.application = _application;
        _tenderProcessing.acceptApplication = _acceptApplication;
        _tenderProcessing.reasons = _reasons;
        _tenderProcessing.account = msg.sender;
        tenderProcessesArray.push(_tenderProcessing);
    }

    function getTenderProcess() public view returns (TenderProcess[] memory) {
        return tenderProcessesArray;
    }
}
