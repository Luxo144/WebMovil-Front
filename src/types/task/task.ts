//
export interface CreateTaskRequest{
    name: string;
    description: string;
    responsibleId: number|null;
    projectId: number;
}

export interface UpdateTaskRequest{

    name: string;
    description?: string;
    responsibleId?: number;
    status: string;
    comments?: string;
    endDate?: string;
}
export interface DeleteTask{
    idTask: number;
}

export interface GetTask{
    id: number;
    name: string;
    description: string;
    createdByUserId: number;
    responsibleId: number;
    status: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    comments: string;
    nameResponsible: string;
    nameCreatedBy: string;
}

export interface FilterTask{
    userId: number;
    name?: string;
    responsibleId?: number;
    status?: string | null;
    myTasks?: boolean;
}

export interface AddComent{
    idTask: number;
    content: string
}

export interface GetComments{
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    nameCreatedBy: string;
}