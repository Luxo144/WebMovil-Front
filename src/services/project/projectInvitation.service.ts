import{
    CreateInvitationProject,
    ResponseInvitationProject,
    InvitationProject
} from '../../types/project/projectInvitation';

import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';
import { API_URL } from '@env';


const BASE_URL = `${API_URL}/project-invitations`;

//crear una invitacion 
export const createInvitation = async (invitationData: CreateInvitationProject, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/create-invitation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(invitationData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//responder una invitacion
export const responseInvitation = async (invitationData: ResponseInvitationProject, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/respond`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(invitationData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener todas las invitaciones de un proyecto
export const getAllInvitations = async (projectId: number, token: string): Promise<InvitationProject[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/project/${projectId}`, {
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
    const data: InvitationProject[] = await response.json();
    return data;
};

//obtener todas las invitaciones de un equipo
export const getAllInvitationsTeam = async (codeTeam: string, token: string): Promise<InvitationProject[] | ApiResponseError> => {
    console.log(encodeURIComponent(codeTeam));
    const code = encodeURIComponent(codeTeam);
    const response = await fetch(`${BASE_URL}/team/${encodeURIComponent(code)}`, {
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
    const data: InvitationProject[] = await response.json();
    return data;
};