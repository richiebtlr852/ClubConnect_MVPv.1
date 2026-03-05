/**
 * Services Index
 * Central export point for all service modules
 */

export { signUp, signIn, signOutUser, getCurrentUser, onAuthStateChange } from "./auth.service";
export type { SignUpCredentials, LoginCredentials, AuthUser } from "./auth.service";

export { UserService } from "./user.service";
export type { UserProfile, CreateUserProfileData, UpdateUserProfileData } from "./user.service";

export { PackageService } from "./package.service";
export type { CreatePackageData, UpdatePackageData } from "./package.service";

export { ClubService } from "./club.service";
export type { CreateClubData } from "./club.service";
