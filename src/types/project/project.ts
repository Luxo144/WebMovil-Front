//request

export interface CreateProjectRequest {
    name: string;
    description: string;
}

export interface UpdateProjectRequest {
    idProject: number;
    name: string;
    description: string;
}


export interface DeleteProjectRequest {
    idProject: number;
}

//response

export interface Project {
    id: number;
    name: string;
    description: string;
    code: string;
    createdByUserId: number;
    createdAt: string;
    updatedAt: string;
}

export interface UserProject{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
}