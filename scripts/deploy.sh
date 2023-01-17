USER_JSON="../erd10708qccw2u0hlfwjka57qud9upjw3r2ltxmnsm36gfpgextywyzqd8ytjh.json"
PROXY="https://devnet-gateway.multiversx.com"
CHAIN_ID="D"


erdpy --verbose contract deploy --project=../vote/vote \
    --recall-nonce --keyfile=${USER_JSON} \
    --gas-limit=30000000 \
    --send --outfile="deploy-devnet.interaction.json" \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return