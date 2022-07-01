export class Localization {
    static AppGet: string = 'Redirected to Swagger API';

    // Bed
    static BedLocationsGet: string = 'Got all bed locations';
    static BedTypesGet: string = 'Got all bed types';
    static BedOrientationsGet: string = 'Got all bed orientations';

    // Plants
    static PlantsGet: string = 'Got all plants suggested';
    static PlantPositionsGet: string = 'Got all plant positions in bed';
    static PlantPositionsPost: string = 'Added plant to bed at position specified';
    static PlantPositionsPut: string = 'Moved plant to another position specified';
    static PlantPositionsDelete: string = 'Deleted plant at position specified';
    static PlantPositionsIdParam: string = 'The plant position resource ID';
    // Users
    static UsersPost: string = 'Created the user specified';
    static UsersPostLogin: string = 'Successfully logged in';
    static UsersDelete: string = 'Deleted the user specified';
    static UsersPut: string = 'Updated the user specifed';
    static UsersIdParam: string = 'The user resource ID';
    static UserIdInvalid: string = 'User ID invalid';

    // Errors
    static UnknownError: string = 'An unknown error occurred';
    static InvalidBody: string = 'Invalid body parameter';
    static NotLoggedIn: string = 'Not logged in';
    static PlantPositionIsNotOccupied: string = 'Plant position is not occupied';
    static PlantPositionIsOccupied: string = 'Position is occupied';
    static InvalidCredentials: string = 'Wrong credentials';
    static InvalidCredentialsGeneric: string = 'Invalid credentials';
    static IdentificatorInvalid: string = 'Username or password is not valid';
    static IdentificatorExists: string = 'Username or password already exists';
    static UsernameWrongSize: string = 'Username must be between %min% and %max% characters long';
    static PasswordWrongSize: string = 'Password must be between %min% and %max% characters long';
    static EmailWrongSize: string = 'Email address must be between %min and %max characters long';
    static UsernameAlreadyExists: string = 'A user with that name already exists';
    static EmailAlreadyExists: string = 'Email address was already taken';
    static EmailInvalid: string = 'Email address is invalid. Example format: me@example.org';
    static PlantIdInvalid: string = "Plant ID is not valid or does not exist";
    static PlantPositionsIdInvalid: string = "Plant positions ID is not valid or does not exist";
}
