import { CreateTeamRequest,
    UpdateTeamRequest,
    DeleteTeamRequest,
    Teams 
    } from '../../types/team/teams';
import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';

const BASE_URL = 'http://192.168.117.1:3009/teams';
//crear un equipo
export const createTeam = async (teamData: CreateTeamRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/create-team`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teamData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};

//obtener todos los equipos 
export const getAllTeams = async (token: string): Promise<Teams[] | ApiResponseError | Teams> => {
    const response = await fetch(`${BASE_URL}/get-teams`, {
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
    const data: Teams | Teams []  = await response.json();
    return data;
};

//obtener un equipo por id
export const getTeamById = async (teamId: number, token: string): Promise<Teams | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-team/${teamId}`, {
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
    const data: Teams = await response.json();
    return data;
};
//obtener un equipo por código
export const getTeamByCode = async (teamCode: string, token: string): Promise<Teams | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/get-team-code/${encodeURIComponent(teamCode)}`, {
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
    const data: Teams = await response.json();
    return data;
}
//actualizar un equipo
export const updateTeam = async (teamData: UpdateTeamRequest, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/update-team`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teamData)
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
};
//eliminar un equipo
export const deleteTeam = async (teamId: number, token: string): Promise<ApiResponseSuccess | ApiResponseError> => {
    const response = await fetch(`${BASE_URL}/delete-team`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({idTeam: teamId})
    });
    if (!response.ok) {
        const errorResponse: ApiResponseError = await response.json();
        return errorResponse;
    }
    const successResponse: ApiResponseSuccess = await response.json();
    return successResponse;
}
