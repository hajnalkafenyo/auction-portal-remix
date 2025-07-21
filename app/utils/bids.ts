import type { Bid } from "~/types";

export function getSortedBid(bids: Bid[] ) {
    const sortedBid = bids.sort((a, b) => (b.amount - a.amount));
    return sortedBid;
}

export function getMaxBid(bids: Bid[]) {
    if (bids.length === 0) {
        return 0;
    }
    let max = 0
    for (let i = 1; i < bids.length; i++) {
        if (bids[i].amount > bids[max].amount) {
            max = i
        }
    }
    return bids[max].amount
}