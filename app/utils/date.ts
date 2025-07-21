function dateDifferenceFuture(value: Date) {
    const currentTime = new Date();
    const futureTime = new Date(value);
    const timeDifference = futureTime.getTime() - currentTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 1) {
        return `in ${weeks} weeks`
    }
    if (days > 1) {
        return `in ${days} days`
    }
    if (hours > 1) {
        return `in ${hours} hours`
    }
    if (minutes > 1) {
        return `in ${minutes} minutes`
    }
    if (minutes === 1) {
        return `in 1 minute`
    }

    return "now"
}


function dateDifferencePast(value: Date) {
    const currentTime = new Date();
    const pastTime = new Date(value);
    const timeDifference = currentTime.getTime() - pastTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    if (minutes < 1) {
        return "just now";
    } else if (minutes === 1) {
        return "1 minute ago";
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours === 1) {
        return "1 hour ago";
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days === 1) {
        return "1 day ago";
    } else if (days < 7) {
        return `${days} days ago`;
    } else if (weeks === 1) {
        return "1 week ago";
    } else {
        return `${weeks} weeks ago`;
    }
}

export function dateDifference(value: string){
    const d = new Date(value)
    const timeDifference = d.getTime()-(new Date).getTime()
    if (timeDifference <0){
        // Past
        return dateDifferencePast(d)
    }

    return dateDifferenceFuture(d)

}