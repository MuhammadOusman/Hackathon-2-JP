export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    user: User;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};