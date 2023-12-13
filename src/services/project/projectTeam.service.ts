import {
    ProjectTeamAssign,
    RemoveTeamFromProject,
    TeamsOfProject,
    ProjectsOfTeam
} from '../../types/project/projectTeam';

import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';

const BASE_URL = 'http://192.168.117.1:3009/project-team'

//asignar un equipo a un proyecto
export const assignTeamToProject = async (projectTeamData: ProjectTeamAssign, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/assign-team`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectTeamData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener todos los equipos de un proyecto
export const getTeamsOfProject = async (projectId: number, token: string): Promise<TeamsOfProject[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/teams/${projectId}`, {
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
    const data: TeamsOfProject[] = await response.json();
    return data;
};

//obtener todos los proyectos de un equipo
export const getProjectsOfTeam = async (teamId: number, token: string): Promise<ProjectsOfTeam[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/projects/${teamId}`, {
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
    const data: ProjectsOfTeam[] = await response.json();
    return data;
};

//remover un equipo de un proyecto
export const removeTeamFromProject = async (projectTeamData: RemoveTeamFromProject, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/remove-team-from-project`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectTeamData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};