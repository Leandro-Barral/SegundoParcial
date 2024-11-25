const API_URL = 'http://161.35.143.238:8000/lbarral';

export const getTeams = async () => {
    const res = await fetch(API_URL);
    return await res.json();
}

export const getTeam = async (teamID: any) => {
    const res = await fetch(`${API_URL}/${teamID}`);
    return await res.json();
}

export const postTeam = async (newTeam: any) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTeam)
    });
    return await res.json();
}

export const deleteTeam = async (teamID: any) => {
    const res = await fetch(`${API_URL}/${teamID}`, { 
        method: 'DELETE'
    });
    return await res.json();
}

export const putTeam = async (teamData: any) => {
    const res = await fetch(`${API_URL}/${teamData.id}`, { 
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamData)
    });
    return await res.json();
}
