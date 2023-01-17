USER_JSON="../erd10708qccw2u0hlfwjka57qud9upjw3r2ltxmnsm36gfpgextywyzqd8ytjh.json"
PROXY="https://devnet-gateway.multiversx.com"
CHAIN_ID="D"
CONTACT_ADDRESS="erd1qqqqqqqqqqqqqpgq2m7hkwkdyupuuacjnnmn0n38mpju5mk6wyzq9we452"


erdpy --verbose contract call $CONTACT_ADDRESS --keyfile=${USER_JSON} --gas-limit=3000000 --function="reset" --proxy=$PROXY  --recall-nonce --send --chain=${CHAIN_ID}


