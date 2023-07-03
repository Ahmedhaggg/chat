export default interface IPassportUser {
    displayName: string;
    photos: [{
        value: string,
    }];
    emails: [{
        value: string,
    }];
}