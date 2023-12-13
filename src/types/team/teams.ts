//request
export interface CreateTeamRequest {
    name: string;
    description: string;
}

export interface UpdateTeamRequest {
    idTeam: number;
    name: string;
    description: string;
}

export interface DeleteTeamRequest {
    idTeam: number;
}

//response
export interface Team {
    id: number;
    name: string;
    description: string;
    code: string;
    createdByUserId: number;
    createdAt: string;
    updatedAt: string;
    deleteAt: string;
}