import {
    CreateTaskRequest,
    UpdateTaskRequest,
    DeleteTask,
    GetTask,
    FilterTask,
    AddComent,
    GetComments
} from '../../types/task/task';

import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';
import { API_URL } from '@env';

const BASE_URL = `${API_URL}/tasks`;

//crear una tarea
export const createTask = async (taskData: CreateTaskRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/create-task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener tarea por id
export const getTaskById = async (taskId: number, token: string): Promise<GetTask | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-task/${taskId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const data: GetTask = await response.json();
    return data;
};

//obtener todas las tareas de un proyecto
export const getAllTasks = async (projectId: number, token: string): Promise<GetTask[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-tasks/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const data: GetTask[] = await response.json();
    return data;
};

//actualizar una tarea
export const updateTask = async (taskData: UpdateTaskRequest, token: string, idTask:number ): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/${idTask}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//eliminar una tarea
export const deleteTask = async (taskData: DeleteTask, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

export const getTasks = async (queryParams: Omit<FilterTask, 'userId'>, token: string): Promise<GetTask[] | ApiResponseError> => {
    const url = new URL(BASE_URL);
    Object.keys(queryParams).forEach(key => {
        const queryKey = key as keyof typeof queryParams;
        const queryValue = queryParams[queryKey];
        if (queryValue !== undefined && queryValue !== null) {
            url.searchParams.append(queryKey, queryValue.toString());
        }
    });

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const data: GetTask[] = await response.json();
    return data;
};

//crear un comentario
export const addComment = async (commentData: AddComent, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/createComment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commentData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener los comentarios de una tarea
export const getComments = async (taskId: number, token: string): Promise<GetComments[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/getComments/${taskId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const data: GetComments[] = await response.json();
    return data;
};