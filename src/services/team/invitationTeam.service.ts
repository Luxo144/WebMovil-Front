import{
    CreateInvitationRequest,
    GetInvitationsResponse
} from '../../types/team/invitationTeam';

import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';
import { API_URL } from '@env';

const BASE_URL = `${API_URL}/invitation`;

//crear una invitación
export const createInvitation = async (invitationData: CreateInvitationRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
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

//obtener todas las invitaciones de un usuario
export const getAllInvitationsOfUser = async (token: string): Promise<GetInvitationsResponse[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-invitations`, {
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
    const data: GetInvitationsResponse[] = await response.json();
    return data;
}

//aceptar una invitación
export const acceptInvitation = async (invitationId: number, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/${invitationId}/accept`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
}
//rechazar una invitación
export const rejectInvitation = async (invitationId: number, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/${invitationId}/reject`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
}
