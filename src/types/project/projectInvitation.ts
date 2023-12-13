export interface CreateInvitationProject {
    idProject: number;
    codeTeam: string;
}

export interface ResponseInvitationProject {
    idInvitation: number;
    response: string;
}

//response

export interface InvitationProject {
    id: number;
    status: string;
    invitationDate: string;
    nameProject: string;
    codeProject: string;
}
