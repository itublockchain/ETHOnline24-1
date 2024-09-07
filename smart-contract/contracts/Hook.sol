// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface Name {
    function didReceiveAttestation(address attester, uint64 schemaId, uint64 attestationId,bytes calldata extraData) external payable;
}
contract Hook is ERC721{
    bytes public check;
    mapping(uint256 => uint256) public _scores;
    uint256 private _tokenIdCounter;
    uint public num;
    uint public score;
    address public recipient;
    address public ownr;
    event AttestationReceived(address attester, uint256 tokenId);
    event MintCalled(address to, uint256 tokenId, uint256 score);

    constructor() ERC721("Persona", "ITU") {}

    function mint(address to, uint256 _score) public  {

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        _scores[tokenId] = _score;
        _safeMint(to, tokenId);
        ownr=to;

        emit MintCalled(to, tokenId, _score);
    }
    function safeTransferFrom(address from,address to,uint256 tokenId,bytes memory _data) public override pure{
        revert("LameSBT: Tokens are non-transferable");
    }

    function approve(address to,uint256 tokenId) public override pure{
        revert("LameSBT: Tokens are non-transferable");
    }

    function transferFrom(address from,address to,uint256 tokenId) public override pure{
        revert("LameSBT: Tokens are non-transferable");
    }

    function setApprovalForAll(address operator, bool approved) public override pure{
        revert("LameSBT: Tokens are non-transferable");
    }

    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        bytes calldata extraData
    )
        external
        payable
    {
        check=extraData;
        num++;
        (uint256 decodedScore, address decodedRecipient) = abi.decode(extraData, (uint256, address));

    // decodedScore ve decodedRecipient ile işlemler yap
        score = decodedScore;
        recipient = decodedRecipient;
        mint(recipient, score);
        emit AttestationReceived(attester, _tokenIdCounter);

        
    }


}

