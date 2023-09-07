export interface LoginRequest{
    email: string;
    password: string;
}

export interface Weather {
    date:         Date;
    temperatureC: number;
    temperatureF: number;
    summary:      string;
}