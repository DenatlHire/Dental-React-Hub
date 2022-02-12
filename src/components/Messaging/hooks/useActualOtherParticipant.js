
import {useAxios} from './useAxios';

export function useActualOtherParticipant(convo, currentUserId) {
    const actualRecipientId = [convo?.participant?.user_id, convo?.otherParticipant?.user_id].find(p => p && ((p.user_id || p) !== currentUserId))

	const userUrl = actualRecipientId ? `users/${actualRecipientId?.id || actualRecipientId}` : undefined;
	const [user, , userLoading] = useAxios(userUrl, { loadingByDefault: true });

    return [user, userLoading];
}