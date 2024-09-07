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
    event AttestationReceived(address attester, uint256 tokenId);
    event MintCalled(address to, uint256 tokenId, uint256 score);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to, uint256 score) public  {

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        _scores[tokenId] = score;
        _safeMint(to, tokenId);
        num++;
        emit MintCalled(to, tokenId, score);
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
        if(extraData.length==32){
            
            num=10;
            score = abi.decode(extraData, (uint256));
            mint(attester, score);
            emit AttestationReceived(attester, _tokenIdCounter);
        }
        
    }


}

