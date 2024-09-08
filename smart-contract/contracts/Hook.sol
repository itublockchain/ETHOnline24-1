// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface Name {
    function didReceiveAttestation ( address attester, uint64 schemaId, uint64 attestationId, bytes calldata extraData ) external payable;
}

contract Hook is ERC721, ERC721URIStorage {

    event AttestationReceived (address attester, uint256 tokenId);
    event MintCalled (address to, uint256 tokenId, uint256 score);
    
    uint256 private tokenIDCounter;

    constructor() ERC721("Persona", "ITU") {}

    function didReceiveAttestation( address attester, uint64 schemaId, uint64 attestationId, bytes calldata extraData ) external payable {
        (uint256 decodedScore, address decodedRecipient, string memory decodedTokenURI) = abi.decode(extraData, (uint256, address, string));
        uint256 tokenId = ++tokenIDCounter; _safeMint(decodedRecipient, tokenId); _setTokenURI(tokenId, decodedTokenURI); 
        schemaId; attestationId; emit MintCalled(decodedRecipient, tokenId, decodedScore); emit AttestationReceived(attester, tokenIDCounter);
    }

    function tokenURI ( uint256 _tokenId ) public view override ( ERC721, ERC721URIStorage ) returns ( string memory ) {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface ( bytes4 _interfaceId ) public view override ( ERC721, ERC721URIStorage ) returns ( bool ) {
        return super.supportsInterface(_interfaceId);
    }
    function safeTransferFrom ( address _from, address _to, uint256 _tokenId, bytes memory _data ) public override ( ERC721, IERC721 ) pure {
        _from; _to; _tokenId; _data;
        revert("LameSBT: Tokens are non-transferable");
    }

    function approve ( address _to, uint256 _tokenId ) public override ( ERC721, IERC721 ) pure {
        _to; _tokenId;
        revert("LameSBT: Tokens are non-transferable");
    }

    function transferFrom ( address _from, address _to, uint256 _tokenId ) public override ( ERC721, IERC721 ) pure {
        _from; _to; _tokenId;
        revert("LameSBT: Tokens are non-transferable");
    }

    function setApprovalForAll ( address _operator, bool _approved ) public override ( ERC721, IERC721 ) pure {
        _operator; _approved;
        revert("LameSBT: Tokens are non-transferable");
    }
    
}