import{
    CreateProjectRequest,
    UpdateProjectRequest,
    DeleteProjectRequest,
    Project,
    UserProject
} from '../../types/project/project';

import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';

const BASE_URL = 'http://192.168.117.1:3009/projects'

//crear un proyecto
export const createProject = async (projectData: CreateProjectRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/create-project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener un proyecto por id
export const getProjectById = async (projectId: number, token: string): Promise<Project | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-project/${projectId}`, {
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
    const data: Project = await response.json();
    return data;
};

//obtener todos los proyectos de un usuario
export const getAllProjects = async (token: string): Promise<Project[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-projects`, {
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
    const data: Project[] = await response.json();
    return data;
};

//obtener los projectos donde un usuario es dueño
export const getProjectsByOwner = async (token: string): Promise<Project[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-projects-owner`, {
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
    const data: Project[] = await response.json();
    return data;
};



//actualizar un proyecto
export const updateProject = async (projectData: UpdateProjectRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/update-project`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//eliminar un proyecto
export const deleteProject = async (projectData: DeleteProjectRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/delete-project`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener todos los miembros de un proyecto
export const getAllMembersProject = async (projectId: number, token: string): Promise<UserProject[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-users/${projectId}`, {
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
    const data: UserProject[] = await response.json();
    return data;
};
