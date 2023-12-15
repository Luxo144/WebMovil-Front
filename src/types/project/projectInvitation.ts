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
    project: Proyect;
}
interface Proyect{
    code: string;
    createdAt: string;
    createdByUserId: number;
    description: string;
    id: number;
    name: string;
  }