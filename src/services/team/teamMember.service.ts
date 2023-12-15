import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';
import {
    UpdateMemberRequest,
    DeleteMemberRequest,
    TeamMembers,
} from '../../types/team/teamMember';
import {
    Teams
} from '../../types/team/teams';
import { API_URL } from '@env';

const BASE_URL = `${API_URL}/members`;

//agregan un miembro a un equipo no deberia ocuparse
export const addMember = async (memberData: UpdateMemberRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/add-member`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};
//obtener todos los miembros de un equipo
export const getAllMembersTeam = async (teamId: number, token: string): Promise<TeamMembers[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-members-team/${teamId}`, {
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
    const data: TeamMembers[] = await response.json();
    return data;
}
//actualizar un miembro de un equipo rol
export const updateMember = async (memberData: UpdateMemberRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/update-member`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
}
//eliminar un miembro de un equipo
export const deleteMember = async (memberData: DeleteMemberRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/delete-member`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
}

//obtener todos los equipos de un usuario
export const getAllTeamsOfUser = async (token: string): Promise<Teams[] | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-teams-user/`, {
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
    const data: Teams[] = await response.json();
    return data;
}

//salirse de un equipo
export const leaveTeam = async (teamId: number, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/leave-team`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ teamId })
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
}