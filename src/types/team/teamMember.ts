//request
export interface UpdateMemberRequest{
    idTeam: number;
    idUser: number;
    newRoleName: string;
}

export interface DeleteMemberRequest{
    idTeam: number;
    idUser: number;
}


//response
export interface TeamMembers{
    id : number;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    roleName: string;
}