//
export interface CreateTaskRequest{
    name: string;
    description: string;
    responsibleId: number;
    projectId: number;
}

export interface UpdateTaskRequest{

    name: string;
    description: string;
    responsibleId: number;
    status: string;
    comments: string;
    endDate: string;
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
}

export interface FilterTask{
    userId: number;
    name?: string;
    responsibleId?: number;
    status?: string; 
    myTasks?: boolean;
}