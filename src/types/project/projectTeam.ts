export interface ProjectTeamAssign {
    idTeam: number;
    idProject: number;
}

export interface RemoveTeamFromProject{
    idTeam: number;
    idProject: number;
}

//reponse

export interface TeamsOfProject{
    id: number;
    name: string;
    description: string;
    code: string;
    createdByUserId: number;
    createdAt: string;
    updatedAt: string;
    deleteAt: string;
}

export interface ProjectsOfTeam{
    id: number;
    name: string;
    description: string;
    code: string;
    createdByUserId: number;
    createdAt: string;
    updatedAt: string;
}