import api from "./apiconfig"

/* User */
export async function getUserCharacters()
{
    try {
        const response = await api.get('auth/user-characters', {
            headers: {
                Authorization: localStorage.getItem("api_token")
            }
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}

/* Milestone Analytics */

export async function getMilestonePublicReachedPercentages()
{
    try {
        const response = await api.get('milestone-event/milestones-reached-percentage-by-type');
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function getMilestonesReachedByUser(characterId, milestoneType)
{
    try {
        const response = await api.get('milestone-event/milestones-by-user' + '/' + characterId + '/' + milestoneType, {
            headers: {
                Authorization: localStorage.getItem("api_token")
            }
        });
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function getMilestonesTelemetry()
{
    try {
        const response = await api.get('milestone-event');
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function updateMilestonesTelemetry(steam_id, characterId, milestoneId)
{
    try {
        const response = await api.patch('milestone-event',{
            steam_id: steam_id,
            characterId: characterId,
            milestoneId: milestoneId
        })
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function deleteMilestonesTelemetry()
{
    try {
        await api.delete('milestone-event');
        return true
    }
    catch(error) {
        throw new Error(error);
    }
}


/* Enemies Analytics */
export async function getPublicEnemyKills() {
    try {
        const response = await api.get('enemy-event/kills-by-enemy');
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function getEnemyKillsByCharacter(characterId) {
    try {
        const response = await api.get('enemy-event/kills-by-enemy');
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}

/* Chests Analytics */
export async function getPublicChestsOpened() {
    try {
        const response = await api.get('chest-event/opened-chest-by-zone');
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function getPublicCharacterCompletionPercentage() {
    try {
        const response = await api.get('chest-event/opened-chest-completion-percentages')
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}

export async function getPrivateChestsOpened(characterId) {
    try {
        const response = await api.get('chest-event/opened-chest-by-character/' + characterId , {
            headers: {
                Authorization: localStorage.getItem("api_token")
            }
        })
        return response.data;
    }
    catch(error) {
        throw new Error(error);
    }
}